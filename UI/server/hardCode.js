// packages and setup

const express = require('express');
const cors = require('cors');
const mssql = require('mssql');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const nodemailer = require('nodemailer');
const e = require('express');

const app = express();
const port = 3000;

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


// routes 

// login page

app.post('/login', (req, res)=>{
    console.log(1);
    let userCred = req.body.userCred;
    let userPass = req.body.userPass;
    
    console.log(userCred);
    console.log(userPass);

    if((userCred == 1000 || userCred == 'sayantan@testmail.com') && userPass == 'user1'){
        res.send([1, 'admin', 1000, './adminDashboard.html']);
    }
    else if((userCred == 1001 || userCred == 'sayantanGhosh@testmail.com') && userPass == 'user2'){
        res.send([1, 'attendant', 1001, './securityDashboard.html']);
    }
    else{
        res.send([2, 'Invalid credentials']);
    }

});

// contact page

app.post('/contactUs', (req, res)=>{
    visitorName = req.body.visitorName;
    visitorEmail = req.body.visitorEmail;
    visitorMsg = req.body.visitorMsg;

    console.log(`visitor name : ${visitorName}, visitor email : ${visitorEmail}, visitor message : ${visitorMsg}`);

    res.send('Mail sent');

});

// admin dashboard 

app.post('/adminDashboardCards', (req, res)=>{
    res.send([61, 23, 10, 28, 61]);
});

app.post('/adminDashboardChart', (req, res)=>{
    res.send([10, 20 , 50, 60, 80, 30, 65]);
});

app.post('/adminDashboardTable', (req, res)=>{
    res.send(
        [
            {
                serial : 6304,
                plate_number : 'MH32CS202',
                entry_time : '13:24 PM',
                entry_date : '26-09-2022',
                entry_point : 'Gate no. 6',
                exit_time : '15:22 PM',
                exit_date : '26-09-2022',
                exit_point : 'Gate no. 3',
                duration : '01 hr 58 min',
                pass_type : 'OTEEP',
                pass_status : 'Valid',
                vehicleStatus : 'On-premise'
            },
            {
                serial : 5104,
                plate_number : 'TN06CG314',
                entry_time : '13:24 PM',
                entry_date : '26-09-2022',
                entry_point : 'Gate no. 3',
                exit_time : '15:22 PM',
                exit_date : '26-09-2022',
                exit_point : 'Gate no. 6',
                duration : '01 hr 58 min',
                pass_type : 'OTEEP',
                pass_status : 'Valid',
                vehicleStatus : 'On-premise'
            }
        ]
    )
});

app.post('/adminDashboardTableSearch', (req, res)=>{
    res.send(
        [
            {
                serial : 6304,
                plate_number : 'XZ32CS202',
                entry_time : '13:24 PM',
                entry_date : '26-09-2022',
                entry_point : 'Gate no. 6',
                exit_time : '15:22 PM',
                exit_date : '26-09-2022',
                exit_point : 'Gate no. 3',
                duration : '01 hr 58 min',
                pass_type : 'OTEEP',
                pass_status : 'Valid',
                vehicleStatus : 'On-premise'
            }
        ]
    )
});

// activity page

app.post('/activityCards', (req, res)=>{
    res.send([10, 80, 50, 20, 60, ]);
});

