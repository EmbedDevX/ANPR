$(document).ready(function(){
    if(sessionStorage.getItem('privilege') != 'attendant'){
        window.location.href = './login.html';
    }
    else{
        let statusIndicator = document.getElementById('vehicleStatusColor');
        let vehicleStatus = document.getElementById('vehicleStatus');
        let plateNumber = document.getElementById('plateNumber');
        let passType = document.getElementById('passType');
        let gateNumber = document.getElementById('gateNum');

        let userName = document.getElementById('userName');
        let userDept = document.getElementById('userDept');
        let userEmail = document.getElementById('userEmail');
        let userContact = document.getElementById('userContact');
        let lastEntry = document.getElementById('userLastEntry');
        let lastEntryPoint = document.getElementById('userLastEntryPoint');

        let passFormBtn = document.getElementById('passFormBtn');
        let passForm = document.getElementById('passIssueFormContainer');
        let veil = document.getElementById('veil');

        let logOutBtn = document.getElementById('logOutBtn');

        updateData();
        setInterval(updateData, 500);


        $('.closeModal').click((e)=>{
            e.preventDefault();
            veil.style.background = `transparent`;
            veil.style.zIndex = 0;
            passForm.style.top = '0%';
            passForm.style.transform = 'translate(-50%, -110%)';
            passForm.style.transition = 'all 0.4s ease-in-out';

        });

        logOutBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            sessionStorage.setItem('passStatus', null);
            sessionStorage.setItem('userId', null);
            window.location.href = './login.html';
        });

        passFormBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            veil.style.background = `rgba(30, 30, 30, 0.2)`;
            veil.style.zIndex = 3;
            passForm.style.top = '50%';
            passForm.style.transform = 'translate(-50%, -50%)';
            passForm.style.transition = 'all 0.4s ease-in-out';
        });

        function updateData(){
            console.log(1);
            $.post(
                "http://127.0.0.1:3000/updateAttendantDashboard",
                {

                },
                function(result){
                    console.log(result);
                    if(result[0] == '0'){ // signifies a new record
                            userName.innerText = result[2][2];
                            userDept.innerText = 'NA';
                            userEmail.innerText = 'NA';
                            userContact.innerText = result[2][3];
                            lastEntry.innerText = 'NA';
                            lastEntryPoint.innerText = 'NA';
                        
                        if(result[1][4] == 'Verified'){
                            statusIndicator.style.background = `linear-gradient(145deg, #41b856, #379b48)`;
                            statusIndicator.style.boxShadow = `inset 1px 1px 2px #3caa4f, inset -1px -1px 2px #3eae51`;
                        }
                        else if(result[1][4] == 'Not Verified'){
                            statusIndicator.style.background = `linear-gradient(145deg, #FF9611, #BD660B)`;
                            statusIndicator.style.boxShadow = `inset 1px 1px 2px #D3730D, inset -1px -1px 2px #FD890F`;
                        }
                        else if(result[1][4] == 'blacklisted'){
                            statusIndicator.style.background = `linear-gradient(145deg, #d8282c, #b62125)`;
                            statusIndicator.style.boxShadow = `inset 1px 1px 2px #c82529, inset -1px -1px 2px #cc2529`;
                        }
                        vehicleStatus.innerText = 'Vehicle status : ' + result[1][4];
                        plateNumber.innerText = result[1][1];
                        passType.innerText = result[1][2];
                        gateNumber.innerText = result[1][3];
                    }
                    else{
                        // userName.innerText = 'NA';
                        // userDept.innerText = 'NA';
                        // userEmail.innerText = 'NA';
                        // userContact.innerText = 'NA';
                        // lastEntry.innerText = 'NA';
                        // lastEntryPoint.innerText = 'NA';
                        // vehicleStatus.innerText = 'System status : ' + 'Pending';
                        // plateNumber.innerText = 'NA';
                        // passType.innerText = 'NA';
                        // gateNumber.innerText = 'NA';
                        // statusIndicator.style.background = `linear-gradient(145deg, #d8282c, #b62125)`;
                        // statusIndicator.style.boxShadow = `inset 1px 1px 2px #c82529, inset -1px -1px 2px #cc2529`;
                    }
                }
            )
        }
    }
})