/****************************************************************************************************************
 * funciones para facilitar el llamado a elementos del DOM
 * ***********************************************************************************************************/
const $ = (elemento)=> document.querySelector(elemento);
const $a = (elemento)=> document.querySelectorAll(elemento);
const n = (elemento)=> document.getElementById(elemento);
const nuevo = (elemento)=> document.createElement(elemento);
/****************************************************************************************************************
 * Variables para la API para mandar a llamar a construir en el monitor
 ***********************************************************************************************************/
const server = 'https://femepashidi.siradiacion.com.mx/';

// const server = 'http://localhost:3000/';

const API_COMMUNICATIONS = `${server}api/v1/communications/`;
const API_EVENTS = `${server}api/v1/events/`;
const SERVER_UPLOADS=`${server}images/`;

const meses = {
  0:'ENERO',
  1:'FEBRERO',
  2:'MARZO',
  3:'ABRIL',
  4:'MAYO',
  5:'JUNIO',
  6:'JULIO',
  7:'AGOSTO',
  8:'SEPTIEMBRE',
  9:'OCTUBRE',
  10:'NOVIEMBRE',
  11:'DICIEMBRE'
}

function fechaLarga(fecha){
  const e = fecha.split('-');
  console.log(e)
  const f = new Date(e[0],e[1]-1,e[2]);
  console.log(`${f.getDate()} DE ${meses[f.getMonth()]} DE ${f.getFullYear()} `)
  return `${f.getDate()} DE ${meses[f.getMonth()]} DE ${f.getFullYear()} `;
}

document.addEventListener("DOMContentLoaded", async function () {
  await fetch(API_COMMUNICATIONS)
  .then(response => response.json())
  .then(data=>{
    console.log(data);
    const comunicados = n('communications_container');
    comunicados.innerHTML=''
    data.documents.forEach(element=>{
      if(element.data.status === 'Baja') return
      let card = nuevo('article');
      card.classList.add('card');
      card.classList.add('notifications');
      card.innerHTML = `
      <figure>
        <img alt="Mensaje 1" id="${SERVER_UPLOADS}communications/${element.data.img}">
      </figure>
      <p class="negro">${element.data.titulo}</p>`;
      if(element.data.texto1 != ""){
        card.innerHTML +=`
        <p>${element.data.texto1}</p>`;
      }
      if(element.data.texto2 != ""){
        card.innerHTML +=`
        <p>${element.data.texto2}</p>`;
      }
      if(element.data.texto3 != ""){
        card.innerHTML +=`
        <p>${element.data.texto3}</p>`;
      }
      if(element.data.texto4 != ""){
        card.innerHTML +=`
        <p>${element.data.texto4}</p>`;
      }
      if(element.data.texto5 != ""){
        card.innerHTML +=`
        <p>${element.data.texto5}</p>`;
      }
      card.innerHTML+=`
      <a class="button button-blue" id="${element.data.img}">DESCARGAR</a>`
      comunicados.appendChild(card);

      const img = n(`${SERVER_UPLOADS}communications/${element.data.img}`);
      img.src=`${SERVER_UPLOADS}communications/${element.data.img}`;

     n(element.data.img).onclick = ()=> showPdf(element.data.doc);

    });


  })
  .catch(error=>console.log(error));

  await fetch(API_EVENTS)
  .then(response => response.json())
  .then(data=>{
    console.log(data);
    const events = n('events_container');
    events.innerHTML=''
    data.documents.forEach(element=>{
      if(element.data.status!='Activo'){
        console.log('NO ESTA ACTIVO')
      }else{
      let card = nuevo('div');
      card.classList.add('carrusel-item');
      card.innerHTML = `
      <article class="card">
        <h1 class="article__tittle_black">${element.data.nombre}</h1>
        <p><span>Lugar:</span> ${element.data.lugar}</p>
        <p><span>Fecha de inicio:</span>${fechaLarga(element.data.fecha_inicio)}</p>
        <p><span>Fecha de termino:</span>${fechaLarga(element.data.fecha_fin)}</p>
        <p><span>Descripción:</span>${String(element.data.texto)}</p>
        <a href="./registro" class="button button-50 button-blue">Registrarme</a>
      </article>
      `;
      events.appendChild(card);
      }
    });
  })
  .catch(error=>console.log(error));





})


/****************************************************************************************************************
 * Funcion para abrir PDF
 * ***********************************************************************************************************/
const showPdf = (pdf)=>{
  if(!isMobileDevice()){
  console.log(pdf);
  n('myModalPdf').style.display="block";
  n('pdfViewer').src=`${SERVER_UPLOADS}communications/${pdf}`
  }else{
    window.open(`${SERVER_UPLOADS}communications/${pdf}`, "_blank");
  }

}
function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}
