const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async index(req, res){
        const results = await prisma.entrada.findMany()

        return res.json(results)
    },

    async createBuy(req, res){
        const {
            quantidade,
            valorCompra,
            userId,
            itemId} = req.body


        if(!quantidade || !valorCompra || !userId || !itemId){
            return res.status(400).send("Dados de entrada invalidos ou ausente")
        }


        await prisma.entrada.create({
            data:{
                quantidade,
                valorCompra,
                userId,
                itemId
            }});

            await prisma.item.update({
                where:{ id: itemId },
                data:{
                    estoque: quantidade
                }});

        return res.status(201).send();
    }

}