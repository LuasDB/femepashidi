/****************************************************************************************************************
 * funciones para facilitar el llamado a elementos del DOM
 * ***********************************************************************************************************/
const $ = (elemento)=> document.querySelector(elemento); 
const $a = (elemento)=> document.querySelectorAll(elemento); 
const n = (elemento)=> document.getElementById(elemento);
const monitor = $('main');
/****************************************************************************************************************
 * Funciones para formulario 
 ***********************************************************************************************************/
const forms = $a('.register');
const sigButtons =$a('.siguiente-button');
const atrButtons =$a('.atras-button');
let contForms = 0;
const siguienteForm = ()=> {
  forms.forEach(form=>{
    form.classList.add('hidden');
  });
  forms[contForms+1].classList.remove('hidden');
  if(contForms > 1){
    contForms++;
  }else{
    contForms=1;
  }
  console.log(contForms);
  
  
}
const pasadoForm = ()=> {
  forms.forEach(form=>{
    form.classList.add('hidden');
  });
  forms[contForms-1].classList.remove('hidden');
  if(contForms > 0){
    contForms--;
  }
  console.log(contForms);

  
}
sigButtons.forEach(button =>{
  button.addEventListener('click',siguienteForm);
});
atrButtons.forEach(button =>{
  button.addEventListener('click',pasadoForm);
});


