// const observerAbout = new IntersectionObserver((entries)=>{
    
//     entries.forEach(entry=>{
//         if(entry.isIntersecting){
//             entry.target.classList.add('show-up');
//         }else{
//             entry.target.classList.remove('show-up');
//         }
//     });
// });
// const elements_animate= document.querySelectorAll('.scroll-animation-up');
// elements_animate.forEach((element) => observerAbout.observe(element));


// document.addEventListener("DOMContentLoaded", function () {
// const menu = document.querySelector('#menu');
// const letras = document.querySelectorAll('#menu nav a');
// const nombre = document.querySelector('#menu div div');




// // Función para manejar el evento de scroll
// function handleScroll() {
//     const scrollPosition = window.scrollY;
//     console.log(scrollPosition)

//    if(scrollPosition > 595 ){
//     menu.style.backgroundColor = "rgb(79, 195, 218,0.4)";
//     menu.style.backdropFilter = "blur(15px)"; 
//     nombre.style.color= "#4e4ef8";
//     letras.forEach(a=>{
//         a.style.color= "#4e4ef8";
//     }) ;
//     }
//    else{
   
//     menu.style.backdropFilter = "blur(10px)"; 
//     menu.style.backgroundColor="";
//     letras.forEach(a=>{
//         a.style.color= "white";
//     }) ;
//     nombre.style.color= "white";
//    }
// }

// // Agrega un event listener para el evento de scroll
// window.addEventListener("scroll", handleScroll);
// });



// let currentIndex = 0;

// function showSlide(index) {
//   const carousel = document.getElementById('carousel');
//   const totalSlides = carousel.children.length;

//   if (index >= 0 && index < totalSlides) {
//     currentIndex = index;
//   } else if (index >= totalSlides) {
//     currentIndex = 0;
//   } else {
//     currentIndex = totalSlides - 1;
//   }

//   const translationValue = -currentIndex * 100 + '%';
//   carousel.style.transform = 'translateX(' + translationValue + ')';
// }

// function prevSlide() {
//   showSlide(currentIndex - 1);
// }

// function nextSlide() {
//   showSlide(currentIndex + 1);
// }

// // Auto-avance de diapositivas cada 3 segundos (ajustable)
// setInterval(nextSlide, 4000);


