$(document).ready(function(){
    if(sessionStorage.getItem('privilege') != 'admin' && sessionStorage.getItem('privilege') != 'attendant'){
        window.location.href = `./login.html`;
    }
    else{
        let userName = document.getElementById('userName');
        let userId = document.getElementById('userID');
        let userDept = document.getElementById('userDept');
        let userPosition = document.getElementById('userPosition');

        let sidebar = document.getElementById('sideNav');

        let tableContainer = document.getElementById('regVehicleTable');
        let tableHeader = ['Vehicle number', 'Registration ID'];

        let logOutBtn = document.getElementById('logOutBtn');

        if(sessionStorage.getItem('privilege') == 'admin'){
            sidebar.innerHTML = `
                                <ul>
                                    <!-- Dashboard -->
                                    <li><a href="./adminDashboard.html"><i class='bx bxs-dashboard'></i></a></li>
                                    <!-- Activity -->
                                    <li><a href="./activity.html"><i class='bx bxs-analyse' ></i></a></li>
                                    <!-- Passes -->
                                    <li><a href="./passes.html"><i class='bx bx-id-card'></i></a></li>
                                    <!-- Settings -->
                                    <li><a href="./settings.html"><i class='bx bx-user' ></i></a></li>
                                </ul>
            `;
        }
        else if(sessionStorage.getItem('privilege') == 'attendant'){
            sidebar.innerHTML = `
                                <ul>
                                    <!-- Dashboard -->
                                    <li><a href="./attendantDashboard.html"><i class='bx bxs-dashboard'></i></a></li>
                                    <!-- Settings -->
                                    <li><a href="./settings.html"><i class='bx bx-user' ></i></a></li>
                                </ul>
            `;
        }

        logOutBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            sessionStorage.setItem('privilege', null);
            sessionStorage.setItem('userId', null);
            window.location.href = `./login.html`;
        });

        setUserDetails();
        setUserRegisteredVehicles();

        setInterval(setUserDetails, 3000);
        setInterval(setUserRegisteredVehicles, 3000);

        // functions 

        function setUserDetails(){
            $.post(
                'http://127.0.0.1:3000/userDetails',
                {
                    userId : sessionStorage.getItem('userId')
                },
                function(result){
                    userName.value = result[0];
                    userId.value = result[1];
                    userDept.value = result[2];
                    userPosition.value = result[3];
                }
            )
        }

        function setUserRegisteredVehicles(){
            $.post(
                'http://127.0.0.1:3000/userRegisteredVehicles',
                {
                    userId : sessionStorage.getItem('userId')
                },
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
            table.append(thead);
            table.append(tbody);
            tableContainer.append(table);
        }
    }
});