const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/Question");
const Answers = require("./database/Answers");

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
    Question.findAll({ raw: true, order:[
        ['id','DESC']
    ]}).then(questions =>{
        //console.log(questions);
        res.render("index",{
            questions : questions
        });
    })
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


app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;
    Question.findOne({
        where: {id: id}
    }).then(pergunta =>{  //pegunta achada
        if(pergunta != undefined){

            Answers.findAll({
                where: {questionId: pergunta.id},
                order:[ 
                    ['id','DESC'] 
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });          
        }else{ //pergunta não encontrada
            res.redirect("/");
        }
    })
});

app.post("/responder",(req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Answers.create({
        body: corpo,
        questionId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId); //res.redirect("/pergunta/"2)
    }); 
});

app.listen(8080,() => {
    console.log("App is runnig!")
});