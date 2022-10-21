$(document).ready(function(){
    if(sessionStorage.getItem('privilege') != 'admin'){
        window.location.href = './login.html';
    }
    else{
        let entriesToday = document.getElementById('entriesToday');
        let guestVehicles = document.getElementById('guestVehicles');
        let staffOrgVehicles = document.getElementById('staffOrgVehicles');
        let specialPurposeVehicles = document.getElementById('specialPurposeVehicles');
        let passesIssued = document.getElementById('passesIssued');

        let chartCanvas = document.getElementById('dashboardChart').getContext('2d');

        let dashboardTableContainer = document.getElementById('tableBody');
        let tableResetBtn = document.getElementById('reset');
        let tableSearchField = document.getElementById('tableSearchField');
        let tableSearchBtn = document.getElementById('tableSearchBtn');

        let logOutBtn = document.getElementById('logOutBtn');

        // variables
        let tableStatus = 0;
        let chartLegend = ['00:00', '01:00', '02:00', '03:00', '04:00','05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
        let tableHeader = ['Serial', 'Plate number', 'Entry time', 'Entry date', 'Entry point', 'Exit time', 'Exit date', 'Exit point', 'Duration', 'Pass type', 'Pass status', 'Vehicle status'];

        let config = {
            type : 'line',
            data : {
                labels : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Midholiday', 'Saturday', 'Sunday', 'Holiday'],
                datasets : [{
                    borderColor : '#3f9dec',
                    backgroundColor : 'rgba(207, 235, 255, 0.6)',
                    data : [45, 30, 100, 102, 150, 145, 180, 45, 90],
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
        let chart = new Chart(chartCanvas, config);

        setAdminDashCards();
        setAdminDashChart();
        setAdminDashTable();

        setInterval(setAdminDashCards, 3000);
        setInterval(setAdminDashChart, 3000);
        setInterval(()=>{
            if(tableStatus == 0){
                setAdminDashTable();
            }
        }, 2000);

        // event listeners
        logOutBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            sessionStorage.setItem('passStatus', null);
            sessionStorage.setItem('userId', null);
            window.location.href = './login.html';
        });

        tableResetBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            tableStatus = 0;
            setAdminDashTable();
        });

        tableSearchBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            let searchFieldValue = tableSearchField.value;
            if(searchFieldValue.length > 0){
                tableStatus = 1;
                $.post(
                    'http://127.0.0.1:3000/adminDashboardTableSearch',
                    {
                        searchTerm : searchFieldValue
                    },
                    function(result){
                        renderTable(tableHeader, result);
                    }
                )
            }
        });

        // functions 

        function setAdminDashCards(){
            $.post(
                'http://127.0.0.1:3000/adminDashboardCards',
                function(result){
                    entriesToday.innerText = result[0];
                    guestVehicles.innerText = result[1];
                    staffOrgVehicles.innerText = result[2];
                    specialPurposeVehicles.innerText = result[3];
                    passesIssued.innerText = result[4];
                }
            )
        }

        function setAdminDashChart(){
            console.log(1);
            $.post(
                'http://127.0.0.1:3000/adminDashboardChart',
                function(result){
                    chart.data.labels = chartLegend;
                    chart.data.datasets[0].data = result;
                    chart.update();
                }
            )
        }

        function setAdminDashTable(){
            $.post(
                'http://127.0.0.1:3000/adminDashboardTable',
                function(result){
                    renderTable(tableHeader, result);
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
            dashboardTableContainer.append(table);
        }

    } // end of else
}) // end of .ready