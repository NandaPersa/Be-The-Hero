const connection = require('../database/connection');

module.exports = {
    async index(recebe, envia) {
        const { page = 1 } = recebe.query;

        const [count] = await connection('incidents').count();

        console.log(count);

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        envia.header('X-Total-Count',count['count(*)']);

        return envia.json(incidents);
    },

    async create (recebe, envia){
        const {title, description, valor} = recebe.body;
        const ong_id = recebe.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            valor,
            ong_id

        });

        return envia.json({ id });
    },

    async delete(recebe, envia){
        const { id } = recebe.params;
        const ong_id = recebe.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

            if (incident.ong_id != ong_id){
                return envia.status(401).json({ error: 'Operation not permitted.' });
            }

            await connection('incidents').where('id', id).delete();

            return envia.status(204).send();

    }
};