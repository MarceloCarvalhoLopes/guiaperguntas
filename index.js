const express = require("express");
const app = express();
const bodyParser = require("body-parser");


//Informando o Express user o EJS como view engine
app.set('view engine','ejs');
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//rotas
app.get("/",(req, res) => {

    res.render("index");
});

app.get("/perguntar",(req, res) =>{
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    res.send("Formulário recebido! titulo " + titulo + " " + "descricao " + descricao);
});

app.listen(8080,() => {
    console.log("App is runnig!")
});