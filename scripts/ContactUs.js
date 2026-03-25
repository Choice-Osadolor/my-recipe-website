window.onload=function(){

    let form = document.getElementById("signup-form");


    form.onsubmit=function(event){
        let email=form.email.value;
        let emailConfirmation=form.emailConfirmation.value;
        let FirstPassword=form.pass1.value;
        let confirmPassword = form.confirmPass.value;
        let appointmentDate= new Date(form.appointmentDate.value);
        let Currentdate= new Date();


        let errors = '';// a string of errors

//valid email
        if(!email.endsWith('aston.ac.uk'))
            errors+='Email is not valid.';
        
        if(email !== emailConfirmation){
            errors+='Emails must match';}
//valid password
          if(FirstPassword !== confirmPassword){
            errors += "Passwords Must Match";
          }
          if(FirstPassword.length < 8)
          errors += "Too short";
          if(FirstPassword.match(/[^a-zA-Z0-9]/))
          errors += "Only alphanumeric chars allowed";
          if(!FirstPassword.match(/[a-z]/))
          errors += "Lower case letter required";
          if(!FirstPassword.match(/[A-Z]/))
          errors += "Upper case letter required";
          if(!FirstPassword.match(/[0-9]/)){
          errors += "Number required";
          }

          //future appointments only
if(appointmentDate <= Currentdate){
    errors+="Appointment date must be valid";
}

if(errors !==""){
    event.preventDefault();
    alert(errors);
}

      };
};