const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async index(req, res){
        const results = await prisma.item.findMany()

        return res.json(results)
    },

    async createItem(req, res){
        const {descricao,
               valorVenda } = req.body


        if(!descricao){
            return res.status(404).send("Descrição ausente")
        }

        await prisma.item.create({
            data:{
                descricao,
                valorVenda
            }});

         return res.status(201).send();
    },

    async updatePrice(req, res){
        const {id,
               descricao,
               valorVenda } = req.body

        let item

        if(id){

            item = await prisma.item.findUnique({
                where:
                    { id }
            });

        } else if (descricao){

            item = await prisma.item.findFirst({
                where:
                    {
                        descricao: { contains: descricao }
                    }
                });

            };

        if(!item) {
            return res.status(404).send({error: "Produto não encontrado"})

        };

        await prisma.item.update({
            where:{ id: item.id },
            data:{
                valorVenda
            }});

            return res.status(201).send();
    },

    async updateName(req, res){
        const {id,
               descricao } = req.body

     let item

     if(id){

         item = await prisma.item.findUnique({
             where:
                 { id }
         });

     } else if (descricao){

         item = await prisma.item.findFirst({
             where:
                 {
                     descricao: { contains: descricao }
                 }
             });

         };

     if(!item) {
         return res.status(404).send({error: "Produto não encontrado"})

     };

     await prisma.item.update({
         where:{ id: item.id },
         data:{
               descricao
         }});

         return res.status(201).send();
    },

    async deleteItem(req, res){
        const {id,
               descricao } = req.body

        let item

        if(id){

            item = await prisma.item.findUnique({
                where:
                    { id }
            });
        } else if (descricao){

            item = await prisma.item.findFirst({

                where:
                {
                  descricao: { contains: descricao }
                }
          });
        };

        if(!item) {
            return res.status(404).send({error: "Produto não encontrado"})
        };

        await prisma.item.delete({
            where:
            { id }
        });
        return res.status(201).send();


    }

}