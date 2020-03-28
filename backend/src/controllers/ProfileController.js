const connection = require('../database/connection');


module.exports = {
    async index(recebe, envia){
        const ong_id = recebe.headers.authorization;

        const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*');

        return envia.json(incidents);

    }
    
}