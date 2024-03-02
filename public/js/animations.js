

/****************************************************************************************************************
 * Barra de navegación
 * ******************************************************************************************************************/
function selectedMenu(){
  document.querySelectorAll('.nav-menus a').forEach(element => {
    element.classList.remove('selectedMenu');
  })
  this.classList.add('selectedMenu');
}
document.querySelectorAll('.nav-menus a').forEach(element => {
  element.addEventListener('click',selectedMenu);
})



/*
galeryANIMACION PARA ELEMENTOS HACIA ARRIBA
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

       if(scrollPosition > 595 ){
        // menu.style.backgroundColor = "rgb(32, 32, 154,0.4)";
        // menu.style.backdropFilter = "blur(15px)";
        // nombre.style.color= "rgb(41 127 144)";
        // letras.forEach(a=>{
        //     a.style.color= "rgb(41 127 144)";
        menu.style.backgroundColor = "rgb(112, 171, 247,0.4)";
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



// Agrega un event listener para el evento de scroll
window.addEventListener("scroll", handleScroll);


});

/* Para modal de galeria */
 // Obtener el modal
 const modal = document.getElementById("myModal");
 const modalPdf =document.getElementById("myModalPdf");

 // Obtener la imagen y añadir el modal
 const images = document.querySelectorAll(".image");
 const modalImg = document.getElementById("img01");
 images.forEach(function(image) {
   const img = image.querySelector("img");
   img.onclick = function() {
     modal.style.display = "block";
     modalImg.src = this.src;
   }
 });

 // Obtener el span que cierra el modal
  const span = document.getElementsByClassName("close")[0];
  const spanPdf = document.getElementsByClassName("closePdf")[0];

 // Cerrar el modal al hacer clic en el span
 span.onclick = function() {
   modal.style.display = "none";
   modalPdf.style.display = "none";
 }
 spanPdf.onclick = function() {

  modalPdf.style.display = "none";
}

 // Cerrar el modal al hacer clic fuera de la imagen
 window.onclick = function(event) {
   if (event.target == modal || event.target == modalPdf ) {
     modal.style.display = "none";
     modalPdf.style.display = "none";
   }
 }







