const express = require("express");
const app = express();

//Informando o Express user o EJS como view engine
app.set('view engine','ejs');
app.use(express.static('public'));

app.get("/",(req, res) => {

    res.render("index");
});

app.get("/perguntar",(req, res) =>{
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res) =>{
    res.send("Formulário recebido!");
});

app.listen(8080,() => {
    console.log("App is runnig!")
});