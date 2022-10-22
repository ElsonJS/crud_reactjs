const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "db_cadastro",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    const { name } = req.body;
    const { cost } = req.body;
    const { amount } = req.body;
    const { category } = req.body;

    let SQL = "INSERT INTO t_cadastro ( name, cost, amount, category ) VALUES ( ?,?,?,? )";

    db.query(SQL, [name,cost,amount,category], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

app.get("/getCard", (req, res) => {
    
    let SQL = "SELECT * FROM t_cadastro";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res .send(result);
    });
});

app.put("/edit", (req, res) => {
    const { id } = req.body;
    const { name} = req.body;
    const { cost } = req.body;
    const { amount } = req.body;
    const { category } = req.body;

    let SQL = "UPDATE t_cadastro SET name = ?, cost = ?, amount = ?, category = ? WHERE id = ?";

    db.query(SQL, [name, cost, amount, category, id], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let SQL = "DELETE FROM t_cadastro WHERE id = ?";
    db.query(SQL, id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001, () => {
    console.log("rodando servidor");
})