const express = require('express');
const cors = require('cors');
const mssql = require('mssql');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const nodemailer = require('nodemailer');

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

// login page 

app.post('/login', (req, res)=>{
    let userCred = req.body.userCred;
    let userPass = req.body.userPass;
    
    if(userCred == 1000 && userPass == 'user1'){
        res.send([1, 'admin', 1000 , './adminDashboard.html']);
    }
    else if(userCred == 1001 && userPass == 'user2'){
        res.send([1, 'attendant', 1001, './adminDashboard.html']);
    }
    else{
        res.send([2, 'Password didnt match']);
    }
});

// contact us

app.post('/contactUs', (req, res)=>{
    console.log(req.body);
})

// admin dashboard
app.post('/adminDashboardCards', (req, res)=>{
    res.send([10, 20, 30, 20, 10]);
});

app.post('/adminDashboardChart', (req, res)=>{
    res.send([10, 12, 18, 22, 33, 26]);
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
    console.log(req.body.searchTerm);
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
    res.send([20, 30, 40, 30, 20]);
});

app.post('/activityTable', (req, res)=>{
    let cardIndex = req.body.cardIndex;
    let query = ``;
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
        )
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
        )
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
        )
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
        )
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
        )
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
    console.log(req.body);
});

// passes 

app.post('/passesCards', (req, res)=>{
    let pageStatus = req.body.pageStatus;
    if(pageStatus == 1){
        res.send([90, 80, 70, 60, 50, 40]);
    }
    else if(pageStatus == 2){
        res.send([10, 20, 30, 40, 50, 60]);
    }
});

app.post('/passesTable', (req, res)=>{
    let pageStatus = req.body.pageStatus;
    let cardIndex = req.body.cardIndex;

    if(pageStatus == 1){
        if(cardIndex == 1){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'AA32CS202',
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
        }
        else if(cardIndex == 2){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'BB32CS202',
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
        }
        else if(cardIndex == 3){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'CC32CS202',
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
        }
        else if(cardIndex == 4){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'DD32CS202',
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
        }
        else if(cardIndex == 5){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'EE32CS202',
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
        }
        else if(cardIndex == 6){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'FF32CS202',
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
        }
    }
    else if(pageStatus == 2){
        if(cardIndex == 1){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'ZZ32CS202',
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
        }
        else if(cardIndex == 2){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'YY32CS202',
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
        }
        else if(cardIndex == 3){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'XX32CS202',
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
        }
        else if(cardIndex == 4){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'WW32CS202',
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
        }
        else if(cardIndex == 5){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'VV32CS202',
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
        }
        else if(cardIndex == 6){
            res.send(
                [
                    {
                        serial : 6304,
                        plate_number : 'UU32CS202',
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
        }
    }
});

app.post('/passesChart', (req, res)=>{
    let cardIndex = req.body.cardIndex;
    let pageStatus = req.body.pageStatus;
    
    if(pageStatus == 1){
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
        else if(cardIndex == 6){
            res.send([10, 10, 20, 20, 80, 80, 60, 60, 20, 20]);
        }
    }
    else if(pageStatus == 2){
        if(cardIndex == 1){
            res.send([10, 10, 20, 20, 80, 80, 60, 60, 20, 20]);
        }
        else if(cardIndex == 2){
            res.send([40, 20, 80, 80, 80, 50, 50, 10])
        }
        else if(cardIndex == 3){
            res.send([10, 20, 20, 40, 40, 40, 20, 65, 55, 45, 25]);
        }
        else if(cardIndex == 4){
            res.send([50, 50, 15, 35, 40, 60, 20]);
        }
        else if(cardIndex == 5){
            res.send([100, 50, 0, 20, 20, 20, 10, 10, 60]);
        }
        else if(cardIndex == 6){
            res.send([10, 50, 100, 10, 30, 30, 20]);
        }
    }
});

// pass requests

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

app.post('/contactUs', (req, res)=>{
    console.log(req.body);
})

app.post('/scheduleVisit', (req, res)=>{
    console.log(req.body);
})

app.post('/vehicleRegistration', (req, res)=>{
    console.log(req.body);
})

app.post('/activityFilter', (req, res)=>{

});
app.post('/passesFilter', (req, res)=>{

});
