const Validator=require('validator');
const isEmpty=require('./isEmpty');

module.exports=function validatorFacultyLogin(data){
let errors={};


data.username= isEmpty(data.username)?'':data.username;
data.password= isEmpty(data.password)?'':data.password;

if (Validator.isEmpty(data.username)) {
    errors.username = 'username field is required';
  }

if(Validator.isEmpty(data.password)){
    errors.password="password cannot be empty";
}


return {
    errors,
    isValid: isEmpty(errors)
  };

}