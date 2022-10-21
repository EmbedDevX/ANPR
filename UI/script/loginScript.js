$(document).ready(function(){
    let userCred = document.getElementById('userCred');
    let userPass = document.getElementById('userPass');
    let loginBtn = document.getElementById('loginBtn');

    let msgBox = document.getElementById('msgBox');
    let msgIcon = document.getElementById('msgIcon');
    let msg = document.getElementById('msg');

    let contactUsBtn = document.getElementById('contactUsBtn');

    contactUsBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        window.location.href = './contactUs.html';
    });

    loginBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        let userCredValue = userCred.value;
        let userPassValue = userPass.value;

        let inputStatus1 = inputCheck(userCred, userCredValue);
        let inputStatus2 = inputCheck(userPass, userPassValue);

        if(inputStatus1 == 1 && inputStatus2 == 1){
            $.post(
                'http://127.0.0.1:3000/login',
                {
                    userCred : userCredValue,
                    userPass : userPassValue
                },
                function(result){
                    if(result[0] == 1){
                        sessionStorage.setItem('privilege', result[1]);
                        sessionStorage.setItem('userId', result[2]);
                        window.location.href = result[3];
                    }
                    else if(result[0] == 2){
                        msgIcon.className = `bx bx-sad msgIcon`;
                        msg.innerText = result[1];
                        msgBox.style.top = '10%';
                        msgBox.style.transform = `translate(-50%, 10%)`;
                        msgBox.style.transition = `transform 0.2s linear`;
                    }
                }
            )
        }
    });

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
});