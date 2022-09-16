const express = require('express');
const cors = require('cors');
const mssql = require('mssql');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const senderEmail = `abc@gmail.com`;
const receiverEmail = `xyz@gmail.com`;

const port = 3000;

let app = express();

app.use(express.urlencoded({extended : false}));
app.use(
    cors({
        origin : '*',
        methods : ['GET', 'POST', 'PUT' , 'DELETE'],
        allowHeaders : ['Content-Type']
    })
);

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
        console.log('connected to db');
    }
});

let transporter = nodemailer.createTransport({
    host : 'smtp.mail.yahoo.com',
    port: 465,
    service : 'yahoo',
    secure : false,
    auth : {
        user : 'assetsoul@yahoo.com',
        pass : 'tjyfimogvchahdja'
    },
    debug : false,
    logger : false
});

app.listen(port, ()=>{
    console.log('Listening on port : ' + port);
}).on('error', (err)=>{
    console.log('Error occurred : ' + err.message);
});



app.post('/login', (req, res)=>{
    console.log(req.body);
    let dataStatus = req.body.inputStatus;
    let userCred = req.body.userCred;
    let userPass = req.body.userPass;
    let query = ``;
    console.log(dataStatus);
    console.log(userCred);
    console.log(userPass);

    if(dataStatus == 1){
        // value type is numeric hence we check user id
        query = `SELECT password, userType FROM Users WHERE userId = '${userCred}'`;
    }
    else if(dataStatus == 2){
        // value type is string hence we check user email
        query = `SELECT password, userType FROM Users WHERE email = '${userCred}'`;
    }
    else{
        // value is neither of dataStatus 1 or dataStatus 2
        res.send();
    }
    console.log(query);

    let queryResult = mssql.query(query, (err, result)=>{
        if(err) throw err;
        else{
            if(result.recordset.length > 0){
                console.log('returned value');
                let hash = Object.values(result.recordset[0])[0];
                let cryptResult = bcrypt.compare(userPass, hash, function(err, cryptResult){
                    if(err) throw err
                    else if(cryptResult){
                        console.log('matched');
                        // passwords matched
                        let privilege = Object.values(result.recordset[0])[1];
                        console.log(privilege);
                        if(privilege == 'admin'){
                            console.log('admin');
                            res.send([1, 'adminPass', './adminDashboard.html']);
                        }
                        else if(privilege == 'attendant'){
                            res.send([2, 'attendantPass', './attendantDashboard.html']);
                        }   
                    }
                    else{
                        // passwords didnt match
                        res.send([0, 'Login failed, kindly check your credentials']);
                    }
                })
            }
            else{
                //  user not found
                res.send([0, 'Login failed, kindly check your credentials']);
            }
        }
    })
})

app.post('/contact', (req, res)=>{
    console.log(req.body);
    let visitorName = req.body.visitorName;
    let visitorEmail = req.body.visitorEmail;
    let visitorMsg = req.body.visitorMsg;

    let mailOptions = {
        from : senderEmail,
        to : receiverEmail,
        subject : 'ANPR',
        text : visitorMsg
    }
    
    let mailOptions2 = {
        from : senderEmail,
        to : visitorEmail,
        subject : 'ANPR',
        text : `Thank you for contacting `
    }

    transporter.sendMail(mailOptions, (err0, data0)=>{
        if(err0){
            console.log(`Failed to send the mail from ${senderEmail} to ${receiverEmail}`);
            res.send(1); //failure
        }
        else{
            console.log('Email sent to admin');
            transporter.sendEmail(mailOptions2, (err1, data1)=>{
                if(err1){
                    console.log(`Failed to send the mail from ${senderEmail} to ${visitorEmail}`);
                    res.send(1); // failure
                }
                else{
                    console.log(`Email sent to the visitor`);
                    res.send(2); // success
                }
            })
        }
    })
})

