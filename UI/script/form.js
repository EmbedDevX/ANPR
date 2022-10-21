$(document).ready(function(){
    let veil = document.getElementById('veil');

    // register vehicle form script-----------------------------------------------------------------------------------------------------------------------------------------------

    let regFormBtn = document.getElementById('regVehicleFormBtn');
    let regForm = document.getElementById('regVehicleForm');
    let regFormSubmitBtn = document.getElementById('regSubmitFormBtn');

    $('.closeModal').click(function(e){
        e.preventDefault();
        let passForm = this.parentElement.parentElement;
        veil.style.background = `transparent`;
        veil.style.zIndex = 0;
        passForm.style.top = '0%';
        passForm.style.transform = 'translate(-50%, -110%)';
        passForm.style.transition = 'all 0.4s ease-in-out';

    })

    regFormBtn.addEventListener('click', (e)=>{
        console.log(1);
        e.preventDefault();
        veil.style.background = `rgba(30, 30, 30, 0.2)`;
        veil.style.zIndex = 3;
        regForm.style.zIndex = 4;
        regForm.style.top = '50%';
        regForm.style.transform = 'translate(-50%, -50%)';
        regForm.style.transition = 'all 0.4s ease-in-out';
    })

    regFormSubmitBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        let employeeId = document.getElementById('employeeID');
        let employeeName = document.getElementById('employeeName');
        let employeeDept = document.getElementById('employeeDept');
        let employeeEmail = document.getElementById('employeeEmail');
        let employeeContact = document.getElementById('employeeContact');
        let vehicleNumber = document.getElementById('employeeVehicleNumber');
        let vehicleTypeCar = document.getElementById('employeeCar');
        let vehicleTypeBike = document.getElementById('employeeBike');

        let employeeIdValue = employeeId.value;
        let employeeNameValue = employeeName.value;
        let employeeDeptValue = employeeDept.value;
        let employeeEmailValue = employeeEmail.value;
        let employeeContactValue = employeeContact.value;
        let vehicleNumberValue = vehicleNumber.value;
        let vehicleTypeCarValue = vehicleTypeCar.checked;
        let vehicleTypeBikeValue = vehicleTypeBike.checked;

        let inputStatus1 = inputCheck(employeeId, employeeIdValue);
        let inputStatus2 = inputCheck(employeeName, employeeNameValue);
        let inputStatus3 = inputCheck(employeeDept, employeeDeptValue);
        let inputStatus4 = inputCheck(employeeEmail, employeeEmailValue);
        let inputStatus5 = inputCheck(employeeContact, employeeContactValue);
        let inputStatus6 = inputCheck(vehicleNumber, vehicleNumberValue);

        if(inputStatus1 == 1 && inputStatus2 == 1 && inputStatus3 == 1 && inputStatus4 == 1 && inputStatus5 == 1 && inputStatus6 == 1){
            $.post(
                'http://127.0.0.1:3000/vehicleRegistration',
                {
                    employeeId : employeeIdValue,
                    employeeName : employeeNameValue,
                    employeeDept : employeeDeptValue,
                    employeeEmail : employeeEmailValue,
                    employeeContact : employeeContactValue,
                    vehicleNumber : vehicleNumberValue,
                    vehicleTypeCarValue : vehicleTypeCarValue,
                    vehicleTypeBikeValue : vehicleTypeBikeValue
                },
                function(result){
                    console.log('registered');
                }
            )
        }

    })
    // schedule a visit form script---------------------------------------------------------------------------------------------------------------------------------------------

    let scheduleFormBtn = document.getElementById('schVisitFormBtn');
    let scheduleForm = document.getElementById('scheduleVisitForm');
    let schFormSubmitBtn = document.getElementById('schSubmitFormBtn');

    scheduleFormBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        veil.style.background = `rgba(30, 30, 30, 0.2)`;
        veil.style.zIndex = 3;
        scheduleForm.style.zIndex = 4;
        scheduleForm.style.top = '50%';
        scheduleForm.style.transform = 'translate(-50%, -50%)';
        scheduleForm.style.transition = 'all 0.4s ease-in-out';
    })

    schFormSubmitBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        let visitorName = document.getElementById('visitorName');
        let visitorContact = document.getElementById('visitorContact');
        let visitorEmail = document.getElementById('visitorEmail');
        let vehicleNumber = document.getElementById('visitorVehicleNumber');
        let date = document.getElementById('visitDate');
        let duration = document.getElementById('duration');
        let passType = document.getElementById('visitorPassType');
        let vehicleTypeCar = document.getElementById('visitorCar');
        let vehicleTypeBike = document.getElementById('visitorBike');


        let visitorNameValue = visitorName.value;
        let visitorContactValue = visitorContact.value;
        let visitorEmailValue = visitorEmail.value;
        let vehicleNumberValue = vehicleNumber.value;
        let dateValue = date.value;
        let durationValue = duration.value;
        let passTypeValue = passType.value;
        let vehicleTypeCarValue = vehicleTypeCar.checked;
        let vehicleTypeBikeValue = vehicleTypeBike.checked;

        let inputStatus1 = inputCheck(visitorName, visitorNameValue);
        let inputStatus2 = inputCheck(visitorContact, visitorContactValue);
        let inputStatus3 = inputCheck(visitorEmail, visitorEmailValue);
        let inputStatus4 = inputCheck(vehicleNumber, vehicleNumberValue);
        let inputStatus5 = inputCheck(date, dateValue);
        let inputStatus6 = inputCheck(duration, durationValue);
        let inputStatus7 = inputCheck(passType, passTypeValue);
        
        if(inputStatus1 == 1 && inputStatus2 == 1 && inputStatus3 == 1 && inputStatus4 == 1&& inputStatus5 == 1 && inputStatus6 == 1 && inputStatus7 == 1){
            $.post(
                'http://127.0.0.1:3000/scheduleVisit',
                {
                    visitorName : visitorNameValue,
                    visitorContact : visitorContactValue,
                    visitorEmail : visitorEmailValue,
                    vehicleNumber : vehicleNumberValue,
                    date : dateValue,
                    duration : durationValue,
                    passType : passTypeValue,
                    vehicleTypeCarValue : vehicleTypeCarValue,
                    vehicleTypeBikeValue : vehicleTypeBikeValue
                },
                function(result){
                    console.log('visit scheduled');
                }
            )
        }
    })

    function inputCheck(element, value){
        let errorElement = element.parentElement.nextElementSibling;
        
        if(value.length > 0){
            errorElement.innerText = `err msg`;
            errorElement.style.color = `white`;
            errorElement.style.visibility = `hidden`;
            return 1;
        }
        else{
            errorElement.innerText = `Field cannot be empty`;
            errorElement.style.color = `firebrick`;
            errorElement.style.visibility = `visible`;
            return 0;
        }
    }
})