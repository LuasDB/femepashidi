/*
ANIMACION PARA ELEMENTOS HACIA ARRIBA
*/
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
/*
ANIMACION PARA ELEMENTOS HACIA ABAJO
*/
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
/*
ANIMACION PARA ELEMENTOS CON SCALE
*/
const observerScale = new IntersectionObserver((entries)=>{
    
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('animation-scale');
        }else{
            entry.target.classList.remove('animation-scale');
        }
    });
  });
  const elements_scale= document.querySelectorAll('.animation-event-to-scale');
  elements_scale.forEach((element) => observerScale.observe(element));

/*
ANIMACION PARA ELEMENTOS CON SCALE
*/
const observerRight = new IntersectionObserver((entries)=>{
    
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('animation-right');
        }else{
            entry.target.classList.remove('animation-right');
        }
    });
  });
  const elements_right= document.querySelectorAll('.animation-event-to-right');
  elements_right.forEach((element) => observerRight.observe(element));
/*
OBSERVAR SCROLL
*/



document.addEventListener("DOMContentLoaded", function () {
const menu = document.querySelector('#menu');
const letras = document.querySelectorAll('#menu nav a');
const nombre = document.querySelector('#menu div div');

// Función para manejar el evento de scroll
function handleScroll() {
    // Define la media query que deseas verificar
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    // Verifica si la media query coincide actualmente
    if (mediaQuery.matches) {
        
    }
    else{
        const scrollPosition = window.scrollY;
        console.log('[Y]:',scrollPosition);
    
       if(scrollPosition > 595 ){
        menu.style.backgroundColor = "rgb(32, 32, 154,0.4)";
        menu.style.backdropFilter = "blur(15px)"; 
        nombre.style.color= "rgb(41 127 144)";
        letras.forEach(a=>{
            a.style.color= "rgb(41 127 144)";
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
    
}


/*PRUEBA*/



// const arrow_down = document.querySelector('.down-arrow img');
//     arrow_down.addEventListener('click',()=>{
//         const ventana_about = document.querySelector('.section-galery2');
//         let desplazamientoY = window.scrollY += ventana_about.clientHeight + 100;
        
//         window.scrollTo({
//             top:desplazamientoY,
//             behavior:'smooth'
//             });
//             // window.scrollY -= ventana_about.clientHeight + 100;      
//     });

const arrow_down = document.querySelector('.down-arrow img');
    arrow_down.addEventListener('click',()=>{
        const ventana_about = document.querySelector('.section-galery2');
        
        // Obtener la posición actual del desplazamiento vertical
        let currentPosition = window.scrollY;

        // Calcular la nueva posición del desplazamiento hacia abajo (agregar 800px)
        let targetPosition = currentPosition + ventana_about.clientHeight + 100;

        // Realizar el desplazamiento suave utilizando setInterval
        let scrollInterval = setInterval(function() {
        // Desplazar hacia abajo en incrementos pequeños
        window.scrollBy(0, 10);
        console.log('[NUEVA Y]:',window.scrollY)

        // Verificar si se alcanzó la posición objetivo
        if (window.scrollY >= targetPosition) {
            // Detener el intervalo cuando se alcanza la posición objetivo
            clearInterval(scrollInterval);
        }
        }, 16.67); // Aproximadamente 60 fps
    });

// Agrega un event listener para el evento de scroll
window.addEventListener("scroll", handleScroll);


});








