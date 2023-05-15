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

        const saida = await prisma.saida.create({
            data:{
                userId
            }
        })

        let totalVenda = 0
   
        for (const itemData of vetItens) {
            console.log("Entrou no for")
            const {itemId,
                   quantidade } = itemData

            if(!itemId || !quantidade || quantidade == 0){

                await prisma.saida.delete({
                    where:{id: saida.id}
                })

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

            await prisma.item.update({
                where:{id:produto.id},
                data:{
                    estoque: (produto.estoque - quantidade)
                }
            })

            const valorVendaItem = produto.valorVenda * quantidade;

            totalVenda += valorVendaItem

            await prisma.itensVenda.create({
                data:{
                    itemId,
                    quantidade,
                    saidaId: saida.id
                }
            });

            console.log("Passou do create itemvenda")
        }

        await prisma.saida.update({
            where:{ id: saida.id },
            data:{
                totalVenda: totalVenda
            }
        });

        return res.status(201).send("Venda realizada: "+totalVenda)
    }
}