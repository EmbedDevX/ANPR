$(document).ready(function(){
    if(sessionStorage.getItem('passVar') != 'adminPass'){
        window.location.href = './index.html';
    }
    else{
        let entriesToday = document.getElementById();
        let guestVehicles = document.getElementById();
        let staffOrgVehicles = document.getElementById();
        let specialPurposeVehicles = document.getElementById();
        let passesIssued = document.getElementById();

        let chartContainer = document.getElementById().getContext('2d');

        let tableContainer = document.getElementById();
        let tableSearchField = document.getElementById();
        let tableSearchBtn = document.getElementById();
        let tableResetBtn = document.getElementById();

        let tableStatus = 1;

        let logoutBtn = document.getElementById();

        logoutBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            sessionStorage.setItem('passVar', 'none');
        })

        let config = {
            type: 'bar',
            data : {
                labels : [],
                datasets : [{
                    backgroundColor : '#3f9dec',
                    data: []
                }]
            },
            options : {
                plugins : {
                    legend : {display : false}
                },
                maintainAspectRatio : false
            }
        }

        chart = new Chart(chartContainer, config);




        setDashCards();
        updateDashChart();
        setDashTable();

        setInterval(()=>{
            setCards();
        }, 3000)

        setInterval(()=>{
            updateDashChart();
        }, 3000)

        setInterval(()=>{
            if(tableStatus == 1){
                setDashTable();
            }
        }, 3000);

        tableSearchBtn.addEventListener('click', ()=>{
            tableStatus = 2;
            if(tableSearchField.value.length != 0){
                $.post(
                    "http://127.0.0.1:3000/searchLatestEntries",
                    {
                        searchTerm : tableSearchField.value
                    },
                    function(result){
                        renderTable(result);
                    }
                )
            }
        })

        tableResetBtn.addEventListener('click', ()=>{
            tableStatus = 1;
            setDashTable();
        })


        function setDashCards(){
            $.get(
                "http://127.0.0.1:3000/setDashCards",
                function(result){
                    entriesToday.innerText = result[0];
                    guestVehicles.innerText = result[1];
                    staffOrgVehicles.innerText = result[2];
                    specialPurposeVehicles.innerText = result[3];
                    passesIssued.innerText = result[4];
                }
            )
        }


        function updateDashChart(){
            $.get(
                "http://127.0.0.1:3000/updateDashChart",
                function(result){
                    chart.data.labels = result[0];
                    chart.data.datasets[0].data = result[1];
                    chart.update();
                }
            )
        }


        function setDashTable(){
            $.get(
                "http://127.0.0.1:3000/setDashTable",
                function(result){
                    renderTable(result);
                }
            )
        }

        function renderTable(){
            let headerArr = ['Serial', 'Plate number', 'Entry time', 'Entry date', 'Entry point', 'Exit time', 'Exit date', 'Exit point', 'Duration', 'Pass type', 'Pass status', 'Vehicle status'];
            let element = document.querySelector('table');
            element.remove();
            let table = document.createElement('table');
            table.className = 'table';
            let thead = document.createElement('thead');
            let tbody = document.createElement('tbody');
            let tr = document.createElement('tr');

            for(let i = 0; i < headerArr.lenght; i++){
                let th = document.createElement('th');
                th.innerText = headerArr[i];
                tr.appendChild(th);
            }
            for(let x in result){
                let row = tbody.insertRow(x);
                let objectLength = Object.values(result[x]).lenght;
                for(let i = 0; i < objectLenght; i++){
                    let data = Object.values(result[x])[i];
                    if(data != null){
                        row.insertCell(i).innerText = data;
                    }
                    else{
                        row.insertCell(i).innerText = " ";
                    }
                }
            }

            thead.append(tr);
            table.append(thead);
            table.append(tbody);
            tableContainer.append(table);
        }
    }
})