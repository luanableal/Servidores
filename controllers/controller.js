//const usuarios =[{name: "luana"}];
import fs from "fs";
const database = JSON.parse(fs.readFileSync("database.json", "utf-8"))

export function listar(req, res) {
    const databaseFiltrada = database.usuarios.filter(pessoa => pessoa.delete === false)
    res.status(200).send({ usuarios: databaseFiltrada })

}

export function cadastrar(req, res) {
    const usuario = req.body;
    const newUser = {
        id: database.usuarios.length + 1,
        nome: usuario.name,
        email: usuario.email,
        delete: false
    }
    database.usuarios.push(newUser)
    fs.writeFile("database.json", JSON.stringify(database, null, 4), (err) => { res.send("Usuário cadastrado com sucesso") })



    //res.send("Usuário cadastrado com sucesso")

}

export function deletar(req, res) {

    database.usuarios.forEach(usuario => {
        console.log(usuario)
        if (usuario.id == req.params.id) {
            usuario.delete = true;

        }
    });

        fs.writeFile('./database.json', JSON.stringify(database, null, 4), (_err) =>{

            res.status(200).send(`Usuário deletado com sucesso`)
        })

   

}

export function atualizar(req, res) {
    
        database.usuarios.forEach(usuario => {

            if (usuario.id == req.params.id) {
                if (req.body.name) { usuario.nome = req.body.name };
                if (req.body.email) { usuario.email = req.body.email };
            }
        });

        fs.writeFile('./database.json', JSON.stringify(database, null, 4), (_erro) => {

            res.status(200).send("Usuário editado com sucesso")
        });
    




}