app.post('/activityTable', (req, res)=>{
    let panelStatus = req.body.panelStatus;
    let cardIndex = req.body.cardIndex;

    if(cardIndex == 1){
        res.send(
            [
                {
                    serial : 6304,
                    plate_number : 'AB32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]
        );
    }
    else if(cardIndex == 2){
        res.send(
            [
                {
                    serial : 6304,
                    plate_number : 'BC32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]
        );
    }
    else if(cardIndex == 3){
        res.send(
            [
                {
                    serial : 6304,
                    plate_number : 'CD32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]
        );
    }
    else if(cardIndex == 4){
        res.send(
            [
                {
                    serial : 6304,
                    plate_number : 'DE32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]
        );
    }
    else if(cardIndex == 5){
        res.send(
            [
                {
                    serial : 6304,
                    plate_number : 'EF32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]
        );
    }
});

app.post('/activityChart', (req, res)=>{
    let cardIndex = req.body.cardIndex;
    
    if(cardIndex == 1){
        res.send([10, 50, 100, 10, 30, 30, 20]);
    }
    else if(cardIndex == 2){
        res.send([50, 50, 15, 35, 40, 60, 20]);
    }
    else if(cardIndex == 3){
        res.send([100, 50, 0, 20, 20, 20, 10, 10, 60]);
    }
    else if(cardIndex == 4){
        res.send([40, 20, 80, 80, 80, 50, 50, 10]);
    }
    else if(cardIndex == 5){
        res.send([10, 20, 20, 40, 40, 40, 20, 65, 55, 45, 25]);
    }
});

app.post('/searchActivityTable', (req, res)=>{
    let panelStatus = req.body.panelStatus;
    let cardIndex = req.body.cardIndex;
    let searchTerm = req.body.searchTerm;

    if(panelStatus == 1){
        // tables
        if(cardIndex == 1){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'AR32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]
            );
        }
        else if(cardIndex == 2){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'BR32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]
            );
        }
        else if(cardIndex == 3){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'CR32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]
            );
        }
        else if(cardIndex == 4){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'DR32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]
            );
        }
        else if(cardIndex == 5){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'ER32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]
            );
        }
        else if(cardIndex == 6){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'FR32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]
            );
        }
    }
    else if(panelStatus == 2){
        // charts
        if(cardIndex == 1){
            res.send([10, 50, 50, 50, 80, 40, 45, 70, 35]);
        }
        else if(cardIndex == 2){
            res.send([30, 55, 20, 60, 70, 55, 11, 72]);
        }
        else if(cardIndex == 3){
            res.send([50, 50, 50, 55, 60, 10, 70, 75, 80, 100, 60, 40, 20]);
        }
        else if(cardIndex == 4){
            res.send([20, 50, 11, 19, 75, 40]);
        }
        else if(cardIndex == 5){
            res.send([11, 55, 40, 32, 60, 60, 70, 20]);
        }
        else if(cardIndex == 6){
            res.send([40, 20, 20, 20, 70, 20, 20, 20, 50, 40, 30, 20, 10]);
        }
    }
});

// passes page

app.post('/passesCards', (req, res)=>{
    res.send([19, 29, 39, 49, 59, 79]);
});

app.post('/passesTable', (req, res)=>{
    let pageStatus = req.body.pageStatus;
    let cardIndex = req.body.cardIndex;

    if(pageStatus == 1){
        if(cardIndex == 1){
            res.send([
                {
                    serial : 6304,
                    plate_number : 'AZ32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]);
        }
        else if(cardIndex == 2){
            res.send([
                {
                    serial : 6304,
                    plate_number : 'BY32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]);
        }
        else if(cardIndex == 3){
            res.send([
                {
                    serial : 6304,
                    plate_number : 'CX32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]);
        }
        else if(cardIndex == 4){
            res.send([
                {
                    serial : 6304,
                    plate_number : 'DW32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]);
        }
        else if(cardIndex == 5){
            res.send([
                {
                    serial : 6304,
                    plate_number : 'EV32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]);
        }
        else if(cardIndex == 6){
            res.send([
                {
                    serial : 6304,
                    plate_number : 'FU32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]);
        }
    }
    else if(pageStatus == 2){
        if(cardIndex == 1){
            res.send([
                {
                    serial : 6304,
                    plate_number : 'GT32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]);
        }
        else if(cardIndex == 2){
            res.send([
                {
                    serial : 6304,
                    plate_number : 'HS32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]);
        }
        else if(cardIndex == 3){
            res.send([
                {
                    serial : 6304,
                    plate_number : 'IR32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]);
        }
        else if(cardIndex == 4){
            res.send([
                {
                    serial : 6304,
                    plate_number : 'JQ32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]);
        }
        else if(cardIndex == 5){
            res.send([
                {
                    serial : 6304,
                    plate_number : 'KP32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]);
        }
        else if(cardIndex == 6){
            res.send([
                {
                    serial : 6304,
                    plate_number : 'LO32CS202',
                    entry_time : '13:24 PM',
                    entry_date : '26-09-2022',
                    entry_point : 'Gate no. 6',
                    exit_time : '15:22 PM',
                    exit_date : '26-09-2022',
                    exit_point : 'Gate no. 3',
                    duration : '01 hr 58 min',
                    pass_type : 'OTEEP',
                    pass_status : 'Valid',
                    vehicleStatus : 'On-premise'
                }
            ]);
        }
    }
});

app.post('/passesChart', (req, res)=>{
    let pageStatus = req.body.pageStatus;
    let cardIndex = req.body.cardIndex;

    if(pageStatus == 1){
        if(cardIndex == 1){
            res.send([11, 22, 33, 44, 55, 66, 77, 88, 99]);
        }
        else if(cardIndex == 2){
            res.send([15, 65, 22, 18, 65, 75, 65, 22, 22]);
        }
        else if(cardIndex == 3){
            res.send([100, 70, 30, 10, 20, 40, 30, 60, 45, 55, 50, 50]);
        }
        else if(cardIndex == 4){
            res.send([0, 20, 40, 60, 80, 100, 80, 60, 40, 20, 0]);
        }
        else if(cardIndex == 5){
            res.send([0, 50, 100, 90, 80, 70, 60, 50, 40, 50, 60, 70, 80, 90, 100, 50, 0]);
        }
        else if(cardIndex == 6){
            res.send([0, 50, 100, 80, 60, 40, 20, 40, 60, 80, 60, 40, 20, 40, 60, 80, 100, 50, 0]);
        }
    }
    else if(pageStatus == 2){
        if(cardIndex == 1){
            res.send([0, 20, 40, 60, 80, 60, 60, 60, 60, 60, 80, 60, 40, 20, 0]);
        }
        else if(cardIndex == 2){
            res.send([0, 50, 100, 100, 60, 60, 60, 60, 60, 40, 40, 40, 40, 20, 10, 0]);
        }
        else if(cardIndex == 3){
            res.send([0, 10, 20, 40, 40, 40, 40, 60, 60, 60, 60, 60, 100, 100, 50, 0]);
        }
        else if(cardIndex == 4){
            res.send([0 , 50, 50, 50, 80, 80, 80, 100, 80, 80, 80, 50, 50, 50, 0]);
        }
        else if(cardIndex == 5){
            res.send([0, 20, 20, 20, 40, 40, 40, 60, 60, 60, 70, 70, 70, 20]);
        }
        else if(cardIndex == 6){
            res.send([0, 20, 40, 60, 40, 20, 40, 60, 40, 20, 40, 60, 40, 20, 0]);
        }
    }
});

app.post('/searchPassPanel', (req, res)=>{
    let pageStatus = req.body.pageStatus;
    let panelStatus = req.body.panelStatus;
    let cardIndex = req.body.cardIndex;

    if(pageStatus == 1){
        // summary data
        if(panelStatus == 1){
            // summary data table
            if(cardIndex == 1){
                res.send([
                    {
                        serial : 6304,
                        plate_number : 'AM32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]);
            }
            else if(cardIndex == 2){
                res.send([
                    {
                        serial : 6304,
                        plate_number : 'BM32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]);
            }
            else if(cardIndex == 3){
                res.send([
                    {
                        serial : 6304,
                        plate_number : 'CM32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]);
            }
            else if(cardIndex == 4){
                res.send([
                    {
                        serial : 6304,
                        plate_number : 'DM32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]);
            }
            else if(cardIndex == 5){
                res.send([
                    {
                        serial : 6304,
                        plate_number : 'EM32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]);
            }
            else if(cardIndex == 6){
                res.send([
                    {
                        serial : 6304,
                        plate_number : 'FM32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]);
            }
        }
        else if(panelStatus == 2){
            // summary data chart
            if(cardIndex == 1){
                res.send([0, 100, 0, 11, 22, 33, 44, 55, 66, 77, 88, 99]);
            }
            else if(cardIndex == 2){
                res.send([0, 100, 0, 15, 65, 22, 18, 65, 75, 65, 22, 22]);
            }
            else if(cardIndex == 3){
                res.send([0, 100, 0, 100, 70, 30, 10, 20, 40, 30, 60, 45, 55, 50, 50]);
            }
            else if(cardIndex == 4){
                res.send([0, 100, 0, 0, 20, 40, 60, 80, 100, 80, 60, 40, 20, 0]);
            }
            else if(cardIndex == 5){
                res.send([0, 100, 0, 0, 50, 100, 90, 80, 70, 60, 50, 40, 50, 60, 70, 80, 90, 100, 50, 0]);
            }
            else if(cardIndex == 6){
                res.send([0, 100, 0, 0, 50, 100, 80, 60, 40, 20, 40, 60, 80, 60, 40, 20, 40, 60, 80, 100, 50, 0]);
            }
        }
    }
    else if(pageStatus == 2){
        // request data
        if(panelStatus == 1){
            // request data table
            if(cardIndex == 1){
                res.send([
                    {
                        serial : 6304,
                        plate_number : 'AP32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]);
            }
            else if(cardIndex == 2){
                res.send([
                    {
                        serial : 6304,
                        plate_number : 'BP32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]);
            }
            else if(cardIndex == 3){
                res.send([
                    {
                        serial : 6304,
                        plate_number : 'CP32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]);
            }
            else if(cardIndex == 4){
                res.send([
                    {
                        serial : 6304,
                        plate_number : 'DP32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]);
            }
            else if(cardIndex == 5){
                res.send([
                    {
                        serial : 6304,
                        plate_number : 'EP32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]);
            }
            else if(cardIndex == 6){
                res.send([
                    {
                        serial : 6304,
                        plate_number : 'FP32CS202',
                        entry_time : '13:24 PM',
                        entry_date : '26-09-2022',
                        entry_point : 'Gate no. 6',
                        exit_time : '15:22 PM',
                        exit_date : '26-09-2022',
                        exit_point : 'Gate no. 3',
                        duration : '01 hr 58 min',
                        pass_type : 'OTEEP',
                        pass_status : 'Valid',
                        vehicleStatus : 'On-premise'
                    }
                ]);
            }
        }
        else if(panelStatus == 2){
            // request data chart
            if(cardIndex == 1){
                res.send([100, 0, 100, 0, 20, 40, 60, 80, 60, 60, 60, 60, 60, 80, 60, 40, 20, 0]);
            }
            else if(cardIndex == 2){
                res.send([100, 0, 100, 0, 50, 100, 100, 60, 60, 60, 60, 60, 40, 40, 40, 40, 20, 10, 0]);
            }
            else if(cardIndex == 3){
                res.send([100, 0, 100, 0, 10, 20, 40, 40, 40, 40, 60, 60, 60, 60, 60, 100, 100, 50, 0]);
            }
            else if(cardIndex == 4){
                res.send([100, 0, 100, 0 , 50, 50, 50, 80, 80, 80, 100, 80, 80, 80, 50, 50, 50, 0]);
            }
            else if(cardIndex == 5){
                res.send([100, 0, 100, 0, 20, 20, 20, 40, 40, 40, 60, 60, 60, 70, 70, 70, 20]);
            }
            else if(cardIndex == 6){
                res.send([100, 0, 100, 0, 20, 40, 60, 40, 20, 40, 60, 40, 20, 40, 60, 40, 20, 0]);
            }
        }
    }
});

// security dashboard

app.post('/updateAttendantDashboard', (req, res)=>{
    let vehicleDetails  = ['Blank', 'FG32CS202', 'All-Time-Entry-Exit Pass', '6', 'Verified'];
    let userDetails = ['blank', 'blank', 'Sayantan Ghosh', '9786756453'];
    let details = [];
    details.push(0, vehicleDetails, userDetails);
    res.send(details);
});

// profile

app.post('/userDetails', (req, res)=>{
    let userId = req.body;

    res.send(['Sayantan Ghosh', 1000, 'Electronics', 'Administrator']);
});

app.post('/userRegisteredVehicles', (req, res)=>{
    res.send(
        [
            {
                plate_number : 'AB32CS202',
                serial : 6304,
                status : 'Active'
            },
            {
                plate_number : 'CD32CS202',
                serial : 6304,
                status : 'De-Registered'
            }
        ]
    );
});