app.post('/adminDashboardCards', (req, res)=>{
    let query0 = ``;
    let query1 = ``;
    let query2 = ``;
    let query3 = ``;
    let query4 = ``;

    let valueArr = [];

    let queryResult0 = mssql.query(query0, (err0, result0)=>{
        if(err0){
            // failed to execute the first query
            console.log(`failed to execute the first query`);
        }
        else if(result0.recordset.length > 0){
            // first query returned result
            let queryResult1 = mssql.query(query1, (err1, result1)=>{
                if(err1){
                    // failed to execute the second query
                    console.log(`failed to execute the second query`);
                }
                else if(result1.recordset.length > 0){
                    // second query returned result
                    let queryResult2 = mssql.query(query2, (err2, result2)=>{
                        if(err2){
                            // failed to execute the third query
                            console.log(`failed to execute the third query`);
                        }
                        else if(result2.recordset.length > 0){
                            let queryResult3 = mssql.query(query3, (err3, result3)=>{
                                if(err3){
                                    // failed to execute the fourth query
                                    console.log(`failed to execute the fourth query`);
                                }
                                else if(result3.recordset.length > 0){
                                    // fourth query returned result
                                    let queryResult4 = mssql.query(query4, (err4, result4)=>{
                                        if(err4){
                                            // failed to execute the fifth query
                                            console.log(`failed to execute the fifth query`);
                                        }
                                        else if(result4.recordset.length > 0){
                                            // fifth query returned result
                                            let val0 = Object.values(result0.recordset[0])[0];
                                            let val1 = Object.values(result1.recordset[0])[0];
                                            let val2 = Object.values(result2.recordset[0])[0];
                                            let val3 = Object.values(result3.recordset[0])[0];
                                            let val4 = Object.values(result4.recordset[0])[0];

                                            valueArr.push(val0, val1, val2, val3, val4);
                                        }
                                        else{
                                            // fifth query didnt return any result
                                            console.log(`fifth query didnt return any result`);
                                        }
                                    })
                                }
                                else{
                                    // fourth query didnt return any results
                                    console.log(`fourth query didnt return any result`);
                                }
                            })
                        }
                        else{
                            // third query didnt return any result
                            console.log(`third query didnt return any result`);
                        }
                    })
                }
                else{
                    // second query didnt return any result
                    console.log(`second query didnt return any result`);
                }
            })
        }
        else{
            // first query didnt return any result
            console.log(`first query didnt return any result`);
        }
    })
})

app.post('/adminDashboardChart', (req, res)=>{
    //  chart is displayed by hours
    let valArr = [];

    let count = 0;
    for(let i = 0;  i < 24; i++){
        let query = `SELECT count(*) as ${i} ...`;
        let queryResult = mssql.query(query, (err, result)=>{
            if(err){
                console.log('failed to execute query');
            }
            else{
                let index = parseInt(Object.keys(result.recordset[0])[0]);
                let value = parseInt(Object.keys(result.recordset[0])[0]);
                
                valArr[index] = value;

                if(count == 23){
                    res.send(valArr);
                }
                else{
                    count++ ;
                }
            }
        })
    }
})

app.post('/adminDashboardTable', (req, res)=>{
  let query = ``;
  let queryResult = mssql.query(query, (err, result)=>{
    if(err){
        console.log('Failed to run query');
    }
    else{
        res.send(result.recordset);
    }
  })  
})

app.post('/adminDashboardTableSearch', (req, res)=>{
    let query = ``;
    let queryResult = mssql.query(query, (err, result)=>{
      if(err){
          console.log('Failed to run query');
      }
      else{
          res.send(result.recordset);
      }
    })  
})


app.post('/activityCards', (req, res)=>{
    let query0 = ``;
    let query1 = ``;
    let query2 = ``;
    let query3 = ``;
    let query4 = ``;

    let valueArr = [];

    let queryResult0 = mssql.query(query0, (err0, result0)=>{
        if(err0){
            // failed to execute the first query
            console.log(`failed to execute the first query`);
        }
        else if(result0.recordset.length > 0){
            // first query returned result
            let queryResult1 = mssql.query(query1, (err1, result1)=>{
                if(err1){
                    // failed to execute the second query
                    console.log(`failed to execute the second query`);
                }
                else if(result1.recordset.length > 0){
                    // second query returned result
                    let queryResult2 = mssql.query(query2, (err2, result2)=>{
                        if(err2){
                            // failed to execute the third query
                            console.log(`failed to execute the third query`);
                        }
                        else if(result2.recordset.length > 0){
                            let queryResult3 = mssql.query(query3, (err3, result3)=>{
                                if(err3){
                                    // failed to execute the fourth query
                                    console.log(`failed to execute the fourth query`);
                                }
                                else if(result3.recordset.length > 0){
                                    // fourth query returned result
                                    let queryResult4 = mssql.query(query4, (err4, result4)=>{
                                        if(err4){
                                            // failed to execute the fifth query
                                            console.log(`failed to execute the fifth query`);
                                        }
                                        else if(result4.recordset.length > 0){
                                            // fifth query returned result
                                            let val0 = Object.values(result0.recordset[0])[0];
                                            let val1 = Object.values(result1.recordset[0])[0];
                                            let val2 = Object.values(result2.recordset[0])[0];
                                            let val3 = Object.values(result3.recordset[0])[0];
                                            let val4 = Object.values(result4.recordset[0])[0];

                                            valueArr.push(val0, val1, val2, val3, val4);
                                        }
                                        else{
                                            // fifth query didnt return any result
                                            console.log(`fifth query didnt return any result`);
                                        }
                                    })
                                }
                                else{
                                    // fourth query didnt return any results
                                    console.log(`fourth query didnt return any result`);
                                }
                            })
                        }
                        else{
                            // third query didnt return any result
                            console.log(`third query didnt return any result`);
                        }
                    })
                }
                else{
                    // second query didnt return any result
                    console.log(`second query didnt return any result`);
                }
            })
        }
        else{
            // first query didnt return any result
            console.log(`first query didnt return any result`);
        }
    })
})

