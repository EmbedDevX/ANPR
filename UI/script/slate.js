$(document).ready(function(){
    sessionStorage.setItem('privilege', 'admin');
    if(sessionStorage.getItem('privilege') != 'admin'){
        window.location.href = './login.html';
    }
    else{
        let entriesTodayCard = document.getElementById();
        let guestVehiclesCard = document.getElementById();
        let staffOrgVehiclesCard = document.getElementById();
        let specialPurposeVehiclesCard = document.getElementById();
        let blackListedVehiclesCard = document.getElementById();

        let entriesToday = document.getElementById();
        let guestVehicles = document.getElementById();
        let staffOrgVehicles = document.getElementById();
        let specialPurposeVehicles = document.getElementById();
        let blackListedVehicles = document.getElementById();

        let showTableBtn = document.getElementById();
        let showChartBtn = document.getElementById();
    }
})