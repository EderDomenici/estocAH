const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async index(req, res){
        const results = await prisma.saida.findMany()

        return res.json(results)
    },

    async createSell(req, res){
        const {vetItens,
               userId} = req.body

        if(!vetItens || vetItens.length === 0){
            return res.status(404).send("Não há itens na sua venda")
        };

        let totalVenda = 0
        let id

        for (const itemData of vetItens) {
            const {itemId,
                   quantidade } = itemData

            if(!itemId || !quantidade || quantidade == 0){
                return res.status(400).send("Dados da venda estão ausentes")
            };

            const produto = await prisma.item.findUnique({
                where:{
                    id: itemId
                }
            });

            if(!produto){
                return res.status(404).send("Algum(s) produto(s) não foram encontrados")
            }

            if(quantidade > produto.estoque){
                return res.status(400).send(`Quantidade vendida do produto: ${produto.descricao} é maior que a quantidade em estoque!`)
            }


            const saida = await prisma.saida.create({
                data:{
                    userId
                }
            })

            const valorVendaItem = produto.valorVenda * quantidade;

            totalVenda += valorVendaItem

            id = saida.id

            await prisma.itensvenda.create({
                data:{
                    itemId,
                    quantidade,
                    saidaId: saida.id
                }
            });
        }

        await prisma.saida.update({
            where:{ id },
            data:{
                totalVenda: totalVenda
            }
        });
    }
}