$(document).ready(function(){
    if(sessionStorage.getItem('privilege') != 'admin'){
        window.location.href = './login.html';
    } // end of if
    else{
        let summaryPage = document.getElementById('summaryPanel');
        let requestPage = document.getElementById('passRequestPanel');
        let allPassesIssuedCard = document.getElementById('allPassesIssuedCard');
        let oneTimePassesCard = document.getElementById('oneTimePassesCard');
        let multiTimePassesCard = document.getElementById('multiTimePassesCard');
        let multiDayPassesCard = document.getElementById('multiDayPassesCard');
        let allTimePassesCard = document.getElementById('allTimePassesCard');
        let passesRevokedCard = document.getElementById('passesRevokedCard');

        let allPassesIssued = document.getElementById('allPassesIssued');
        let oneTimePasses = document.getElementById('oneTimePasses');
        let multiTimePasses = document.getElementById('multiTimePasses');
        let multiDayPasses = document.getElementById('multiDayPasses');
        let allTimePasses = document.getElementById('allTimePasses');
        let passesRevoked = document.getElementById('passesRevoked');

        let passesContainer = document.getElementById('tableBody');
        let passesTableResetBtn = document.getElementById('reset');
        let passesTableSearchField = document.getElementById('tableSearchField');
        let passesTableSearchSubmitBtn = document.getElementById('tableSearchBtn');

        let showTableBtn = document.getElementById('tableView');
        let showChartBtn = document.getElementById('chartView');
        
        let logOutBtn = document.getElementById('logOutBtn');
        
        let chart;
        let pageStatus = 1;
        let panelStatus = 1;
        let tableStatus = 1;
        let chartStatus = 1;
        let cardIndex = 1;
        let tableHeader = ['Serial', 'Plate number', 'Entry time', 'Entry date', 'Entry point', 'Exit time', 'Exit date', 'Exit point', 'Duration', 'Pass type', 'Pass status', 'Vehicle status'];
        let chartLegend = ['00:00', '01:00', '02:00', '03:00', '04:00','05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

        setPassesCards();
        passesTable();

        setInterval(setPassesCards, 3000);
        setInterval(()=>{
            if(panelStatus == 1 && tableStatus == 1){
                // the panel is in table mode and has not been searched
                passesTable();
            }
            else if(panelStatus == 2){
                passesChart();
            }
        }, 3000);

        // event listeners

        logOutBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            sessionStorage.setItem('passStatus', null);
            sessionStorage.setItem('userId', null);
            window.location.href = './login.html';
        });

        summaryPage.addEventListener('click', (e)=>{
            e.preventDefault();
            pageStatus = 1;
            if(panelStatus == 1){
                passesTable();
            }
            else if(panelStatus == 2){
                passesChart();
            }
        });
        requestPage.addEventListener('click', (e)=>{
            e.preventDefault();
            pageStatus = 2;
            if(panelStatus == 1){
                passesTable();
            }
            else if(panelStatus == 2){
                passesChart();
            }
        })

        showTableBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            if(panelStatus == 2){
                panelStatus = 1;
                let element = document.querySelector('canvas');
                element.remove();
                let tableElement = document.createElement('table');
                passesContainer.append(tableElement);
                passesTable();
            }
        });

        showChartBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            if(panelStatus == 1){
                panelStatus = 2;
                let getTable = document.querySelector('table');
                getTable.remove();
    
                let canvas = document.createElement('canvas');
                canvas.setAttribute('id', 'myChart');
                let config = {
                    type : 'line',
                    data : {
                        labels : [],
                        datasets : [{
                            borderColor : '#3f9dec',
                            backgroundColor : 'rgba(207, 235, 255, 0.6)',
                            data : [],
                            tension : 0.5,
                            fill : true,
                            borderWidth : 1
                        }]
                    },
                    options : {
                        plugins : {
                            legend : {display : false}
                        },
                        maintainAspectRatio : false
                    }
                }
                chart = new Chart(canvas, config);
                passesContainer.append(canvas);
                passesChart();
            }
        })
        allPassesIssuedCard.addEventListener('click', (e)=>{
            cardIndex = 1;
            if(panelStatus == 1){
            passesTable();
            }
            else if(panelStatus == 2){
                passesChart();
            }
        });
        oneTimePassesCard.addEventListener('click', (e)=>{
            cardIndex = 2;
            if(panelStatus == 1){
            passesTable();
            }
            else if(panelStatus == 2){
                passesChart();
            }
        });
        multiTimePassesCard.addEventListener('click', (e)=>{
            e.preventDefault();
            cardIndex = 3;
            if(panelStatus == 1){
            passesTable();
            }
            else if(panelStatus == 2){
                passesChart();
            }
        });
        multiDayPassesCard.addEventListener('click', (e)=>{
            e.preventDefault();
            cardIndex = 4;
            if(panelStatus == 1){
            passesTable();
            }
            else if(panelStatus == 2){
                passesChart();
            }
        });
        allTimePassesCard.addEventListener('click', (e)=>{
            e.preventDefault();
            cardIndex = 5;
            if(panelStatus == 1){
            passesTable();
            }
            else if(panelStatus == 2){
                passesChart();
            }
        });
        passesRevokedCard.addEventListener('click', (e)=>{
            e.preventDefault();
            cardIndex = 6;
            if(panelStatus == 1){
            passesTable();
            }
            else if(panelStatus == 2){
                passesChart();
            }
        });
        passesTableResetBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            if(panelStatus == 1){
                tableStatus = 1;
                passesTable();
            }
        });
        passesTableSearchSubmitBtn.addEventListener('click', (e)=>{
            console.log(1);
            e.preventDefault();
            tableStatus = 2;
            searchTerm = passesTableSearchField.value;
            if(searchTerm.length > 0){
                $.post(
                    'http://127.0.0.1:3000/searchPassPanel',
                    {
                        pageStatus : pageStatus,
                        panelStatus : panelStatus,
                        cardIndex : cardIndex,
                        searchTerm : searchTerm
                    },
                    function(result){
                        if(panelStatus == 1){
                        renderTable(tableHeader, result);
                        }
                        else if(panelStatus == 2){
                            chart.data.labels = chartLegend;
                            chart.data.datasets[0].data = result;
                            chart.update();
                        }
                    }
                )
            }
        });

        // function

        function setPassesCards(){
            $.post(
                'http://127.0.0.1:3000/passesCards',
                {
                    pageStatus : pageStatus
                },
                function(result){
                    allPassesIssued.innerText = result[0];
                    oneTimePasses.innerText = result[1];
                    multiTimePasses.innerText = result[2];
                    multiDayPasses.innerText = result[3];
                    allTimePasses.innerText = result[4];
                    passesRevoked.innerText = result[5];
                }
            )
        }

        function passesTable(){
            $.post(
                'http://127.0.0.1:3000/passesTable',
                {
                    cardIndex : cardIndex,
                    pageStatus : pageStatus
                },
                function(result){
                    renderTable(tableHeader, result)
                }
            )
        }

        function passesChart(){
            $.post(
                'http://127.0.0.1:3000/passesChart',
                {
                    cardIndex : cardIndex,
                    pageStatus : pageStatus
                },
                function(result){
                    console.log(result);
                    chart.data.labels = chartLegend;
                    chart.data.datasets[0].data = result;
                    chart.update();
                }
            )
        }

        function renderTable(header, data){
            let element = document.querySelector('table');
            element.remove();
            let table = document.createElement('table');
            let thead = document.createElement('thead');
            let tbody = document.createElement('tbody');
            let tableHeader = document.createElement('tr');
    
            for(let i = 0; i < header.length; i++){
                let th = document.createElement('th');
                th.innerText = header[i];
                tableHeader.appendChild(th);
            }
            for(let x in data){
                let row = tbody.insertRow(x);
                for(let i = 0; i < header.length; i++){
                    let cellData = Object.values(data[x])[i];
                    if(cellData != null){
                        row.insertCell(i).innerText = cellData;
                    }
                    else{
                        row.insertCell(i).innerText = " ";
                    }
                }
                let c = 0;
                if(pageStatus == 2){
                    if(c == 0){
                        let actionHeader = document.createElement('th');
                        actionHeader.innerText = 'Actions';
                        tableHeader.appendChild(actionHeader);
                        c = 1;
                    }
                    let approveBtn = document.createElement('button');
                    let denyBtn = document.createElement('button');
                    approveBtn.className = 'approve';
                    approveBtn.innerText = 'Approve';
                    denyBtn.className = 'deny';
                    denyBtn.innerText = 'Deny';

                    row.insertCell(header.length).append(approveBtn, denyBtn);
                }
            }
            thead.append(tableHeader);
            table.append(thead);
            table.append(tbody);
            passesContainer.append(table);
            actions();
        }

        function actions(){
            $('.approve').click(function(){
                this.nextElementSibling.style.display = 'none';
                // console.log(1);
                let value = this.parentElement.parentElement.children[0].innerText;
                console.log(value);
            })
    
            $('.deny').click(function(){
                this.previousElementSibling.style.display = 'none';
                let value = this.parentElement.parentElement.children[0].innerText;
                console.log(value);
            })
        }
    } // end of else
}) // end of .ready