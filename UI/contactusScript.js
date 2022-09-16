$(document).ready(function(){
    let visitorName = document.getElementById();
    let visitorEmail = document.getElementById();
    let visitorMsg = document.getElementById();

    let submitBtn = document.getElementById();

    submitBtn.addEventListener('click', ()=>{
        let visitorNameValue = visitorName.value;
        let visitorEmailValue = visitorEmail.value;
        let visitorMsgValue = visitorMsg.value;

        let inputStatus1 = inputCheck(visitorName, visitorNameValue, 'string');
        let inputStatus2 = inputCheck(visitorEmail, visitorEmailValue, 'string');
        let inputStatus3 = inputCheck(visitorMsg, visitorMsgValue, 'string');

        if(inputStatus1 == 1 && inputStatus2 == 1 && inputStatus3 == 1){
            $.post(
                "http://127.0.0.1:3000/contactUs",
                {
                    visitorName : visitorName.value,
                    visitorEmail : visitorEmail.value,
                    visitorMsg : visitorMsg.value 
                }
            )
        }
    })

    function inputCheck(element, value, type){
        let errorElement = element.parentElement.nextElementSibling;
        if(value.length != 0){
            if(type == 'integer' && isNaN(value) == false){
                errorElement.innerText = `Err Msg`;
                errorElement.style.visibility = 'hidden';
                return 1;
            }
            else if(type == 'string' && isNaN(value) == true){
                errorElement.innerText = `Err Msg`;
                errorElement.style.visibility = 'hidden';
                return 1;
            }
            else{
                // stated type and value type doesn't match 
                errorElement.innerText = `Input has to be type ${type}`;
                errorElement.style.visibility = 'visible';
                return 0;
            }
        }
        else{
            // value cannot be 0
            errorElement.innerText = `Field cannot be empty`;
            errorElement.style.visibility = 'visible';
            return 0;
        }
    }
})