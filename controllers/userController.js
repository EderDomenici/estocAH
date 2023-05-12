const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt')


const prisma = new PrismaClient()



module.exports = {
    async index(req, res){
        const results = await prisma.user.findMany();

        return res.json(results)
    },


    async createUser(req, res){
        const{
            nome,
            login,
            senha
        } = req.body

        const encrypted = bcrypt.hashSync(senha, 10)

        if(!nome || !login || !senha){
            return res.status(404).send("Dados de entradas invalidos ou ausentes");
        }

        const checkLogin = await prisma.user.findFirst({
            where:{
                login:{ contains: login }
            }});

        if(checkLogin){
            return res.status(400).send("Este login ja existe, tentar outro!")
        }

        await prisma.user.create({
            data:{
                nome,
                login,
                senha:encrypted
            }})

        return res.status(201).send();
    },


    async login(req,res){

        const{login, senha} = req.body

        const user = await prisma.user.findUnique({
            where:{
                login
            }})

        const comparepass = await bcrypt.compareSync(senha, user.senha)

        if(login === user.login && comparepass === true){

            console.log("logado")

        }else{
            return res.status(400).send("Login ou senha Invalidos")
        }
    }

}