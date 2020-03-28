const connection = require('../database/connection');

module.exports = {
    async create(recebe, envia){
        const { id } = recebe.body;

        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

        if (!ong){
            return envia.status(400).json({ error: 'No ONG foun with this ID' });
        }

        return envia.json(ong);
    }
}