app.post('/activityTable', (req, res)=>{
    let query = ``;
    let queryResult = mssql.query(query, (err, result)=>{
      if(err){
          console.log('Failed to run query');
      }
      else{
          res.send(result.recordset);
      }
    })  
  })
  
  app.post('/activityTableSearch', (req, res)=>{
      let query = ``;
      let queryResult = mssql.query(query, (err, result)=>{
        if(err){
            console.log('Failed to run query');
        }
        else{
            res.send(result.recordset);
        }
      })  
  })


  app.post('/activityChart', (req, res)=>{
    let query = ``;
    let queryResult = mssql.query(query, (err, result)=>{
      if(err){
          console.log('Failed to run query');
      }
      else{

      }
    })  
  })
  
  app.post('/activityChartSearch', (req, res)=>{
      let query = ``;
      let queryResult = mssql.query(query, (err, result)=>{
        if(err){
            console.log('Failed to run query');
        }
        else{
            
        }
      })  
  })

  app.post('/passCards', (req, res)=>{
    let query0 = ``;
    let query1 = ``;
    let query2 = ``;
    let query3 = ``;
    let query4 = ``;
    let query5 = ``;

    let valueArr = [];

    let queryResult0 = mssql.query(query0, (err0, result0)=>{
        if(err0){
            // failed to execute the first query
            console.log(`failed to execute the first query`);
        }
        else if(result0.recordset.length > 0){
            // first query returned result
            let queryResult1 = mssql.query(query1, (err1, result1)=>{
                if(err1){
                    // failed to execute the second query
                    console.log(`failed to execute the second query`);
                }
                else if(result1.recordset.length > 0){
                    // second query returned result
                    let queryResult2 = mssql.query(query2, (err2, result2)=>{
                        if(err2){
                            // failed to execute the third query
                            console.log(`failed to execute the third query`);
                        }
                        else if(result2.recordset.length > 0){
                            let queryResult3 = mssql.query(query3, (err3, result3)=>{
                                if(err3){
                                    // failed to execute the fourth query
                                    console.log(`failed to execute the fourth query`);
                                }
                                else if(result3.recordset.length > 0){
                                    // fourth query returned result
                                    let queryResult4 = mssql.query(query4, (err4, result4)=>{
                                        if(err4){
                                            // failed to execute the fifth query
                                            console.log(`failed to execute the fifth query`);
                                        }
                                        else if(result4.recordset.length > 0){
                                            // fifth query returned result
                                            let queryResult5 = mssql.query(query5, (err5, result5)=>{
                                                if(err5){
                                                    // failed to execute 5th query
                                                    console.log('failed to execute 5th query')
                                                }
                                                else if(result5.recordset.length > 0){
                                                    // sixth queryReturned result
                                                    let val0 = Object.values(result0.recordset[0])[0];
                                                    let val1 = Object.values(result1.recordset[0])[0];
                                                    let val2 = Object.values(result2.recordset[0])[0];
                                                    let val3 = Object.values(result3.recordset[0])[0];
                                                    let val4 = Object.values(result4.recordset[0])[0];
                                                    let val5 = Object.values(result5.recordset[0])[0];

                                                    valueArr.push(val0, val1, val2, val3, val4, val5);
                                                }
                                                else{
                                                    // sixth query didnt return any result
                                                    console.log(`sixth query didnt return any result`);
                                                }
                                            })
                                        }
                                        else{
                                            // fifth query didnt return any result
                                            console.log(`fifth query didnt return any result`);
                                        }
                                    })
                                }
                                else{
                                    // fourth query didnt return any results
                                    console.log(`fourth query didnt return any result`);
                                }
                            })
                        }
                        else{
                            // third query didnt return any result
                            console.log(`third query didnt return any result`);
                        }
                    })
                }
                else{
                    // second query didnt return any result
                    console.log(`second query didnt return any result`);
                }
            })
        }
        else{
            // first query didnt return any result
            console.log(`first query didnt return any result`);
        }
    })
})

app.post('/passTable', (req, res)=>{
    let query = ``;
    let queryResult = mssql.query(query, (err, result)=>{
      if(err){
          console.log('Failed to run query');
      }
      else{
          res.send(result.recordset);
      }
    })  
  })
  
  app.post('/passTableSearch', (req, res)=>{
      let query = ``;
      let queryResult = mssql.query(query, (err, result)=>{
        if(err){
            console.log('Failed to run query');
        }
        else{
            res.send(result.recordset);
        }
      })  
  })