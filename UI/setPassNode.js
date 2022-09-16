const express = require('express');
const cors = require('cors');
const mssql = require('mssql');
const app = express();
const bcrypt = require('bcryptjs');
const port = 3000;

app.use(express.urlencoded({extended: false}));
app.use(
    cors({
        origin : '*',
        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders : ['Content-Type']
    })
)
const sqlConfig = {
    server : '10.0.2.19',
    user : 'SA',
    password : 'Soulsvciot01',
    database : 'ANPR',
    options : {
        encrypt : false,
        trustServerCertificate : false
    }
}
mssql.connect(sqlConfig, (err, result)=>{
    if(err) throw err
    else{
        console.log('Connected to DB');
    }
})

app.listen(port);

app.post('/setPass', (req, res)=>{
    console.log(req.body);
    let userId = req.body.userId;
    let plainPass = req.body.plainPass;

    let saltRounds = 10;
    let hash = bcrypt.hashSync(plainPass, saltRounds);

    let query = `UPDATE Users SET password = '${hash}' WHERE userId = '${userId}'`;
    console.log(query);
    let queryResult = mssql.query(query, (err, result)=>{
        if(err) throw err
        else{
            res.send('1');
        }
    })
})