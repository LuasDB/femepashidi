const observerAbout = new IntersectionObserver((entries)=>{
    
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show-up');
        }else{
            entry.target.classList.remove('show-up');
        }
    });
});
const elements_animate= document.querySelectorAll('.scroll-animation-up');
elements_animate.forEach((element) => observerAbout.observe(element));
const observerAbout2 = new IntersectionObserver((entries)=>{
    
  entries.forEach(entry=>{
      if(entry.isIntersecting){
          entry.target.classList.add('show-down');
      }else{
          entry.target.classList.remove('show-down');
      }
  });
});
const elements_animate2= document.querySelectorAll('.scroll-animation-down');
elements_animate2.forEach((element) => observerAbout2.observe(element));


document.addEventListener("DOMContentLoaded", function () {
const menu = document.querySelector('#menu');
const letras = document.querySelectorAll('#menu nav a');
const nombre = document.querySelector('#menu div div');

// Función para manejar el evento de scroll
function handleScroll() {
    const scrollPosition = window.scrollY;
    

   if(scrollPosition > 595 ){
    // menu.style.backgroundColor = "rgb(79, 195, 218,0.4)";
    menu.style.backdropFilter = "blur(15px)"; 
    nombre.style.color= "#4e4ef8";
    letras.forEach(a=>{
        a.style.color= "#4e4ef8";
    }) ;
    }
   else{
   
    menu.style.backdropFilter = "blur(10px)"; 
    menu.style.backgroundColor="";
    letras.forEach(a=>{
        a.style.color= "white";
    }) ;
    nombre.style.color= "white";
   }
}

// Agrega un event listener para el evento de scroll
window.addEventListener("scroll", handleScroll);
});






