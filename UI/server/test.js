const express = require('express');
const cors = require('cors');
const mssql = require('mssql');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

const senderEmail = `abc@gmail.com`;
const receiverEmail = `xyz@gmail.com`;

app.use(express.urlencoded({extended:false}));
app.use(
    cors({
        origin : '*',
        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        allowHeaders : ['Content-Type']
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

let transporter = nodemailer.createTransport({
    host : '',
    port : '',
    service : '',
    secure : '',
    auth : {
        user : '',
        pass : ''
    },
    debug : '',
    trustServerCertificate : ''
});

mssql.connect(sqlConfig, (err, result)=>{
    if(err){
        console.log('Could not connect to database');
    }
    else{
        console.log('Connected to DB');
    }
});

app.listen(port, ()=>{
    console.log('Listening to port : ' + port);
}).on('error', (err)=>{
    console.log('Error occurred : ' + err.message);
});

// login page 

app.post('/login', (req, res)=>{
    let userCred = req.body.userCred;
    let userPass = req.body.userPass;
    let query;
    if(isNaN(userCred) == false){
        query = `SELECT password, userId, userType FROM Users WHERE userId = '${userCred}'`;
    }
    else{
        query = `SELECT password, userId, userType FROM Users WHERE email = '${userCred}'`;
    }
    console.log(query);
    let queryResult = mssql.query(query, (err, result)=>{
        if(err){
            console.log('error in /login query');
            throw err;
        }
        else if(result.recordset.length > 0){
            let storedHash = Object.values(result.recordset[0])[0];
            let hashCheck = bcrypt.compare(userPass, storedHash, function(passErr, cryptCheck){
                if(passErr){
                    console.log('Error in checking hash');
                }
                else if(cryptCheck){
                    // password matched
                    let userId = Object.values(result.recordset[0])[1];
                    let privilege = Object.values(result.recordset[0])[2];
                    if(privilege == 'admin'){
                        res.send([1, privilege, userId, './adminDashboard.html']);
                    }
                    else if(privilege == 'attendant'){
                        res.send([1, privilege, userId, './securityDashboard.html']);
                    }
                    else{
                        // privilege could not be determined
                    }
                }
                else{
                    // password didnt match
                    res.send([2, 'Password didnt match']);
                }
            })
        }
        else{
            // Employee not found
            res.send([2, 'Employee not found']);
        }
    })
});

// contact us

app.post('/contactUs', (req, res)=>{
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

// admin dashboard
app.post('/adminDashboardCards', (req, res)=>{
    let currentDate = moment().format('YYYY-MM-DD');
    let query1 = `SELECT COUNT(activityId) FROM activity WHERE entryDate = '${currentDate}'`;
    let query2 = `SELECT COUNT(activityId) FROM activity WHERE passType='Guest' AND entryDate= '${currentDate}'`;
    let query3 = `SELECT COUNT(activityId) FROM activity WHERE passType='Organization' AND entryDate = '${currentDate}'`;
    let query4 = `SELECT count(activityId) FROM activity INNER JOIN vehicleDetails ON vehicleDetails.vehicleId=activity.vehicleId WHERE vehicleType='special purpose' AND activity.entryDate = '${currentDate}'`;
    let query5 = `SELECT COUNT(activityId) FROM activity WHERE passType<>'No Pass' AND entryDate='${currentDate}'`;

    let queryResult = mssql.query(query1, (err1, result1)=>{
        if(err1){
            console.log('error in /adminDashboardCards query1');
        }
        else if(result1.recordset.length > 0){
            let queryResult2 = mssql.query(query2, (err2, result2)=>{
                if(err2){
                    console.log('error in /adminDashboardCards query2');
                }
                else if(result2.recordset.length > 0){
                    let queryResult3 = mssql.query(query3, (err3, result3)=>{
                        if(err3){
                            console.log('error in /adminDashboardCards query3');
                        }
                        else if(result3.recordset.length > 0){
                            let queryResult4 = mssql.query(query4, (err4, result4)=>{
                                if(err4){
                                    console.log('error in /adminDashboardCards query4');
                                }
                                else if(result4.recordset.length > 0){
                                    let queryResult5 = mssql.query(query5, (err5, result5)=>{
                                        if(err5){
                                            console.log('error in /adminDashboardCards query5');
                                        }
                                        else if(result5.recordset.length > 0){
                                            let val1 = Object.values(result1.recordset[0])[0];
                                            let val2 = Object.values(result2.recordset[0])[0];
                                            let val3 = Object.values(result3.recordset[0])[0];
                                            let val4 = Object.values(result4.recordset[0])[0];
                                            let val5 = Object.values(result5.recordset[0])[0];
                                            let resultArr = [];
                                            resultArr.push(val1, val2, val3, val4, val5);
                                            res.send(resultArr);
                                        }
                                        else{
                                            console.log('/adminDashboardCards query5 didnt return any result');
                                        }
                                    })
                                }
                                else{
                                    console.log('/adminDashboardCards query4 didnt return any result');
                                }
                            })
                        }
                        else{
                            console.log('/adminDashboardCards query3 didnt return any result');
                        }
                    })
                }
                else{
                    console.log('/adminDashboardCards query2 didnt return any result');
                }
            })
        }
        else{
            console.log('/adminDashboardCards query 1 didnt return any value');
        }
    })
});

app.post('/adminDashboardChart', (req, res)=>{
    let dataArr = [];
    let count = 0;
    let currentHour = moment().hour();
    let currentDate = moment().format('YYYY-MM-DD');
    for(let i = 0; i <= currentHour; i++){
        let query = `SELECT COUNT(activityId) AS '${i}' FROM activity WHERE entryDate = '${currentDate}' AND SUBSTRING(entryTime, 1, 2) = '${moment().hour(i).format('HH')}'`;
        // console.log(query);
        let queryResult = mssql.query(query, (err, result)=>{
            if(err) throw err
            else if(result.recordset.length > 0){
                // console.log(result.recordset[0]);
                count++;
                let index = parseInt(Object.keys(result.recordset[0])[0]);
                let value = parseInt(Object.values(result.recordset[0])[0]);
                dataArr[index] = value;
                if(count == currentHour + 1){
                    // console.log(dataArr);
                    res.send(dataArr);
                }
            }
            else{
                // didnt return any result
            }
        })
    }
});
//  need top 10 records for this query
app.post('/adminDashboardTable', (req, res)=>{
    let query = `SELECT top 10 activityId,activity.vehicleNumber,activity.entryDate,activity.entryTime,entryLocation,entryGate,exitTime,exitDate,exitLocation,exitGate,activity.passType,passStatus,vehicleStatus from activity
                    INNER JOIN gatePass ON gatePass.passType=activity.passType
                    INNER JOIN vehicleDetails ON vehicleDetails.vehicleId=activity.vehicleId`;
    let queryResult = mssql.query(query, (err, result)=>{
        if(err){
            console.log('error in /adminDashboardTable query');
        }
        else{
            res.send(result.recordset);
        }
    })
});




app.post('/adminDashboardTableSearch', (req, res)=>{
    let searchTerm = req.body.searchTerm;
    let query = `SELECT activityId,activity.vehicleNumber,activity.entryDate,activity.entryTime,entryLocation,entryGate,exitTime,exitDate,exitLocation,exitGate,activity.passType,passStatus,vehicleStatus from activity
    INNER JOIN gatePass ON gatePass.passType=activity.passType
    INNER JOIN vehicleDetails ON vehicleDetails.vehicleId=activity.vehicleId WHERE vehicleNumber='${searchTerm}' and entryDate in(SELECT CAST( GETDATE() AS Date )) and exitDate in(SELECT CAST( GETDATE() AS Date ))`;
    let queryResult = mssql.query(query, (err, result)=>{
        if(err){
            console.log('error in /adminDashboardTable query');
        }
        else{
            res.send(result.recordset);
        }
    })
});
// activity page 

app.post('/activityCards', (req, res)=>{
    let currentDate = moment().format('YYYY-MM-DD');
    let query1 = `SELECT COUNT(activityId) FROM activity WHERE entryDate = '${currentDate}'`;
    let query2 = `SELECT COUNT(activityId) FROM activity WHERE passType='Guest' AND entryDate= '${currentDate}'`;
    let query3 = `SELECT COUNT(activityId) FROM activity WHERE passType='Organization' AND entryDate = '${currentDate}'`;
    let query4 = `SELECT count(activityId) FROM activity INNER JOIN vehicleDetails ON vehicleDetails.vehicleId=activity.vehicleId WHERE vehicleType='special purpose' AND activity.entryDate = '${currentDate}'`;
    let query5 = `SELECT COUNT(activityId) FROM activity WHERE passType<>'No Pass' AND entryDate='${currentDate}'`;

    let queryResult = mssql.query(query1, (err1, result1)=>{
        if(err1){
            console.log('error in /adminDashboardCards query1');
        }
        else if(result1.recordset.length > 0){
            let queryResult2 = mssql.query(query2, (err2, result2)=>{
                if(err2){
                    console.log('error in /adminDashboardCards query2');
                }
                else if(result2.recordset.length > 0){
                    let queryResult3 = mssql.query(query3, (err3, result3)=>{
                        if(err3){
                            console.log('error in /adminDashboardCards query3');
                        }
                        else if(result3.recordset.length > 0){
                            let queryResult4 = mssql.query(query4, (err4, result4)=>{
                                if(err4){
                                    console.log('error in /adminDashboardCards query4');
                                }
                                else if(result4.recordset.length > 0){
                                    let queryResult5 = mssql.query(query5, (err5, result5)=>{
                                        if(err5){
                                            console.log('error in /adminDashboardCards query5');
                                        }
                                        else if(result5.recordset.length > 0){
                                            let val1 = Object.values(result1.recordset[0])[0];
                                            let val2 = Object.values(result2.recordset[0])[0];
                                            let val3 = Object.values(result3.recordset[0])[0];
                                            let val4 = Object.values(result4.recordset[0])[0];
                                            let val5 = Object.values(result5.recordset[0])[0];
                                            let resultArr = [];
                                            resultArr.push(val1, val2, val3, val4, val5);
                                            res.send(resultArr);
                                        }
                                        else{
                                            console.log('/activityCards query5 didnt return any result');
                                        }
                                    })
                                }
                                else{
                                    console.log('/activityCards query4 didnt return any result');
                                }
                            })
                        }
                        else{
                            console.log('/activityCards query3 didnt return any result');
                        }
                    })
                }
                else{
                    console.log('/activityCards query2 didnt return any result');
                }
            })
        }
        else{
            console.log('/activityCards query 1 didnt return any value');
        }
    })
});

app.post('/activityTable', (req, res)=>{
    let cardIndex = req.body.cardIndex;
    let query = ``;
    if(cardIndex == 1){
        query = ``;
    }
    else if(cardIndex == 2){
        query = ``;
    }
    else if(cardIndex == 3){
        query = ``;
    }
    else if(cardIndex == 4){
        query = ``;
    }
    else if(cardIndex == 5){
        query = ``;
    }

    let queryResult = mssql.query(query, (err, result)=>{
        if(err){
            console.log('error in /activityTable query');
        }
        else{
            res.send(result.recordset);
        }
    })
});

app.post('/activityChart', (req, res)=>{
    let cardIndex = req.body.cardIndex;
    let query = ``;
    let dataArr = [];
    let count = 0;
    let currentHour = moment().hour;
    let currentDate = moment().format('YYYY-MM-DD');

    for(let i = 0; i <= currentHour; i++){
        if(cardIndex == 1){
            query = ``;
        }
        else if(cardIndex == 2){
            query = ``;
        }
        else if(cardIndex == 3){
            query = ``;
        }
        else if(cardIndex == 4){
            query = ``;
        }
        else if(cardIndex == 5){
            query = ``;
        }
        let queryResult = mssql.query(query, (err, result)=>{
            if(err){
                console.log('Error in /adminDashboardChart query');
            }
            else if(result.recordset.length > 0){
                count++;
                let index = parseInt(Object.keys(result.recordset[0])[0]);
                let value = parseInt(Object.values(result.recordset[0])[0]);
                dataArr[index] = value;
                if(count == currentHour + 1){
                    res.send(dataArr);
                }
            }
            else{
                console.log('query didnt return any result');
            }
        })
    }
});

app.post('/searchActivityTable', (req, res)=>{
    console.log(req.body);
});

// passes 

app.post('/passesCards', (req, res)=>{
    let query1 = ``;
    let query2 = ``;
    let query3 = ``;
    let query4 = ``;
    let query5 = ``;
    let query6 = ``;

    let queryResult = mssql.query(query1, (err1, result1)=>{
        if(err1){
            console.log('error in /adminDashboardCards query1');
        }
        else if(result1.recordset.length > 0){
            let queryResult2 = mssql.query(query2, (err2, result2)=>{
                if(err2){
                    console.log('error in /adminDashboardCards query2');
                }
                else if(result2.recordset.length > 0){
                    let queryResult3 = mssql.query(query3, (err3, result3)=>{
                        if(err3){
                            console.log('error in /adminDashboardCards query3');
                        }
                        else if(result3.recordset.length > 0){
                            let queryResult4 = mssql.query(query4, (err4, result4)=>{
                                if(err4){
                                    console.log('error in /adminDashboardCards query4');
                                }
                                else if(result4.recordset.length > 0){
                                    let queryResult5 = mssql.query(query5, (err5, result5)=>{
                                        if(err5){
                                            console.log('error in /adminDashboardCards query5');
                                        }
                                        else if(result5.recordset.length > 0){
                                            let queryResult6 = mssql.query(query6, (err6, result6)=>{
                                                if(err6){
                                                    console.log();
                                                }
                                                else if(result6.recordset.length > 0){
                                                    let val1 = Object.values(result1.recordset[0])[0];
                                                    let val2 = Object.values(result2.recordset[0])[0];
                                                    let val3 = Object.values(result3.recordset[0])[0];
                                                    let val4 = Object.values(result4.recordset[0])[0];
                                                    let val5 = Object.values(result5.recordset[0])[0];
                                                    let val6 = Object.values(result6.recordset[0])[0];
                                                    let resultArr = [];
                                                    resultArr.push(val1, val2, val3, val4, val5, val6);
                                                    res.send(resultArr);
                                                }
                                                else{
                                                    console.log('/passesCards query6 didnt return any result');
                                                }
                                            })
                                        }
                                        else{
                                            console.log('/passesCards query5 didnt return any result');
                                        }
                                    })
                                }
                                else{
                                    console.log('/passesCards query4 didnt return any result');
                                }
                            })
                        }
                        else{
                            console.log('/passesCards query3 didnt return any result');
                        }
                    })
                }
                else{
                    console.log('/passesCards query2 didnt return any result');
                }
            })
        }
        else{
            console.log('/passesCards query 1 didnt return any value');
        }
    })
});

app.post('/passesTable', (req, res)=>{
    let cardIndex = req.body.cardIndex;
    let query = ``;
    if(cardIndex == 1){
        query = ``;
    }
    else if(cardIndex == 2){
        query = ``;
    }
    else if(cardIndex == 3){
        query = ``;
    }
    else if(cardIndex == 4){
        query = ``;
    }
    else if(cardIndex == 5){
        query = ``;
    }
    else if(cardIndex == 6){
        query = ``;
    }

    let queryResult = mssql.query(query, (err, result)=>{
        if(err){
            console.log('error in /activityTable query');
        }
        else{
            res.send(result.recordset);
        }
    })
});

app.post('/passesChart', (req, res)=>{
    let cardIndex = req.body.cardIndex;
    let query = ``;
    let dataArr = [];
    let count = 0;
    let currentHour = moment().hour;
    let currentDate = moment().format('YYYY-MM-DD');

    for(let i = 0; i <= currentHour; i++){
        if(cardIndex == 1){
            query = ``;
        }
        else if(cardIndex == 2){
            query = ``;
        }
        else if(cardIndex == 3){
            query = ``;
        }
        else if(cardIndex == 4){
            query = ``;
        }
        else if(cardIndex == 5){
            query = ``;
        }
        else if(cardIndex == 6){
            query = ``;
        }
        let queryResult = mssql.query(query, (err, result)=>{
            if(err){
                console.log('Error in /adminDashboardChart query');
            }
            else if(result.recordset.length > 0){
                count++;
                let index = parseInt(Object.keys(result.recordset[0])[0]);
                let value = parseInt(Object.values(result.recordset[0])[0]);
                dataArr[index] = value;
                if(count == currentHour + 1){
                    res.send(dataArr);
                }
            }
            else{
                console.log('query didnt return any result');
            }
        })
    }
});

// pass requests

app.post('/passRequestCards', (req, res)=>{
    let query1 = ``;
    let query2 = ``;
    let query3 = ``;
    let query4 = ``;
    let query5 = ``;
    let query6 = ``;

    let queryResult = mssql.query(query1, (err1, result1)=>{
        if(err1){
            console.log('error in /adminDashboardCards query1');
        }
        else if(result1.recordset.length > 0){
            let queryResult2 = mssql.query(query2, (err2, result2)=>{
                if(err2){
                    console.log('error in /adminDashboardCards query2');
                }
                else if(result2.recordset.length > 0){
                    let queryResult3 = mssql.query(query3, (err3, result3)=>{
                        if(err3){
                            console.log('error in /adminDashboardCards query3');
                        }
                        else if(result3.recordset.length > 0){
                            let queryResult4 = mssql.query(query4, (err4, result4)=>{
                                if(err4){
                                    console.log('error in /adminDashboardCards query4');
                                }
                                else if(result4.recordset.length > 0){
                                    let queryResult5 = mssql.query(query5, (err5, result5)=>{
                                        if(err5){
                                            console.log('error in /adminDashboardCards query5');
                                        }
                                        else if(result5.recordset.length > 0){
                                            let queryResult6 = mssql.query(query6, (err6, result6)=>{
                                                if(err6){
                                                    console.log();
                                                }
                                                else if(result6.recordset.length > 0){
                                                    let val1 = Object.values(result1.recordset[0])[0];
                                                    let val2 = Object.values(result2.recordset[0])[0];
                                                    let val3 = Object.values(result3.recordset[0])[0];
                                                    let val4 = Object.values(result4.recordset[0])[0];
                                                    let val5 = Object.values(result5.recordset[0])[0];
                                                    let val6 = Object.values(result6.recordset[0])[0];
                                                    let resultArr = [];
                                                    resultArr.push(val1, val2, val3, val4, val5, val6);
                                                    res.send(resultArr);
                                                }
                                                else{
                                                    console.log('/passesCards query6 didnt return any result');
                                                }
                                            })
                                        }
                                        else{
                                            console.log('/passesCards query5 didnt return any result');
                                        }
                                    })
                                }
                                else{
                                    console.log('/passesCards query4 didnt return any result');
                                }
                            })
                        }
                        else{
                            console.log('/passesCards query3 didnt return any result');
                        }
                    })
                }
                else{
                    console.log('/passesCards query2 didnt return any result');
                }
            })
        }
        else{
            console.log('/passesCards query 1 didnt return any value');
        }
    })
});

app.post('/passRequestTable', (req, res)=>{
    let cardIndex = req.body.cardIndex;
    let query = ``;
    if(cardIndex == 1){
        query = ``;
    }
    else if(cardIndex == 2){
        query = ``;
    }
    else if(cardIndex == 3){
        query = ``;
    }
    else if(cardIndex == 4){
        query = ``;
    }
    else if(cardIndex == 5){
        query = ``;
    }
    else if(cardIndex == 6){
        query = ``;
    }

    let queryResult = mssql.query(query, (err, result)=>{
        if(err){
            console.log('error in /activityTable query');
        }
        else{
            res.send(result.recordset);
        }
    })
});

app.post('/passRequestChart', (req, res)=>{
    let cardIndex = req.body.cardIndex;
    let query = ``;
    let dataArr = [];
    let count = 0;
    let currentHour = moment().hour;
    let currentDate = moment().format('YYYY-MM-DD');

    for(let i = 0; i <= currentHour; i++){
        if(cardIndex == 1){
            query = ``;
        }
        else if(cardIndex == 2){
            query = ``;
        }
        else if(cardIndex == 3){
            query = ``;
        }
        else if(cardIndex == 4){
            query = ``;
        }
        else if(cardIndex == 5){
            query = ``;
        }
        else if(cardIndex == 6){
            query = ``;
        }
        let queryResult = mssql.query(query, (err, result)=>{
            if(err){
                console.log('Error in /adminDashboardChart query');
            }
            else if(result.recordset.length > 0){
                count++;
                let index = parseInt(Object.keys(result.recordset[0])[0]);
                let value = parseInt(Object.values(result.recordset[0])[0]);
                dataArr[index] = value;
                if(count == currentHour + 1){
                    res.send(dataArr);
                }
            }
            else{
                console.log('query didnt return any result');
            }
        })
    }
});

app.post('/settings', (req, res)=>{
    let query = ``;
    let queryResult = mssql.query(query, (err, result)=>{
        if(err){
            console.log('Error in /settings query');
        }
        else{
            res.send();
        }
    })
})

app.post('/updateAttendantDashboard', (req, res)=>{
    let q1 = `SELECT TOP 1 recordStatus FROM activity`; // read the recordStatus of the top record of activity table
    let q2 = `SELECT TOP 1 activityId, vehicleNumber, passType, entryLocation, verificationStatus FROM activity`; // read the top record from the activity table
    let q3 = ``; // capture record corresponding to the vehicle number from the ownerDetails Table
    let q4 = ``; // capture record corresponding to the vehicle number from where ever the guest details are being stored !!! 
    let q5 = ``; // update the recordStatus field of the captured record from activity table signifying that the record has been read

    let queryResult1 = mssql.query(q1, (err1, result1)=>{
        if(err1) throw err1
        else if(result1.recordset.length > 0){
            let recordStatus = Object.values(result1.recordset[0])[0];
            if( recordStatus == '0'){
                // captured record has not been read yet
                let queryResult2 = mssql.query(q2, (err2, result2)=>{
                    if(err2) throw err2
                    else if(result2.recordset.length > 0){
                        let entryRecord = Object.values(result2.recordset[0]);
                        let recordId = entryRecord[0];
                        let vehicleNumber = entryRecord[1];
                        q3 = `SELECT * FROM ownerDetails INNER JOIN vehicleDetails ON vehicleDetails.vehicleId=ownerDetails.vehicleId WHERE vehicleNumber='${vehicleNumber}'`; // set the query with the vehicle number
                        let queryResult3 = mssql.query(q3, (err3, result3)=>{
                            if(err3) throw err3
                            else if(result3.recordset.length > 0){
                                // vehicle belongs to an employee
                                let userDetails = Object.values(result3.recordset[0]);
                                q5 = `UPDATE activity SET recordStatus = '1' WHERE activityId = '${recordId}'`;
                                let queryResult5 = mssql.query(q5, (err5, result5)=>{
                                    if(err5) throw err5
                                    else{
                                        let responseArr = [];
                                        responseArr.push(recordStatus);
                                        responseArr.push(entryRecord);
                                        responseArr.push(userDetails);
                                        // console.log(responseArr);
                                        res.send(responseArr);
                                    }
                                })
                            }
                            else{
                                // vehicle belongs to a guest
                                q4 = `SELECT * FROM ownerDetails INNER JOIN vehicleDetails ON vehicleDetails.vehicleId=ownerDetails.vehicleId WHERE vehicleNumber='${vehicleNumber}'`;
                                let queryResult4 = mssql.query(q4, (err4, result4)=>{
                                    if(err4) throw err4
                                    else if(result4.recordset.length > 0){
                                        let userDetails = Object.values(result4.recordset[0]);
                                        q5 = `UPDATE activity SET recordStatus = '1' WHERE activityId = '${recordId}'`;
                                        let queryResult5 = mssql.query(q5, (err5, result5)=>{
                                            if(err5) throw err5
                                            else{
                                                let responseArr = [];
                                                responseArr.push(recordStatus); // 0 signifies a new record
                                                responseArr.push(entryRecord);
                                                responseArr.push(userDetails);
                                                // console.log(responseArr);
                                                res.send(responseArr);
                                            }
                                        })
                                    }
                                    else{
                                        // "I dont know where this vehicle came from" - Master Oogway
                                    }
                                })
                            }
                        })
                    }
                    else{
                        // no record present in the table
                    }
                })
            }
            else{
                // captured record has already been read
                console.log('Record has been read');
                res.send('Record has been read');
            }
        }
        else{
            // no record present in the table
        }
    })
})

// forms 

app.post('/schVisit', (req, res)=>{

})

app.post('/regVehicle', (req, res)=>{

})

app.post('/activityFilter', (req, res)=>{

});
app.post('/passesFilter', (req, res)=>{

});
