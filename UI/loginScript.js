// let userCred = document.getElementById('user');
// let userPass = document.getElementById('password');
// let loginBtn = document.getElementById('loginBtn');
// let msgBox = document.getElementById('msgBox');
// let msgIcon = document.getElementById('msgIcon');
// let msg = document.getElementById('msg');

// let scheduleVisit = document.getElementById('scheduleVisit');

// scheduleVisit.addEventListener('click', ()=>{
//     console.log(1);
    
// })

// loginBtn.addEventListener('click', (e)=>{
//     e.preventDefault();
//     let userCredValue = userCred.value;
//     let userPassValue = userPass.value; 
//     let inputStatus1 = inputCheck(userCred, userCredValue, 'variable');
//     let inputStatus2 = inputCheck(userPass, userPassValue, 'variable');

//     if((inputStatus1 == 1 || inputStatus1 == 2) && (inputStatus2 == 1 || inputStatus2 == 2)){
//         // if(inputStatus1 == 1 || inputStatus1 == 2){
//         $.post(
//             "http://127.0.0.1:3000/login",
//             {
//                 status : inputStatus1,
//                 userCred : userCredValue,
//                 userPass : userPassValue
//             },
//             function(result){
//                 if(result[0] == 1){
//                     console.log(result);
//                     sessionStorage.setItem('passType', result[1])
//                     window.location.href = result[2];
//                 }
//                 else if(result[0] == 0){
//                     // display error
//                     msgIcon.className = 'bx bx-sad msgIcon';
//                     // msg.innerText = 'Login failed. Kindly check your credentials';
//                     msg.innerText = result[1];
//                     msg.style.top = '0%';    
//                     msgBox.style.transform = 'translate(-50%, 10%)';
//                     msgBox.style.transition = 'transform 0.2s linear';                    
//                 }
//             }
//         )
//     }
// })

// function inputCheck(element, value, type){
//     let errMsgElement = element.parentElement.nextElementSibling;
//     if(value.length == 0){
//         // length is 0, hence field is empty
//         let errMsg = `Field cannot be empty`;
//         errMsgElement.innerText = errMsg;
//         errMsgElement.style.visibility = 'visible';
//         return 0;
//     }
//     else if(type == 'numeric' && isNaN(value) == true){
//         // type should be numeric but is string
//         let errMsg = `Field has to be type ${type}`
//         errMsgElement.innerText = errMsg;
//         errMsgElement.style.visibility = 'visible';
//         return 0;
//     }
//     else if(type == 'string' && isNaN(value) == false){
//         // type should be string but is numeric
//         let errMsg = `Field has to be type ${type}`
//         errMsgElement.innerText = errMsg;
//         errMsgElement.style.visibility = 'visible';
//         return 0;
//     }
//     else if(type == 'variable'){
//         // type can be string or numeric
//         if(isNaN(value) == true){
//             let errMsg = `Error msg`;
//             errMsgElement.innerText = errMsg;
//             errMsgElement.style.visibility = 'hidden';
//             return 1;
//         }
//         else{
//             let errMsg = `Error msg`;
//             errMsgElement.innerText = errMsg;
//             errMsgElement.style.visibility = 'hidden';
//             return 2;
//         }
//     }
//     else{
//         // data is not empty and has proper type
//         let errMsg = `Error msg`;
//             errMsgElement.innerText = errMsg;
//             errMsgElement.style.visibility = 'hidden';
//         return 1
//     }
// }

$(document).ready(function(){
    let userCred = document.getElementById('user');
    let userPass = document.getElementById('password');
    let loginBtn = document.getElementById('loginBtn');
    let msgBox = document.getElementById('msgBox');
    let msgIcon = document.getElementById('msgIcon');
    let msg = document.getElementById('msg');

    loginBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        let userCredValue = userCred.value;
        let userPassValue = userPass.value;

        let inputStatus1 = inputCheck(userCred, userCredValue);
        let inputStatus2 = inputCheck(userPass, userPassValue);

        if((inputStatus1 == 1 || inputStatus1 == 2) && (inputStatus2 == 1 || inputStatus2 == 2)){
            console.log(inputStatus1);
            console.log(userCredValue);
            console.log(userPassValue);
            $.post(
                "http://127.0.0.1:3000/login",
                {
                    inputStatus : inputStatus1,
                    userCred : userCredValue,
                    userPass : userPassValue
                },
                function(result){
                    // console.log(result);
                    if(result[0] == 1 || result[0] == 2){
                        sessionStorage.setItem('passVar', result[1]);
                        window.location.href = result[2];
                    }
                    else if(result[0] == 0){
                        console.log('failed');
                        msgIcon.className = 'bx bx-sad msgIcon';
                        msg.innerText = result[1];
                        msg.style.top = '0%';    
                        msgBox.style.transform = 'translate(-50%, 10%)';
                        msgBox.style.transition = 'transform 0.2s linear';  
                    }
                }
            )
        }
    })

    function inputCheck(element, value){
        let errorElement = element.parentElement.nextElementSibling;
        if(value.length > 0){
            if(isNaN(value) == false){
                errorElement.innerText = 'error message';
                errorElement.style.visibility = 'hidden';
                return 1;
            }
            else if(isNaN(value) == true){
                errorElement.innerText = 'error message';
                errorElement.style.visibility = 'hidden';
                return 2;
            }
        }
        else{
            errorElement.innerText = 'field cannot be empty';
            errorElement.style.color = 'firebrick';
            errorElement.style.visibility = 'visible';
        }
    }
})