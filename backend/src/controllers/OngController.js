const crypto = require('crypto');
const connection = require('../database/connection');


module.exports = {
    async index(recebe, envia) {
        const ongs = await connection('ongs').select('*');
    
        return envia.json(ongs);
    },

    async create (recebe, envia){
        const {name, email, whatsapp, city, uf} = recebe.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
    return envia.json({ id });
    }
};