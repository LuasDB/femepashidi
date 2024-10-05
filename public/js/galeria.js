let fotos = []

const getFotos = async()=>{
  const res = await fetch('http://localhost:3000/api/v1/gallery/gallery/6fzcCXDa5AZ3w13m5T9e')
  const data = await res.json()

  if(data.success){
    const newImageData = data.data.fotos.map((src) => {
      const img = new Image();
      img.src = `http://localhost:3000/images/gallery/${src}`;
      // Detectamos si la imagen es horizontal o vertical
      return new Promise((resolve) => {
        img.onload = () => {
          const orientation = img.naturalWidth > img.naturalHeight ? 'horizontal' : 'vertical';
          resolve({ src, orientation });
        };
      });
    });

    Promise.all(newImageData).then((fotos) =>{

      let galeria = document.getElementById('galeria_vertical')
      let galeria2 = document.getElementById('galeria_horizontal')

      fotos.forEach(element => {
        if(element.orientation === 'vertical'){
          const divImg = document.createElement('div')
          divImg.classList.add('image')
          const img = document.createElement('img')
          img.src = `http://localhost:3000/images/gallery/${element.src}`
          console.log('[IMAGES]',img.src)

          divImg.appendChild(img)
          galeria.appendChild(divImg)
        }


      });

      fotos.forEach(element => {
        if(element.orientation === 'horizontal'){
          const divImg = document.createElement('div')
          divImg.classList.add('image')
          const img = document.createElement('img')
          img.src = `http://localhost:3000/images/gallery/${element.src}`
          console.log('[IMAGES]',img.src)

          divImg.appendChild(img)
          galeria2.appendChild(divImg)
        }


      });

    // Obtener el modal
 const modal = document.getElementById("myModal");
 const modalPdf =document.getElementById("myModalPdf");




     // Obtener la imagen y añadir el modal
 const images = document.querySelectorAll(".image");
 const modalImg = document.getElementById("img01");
 images.forEach(function(image) {
  console.log('entrando a ponerles onclick')
   const img = image.querySelector("img");
   img.onclick = function() {
     modal.style.display = "block";
     modalImg.src = this.src;
   }
 });

 // Obtener el span que cierra el modal
  const span = document.getElementById('close_modal');
  const spanPdf = document.getElementById("close_modalPdf")
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
  console.log('EVENTO DE MODAL')
   if (event.target === modal || event.target === modalPdf ) {
     modal.style.display = "none";
     modalPdf.style.display = "none";
   }
 }





    }


    );












  }
}





getFotos()
