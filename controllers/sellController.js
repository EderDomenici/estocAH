const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async index(req, res){
        const results = await prisma.saida.findMany()

        return res.json(results)
    }
}