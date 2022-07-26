const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/Question");

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com banco de dados!")
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

//Informando o Express user o EJS como view engine
app.set('view engine','ejs');
app.use(express.static('public'));

//body parser
//responsável para traduzir os dados enviados pelo formulário em uma estrutura javascript para usar no backend
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//rotas
app.get("/",(req, res) => {

    res.render("index");
});

app.get("/perguntar",(req, res) =>{
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Question.create({
        title: titulo,
        description: descricao
    }).then(()=>{
        res.redirect("/");
    })
    
});

app.listen(8080,() => {
    console.log("App is runnig!")
});