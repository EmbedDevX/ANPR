$(document).ready(function(){
    if(sessionStorage.getItem('privilege') != 'admin'){
        window.location.href = './login.html';
    } // end of if
    else{
        let entriesTodayCard = document.getElementById('entriesTodayCard');
        let guestVehiclesCard = document.getElementById('guestVehiclesCard');
        let staffOrgVehiclesCard = document.getElementById('staffOrgVehiclesCard');
        let specialPurposeVehiclesCard = document.getElementById('specialPurposeVehiclesCard');
        let blackListedVehiclesCard =  document.getElementById('blackListedVehiclesCard');

        let entriesToday =  document.getElementById('entriesToday');
        let guestVehicles =  document.getElementById('guestVehicles');
        let staffOrgVehicles =  document.getElementById('staffOrgVehicles');
        let specialPurposeVehicles =  document.getElementById('specialPurposeVehicles');
        let blackListedVehicles =  document.getElementById('blackListedVehicles');

        let activityContainer = document.getElementById('activityTableContainer');
        let activityTableResetBtn =  document.getElementById('reset');
        let activityTableSearchField = document.getElementById('tableSearchField');
        let activityTableSearchSubmitBtn = document.getElementById('tableSearchBtn');

        let showTableBtn = document.getElementById('tableView');
        let showChartBtn = document.getElementById('chartView');

        let logOutBtn = document.getElementById('logOutBtn');
        //variables
        let chart;
        let cardIndex = 1;
        let panelStatus = 1; // 1 - table , 2 - chart
        let tableStatus = 1;
        let chartStatus = 1;
        let tableHeader = ['Serial', 'Plate number', 'Entry time', 'Entry date', 'Entry point', 'Exit time', 'Exit date', 'Exit point', 'Duration', 'Pass type', 'Pass status', 'Vehicle status'];
        let chartLegend = ['00:00', '01:00', '02:00', '03:00', '04:00','05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

        //  function calls 

        setActivityCards();
        activityTable();

        setInterval(setActivityCards, 3000);
        setInterval(()=>{
            if(panelStatus == 1 && tableStatus == 1){
                // the panel is in table mode and has not been searched
                activityTable();
            }
            else if(panelStatus == 2 && chartStatus == 1){
                activityChart();
            }
        }, 3000);

        // event listeners

        logOutBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            sessionStorage.setItem('passStatus', null);
            sessionStorage.setItem('userId', null);
            window.location.href = './login.html';
        });

        showTableBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            if(panelStatus == 2){
                panelStatus = 1;
                let element = document.querySelector('canvas');
                element.remove();
                let tableElement = document.createElement('table');
                activityContainer.append(tableElement);
                activityTable();
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
                activityContainer.append(canvas);
                console.log(activityContainer);
                activityChart();
            }
        })
        entriesTodayCard.addEventListener('click', (e)=>{
            cardIndex = 1;
            if(panelStatus == 1){
            activityTable();
            }
            else if(panelStatus == 2){
                activityChart();
            }
        });
        guestVehiclesCard.addEventListener('click', (e)=>{
            cardIndex = 2;
            if(panelStatus == 1){
            activityTable();
            }
            else if(panelStatus == 2){
                activityChart();
            }
        });
        staffOrgVehiclesCard.addEventListener('click', (e)=>{
            e.preventDefault();
            cardIndex = 3;
            if(panelStatus == 1){
            activityTable();
            }
            else if(panelStatus == 2){
                activityChart();
            }
        });
        specialPurposeVehiclesCard.addEventListener('click', (e)=>{
            e.preventDefault();
            cardIndex = 4;
            if(panelStatus == 1){
            activityTable();
            }
            else if(panelStatus == 2){
                activityChart();
            }
        });
        blackListedVehiclesCard.addEventListener('click', (e)=>{
            e.preventDefault();
            cardIndex = 5;
            if(panelStatus == 1){
            activityTable();
            }
            else if(panelStatus == 2){
                activityChart();
            }
        });
        activityTableResetBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            if(panelStatus == 1){
                tableStatus = 1;
                chartStatus = 1;
                activityTable();
            }
        });
        activityTableSearchSubmitBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            tableStatus = 2;
            chartStatus = 2;
            searchTerm = activityTableSearchField.value;
            if(searchTerm.length > 0){
                $.post(
                    'http://127.0.0.1:3000/searchActivityTable',
                    {
                        panelStatus : panelStatus,
                        cardIndex : cardIndex,
                        searchTerm : searchTerm
                    },
                    function(result){
                        if(panelStatus == 2){
                            chart.data.labels = chartLegend;
                            chart.data.datasets[0].data = result;
                            chart.update();
                        }
                        else if(panelStatus == 1){
                            renderTable(tableHeader, result);
                        }
                    }
                )
            }
        });

        // function

        function setActivityCards(){
            $.post(
                'http://127.0.0.1:3000/activityCards',
                function(result){
                    entriesToday.innerText = result[0];
                    guestVehicles.innerText = result[1];
                    staffOrgVehicles.innerText = result[2];
                    specialPurposeVehicles.innerText = result[3];
                    blackListedVehicles.innerText = result[4];
                }
            )
        }

        function activityTable(){
            $.post(
                'http://127.0.0.1:3000/activityTable',
                {
                    cardIndex : cardIndex
                },
                function(result){
                    renderTable(tableHeader, result)
                }
            )
        }

        function activityChart(){
            $.post(
                'http://127.0.0.1:3000/activityChart',
                {
                    cardIndex : cardIndex
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
                        row.insertCell(i).innerText = cellData;
                    }
                }
            }
            thead.append(tableHeader);
            table.append(thead);
            table.append(tbody);
            activityContainer.append(table);
        }
    } // end of else 
}); // end of .ready