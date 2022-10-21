$(document).ready(function(){
    let visitorName = document.getElementById('visitorName');
    let visitorEmail = document.getElementById('visitorEmail');
    let visitorMsg = document.getElementById('visitorMsg');

    let submitBtn = document.getElementById('contactUsBtn');

    let msgBox = document.getElementById('msgBox');
    let msgIcon = document.getElementById('msgIcon');
    let msg = document.getElementById('msg');

    
    // event listeners

    submitBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        let visitorNameValue = visitorName.value;
        let visitorEmailValue = visitorEmail.value;
        let visitorMsgValue = visitorMsg.value;

        let inputStatus1 = inputCheck(visitorName, visitorNameValue);
        let inputStatus2 = inputCheck(visitorEmail, visitorEmailValue);
        let inputStatus3 = inputCheck(visitorMsg, visitorMsgValue);

        if(inputStatus1 == 1 && inputStatus2 == 1 && inputStatus3 == 1){
            $.post(
                'http://127.0.0.1:3000/contactUs',
                {
                    visitorName : visitorNameValue,
                    visitorEmail : visitorEmailValue,
                    visitorMsg : visitorMsgValue
                },
                function(result){
                    console.log(result);
                    msgIcon.className = `bx bx-sad msgIcon`;
                    msg.innerText = result;
                    msgBox.style.top = `0%`;
                    msgBox.style.transform = `translate(-50%, 10%)`;
                    msgBox.style.transition = `transform 0.2s linear`;
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