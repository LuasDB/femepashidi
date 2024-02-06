/****************************************************************************************************************
 * funciones para facilitar el llamado a elementos del DOM
 * ***********************************************************************************************************/
const $ = (elemento)=> document.querySelector(elemento);
const $a = (elemento)=> document.querySelectorAll(elemento);
const n = (elemento)=> document.getElementById(elemento);
const nuevo = (elemento)=> document.createElement(elemento);

const API_COMMUNICATIONS = 'http://localhost:3000/api/v1/communications/'


document.addEventListener("DOMContentLoaded", async function () {
  const firestore = await fetch(API_COMMUNICATIONS)
  .then(response => response.json())
  .then(data=>{
    console.log(data);
    const comunicados = n('communications_container');
    comunicados.innerHTML=''
    data.documents.forEach(element=>{
      let card = nuevo('article');
      card.classList.add('card');
      card.classList.add('notifications');
      card.innerHTML = `
      <figure>
        <img alt="Mensaje 1" id="${element.data.url_img}">
      </figure>
      <h2>${element.data.titulo}</h2>`;
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
      comunicados.appendChild(card);
      const img = n(`${element.data.url_img}`);
      console.log(img);
      img.src=`./img/notifications/${element.data.url_img}`;


    });


  })
  .catch(error=>console.log(error));




})
