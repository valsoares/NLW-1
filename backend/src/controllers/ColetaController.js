const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const {name, endereço, número, estado, cidade, itens} = request.body;

        await connection('coletas').insert({
            name,
            endereço,
            número,
            estado,
            cidade,
            itens
        })

        return response.json();
    },

    async list(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('coletas').count();
        console.log(count);

        const coletas = await connection('coletas')
        // .limit(15)
        // .offset((page-1)*15)
        .select('*');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(coletas);
    }
}