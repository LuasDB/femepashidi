/****************************************************************************************************************
 * funciones para facilitar el llamado a elementos del DOM
 * ***********************************************************************************************************/
const $ = (elemento)=> document.querySelector(elemento);
const $a = (elemento)=> document.querySelectorAll(elemento);
const n = (elemento)=> document.getElementById(elemento);
const nuevo = (elemento)=> document.createElement(elemento);
const monitor = $('main');
/****************************************************************************************************************
 * Funciones que se agregarán a los btotones principales una vez renderizado el DOM
 ***********************************************************************************************************/
document.addEventListener("DOMContentLoaded", function () {
    n('patinadores').onclick = ()=> callPatinadoresList();
    n('asociaciones').onclick = ()=> callAsociacionesList();
    n('solicitudes').onclick = ()=> callSolicitudesList();
    n('eventos').onclick = ()=> callEventosList();
    n('comunicados').onclick = ()=> callComunicadosList();
});
/****************************************************************************************************************
 * Variables para la API para mandar a llamar a construir en el monitor
 ***********************************************************************************************************/
const API_USERS = 'http://localhost:3000/api/v1/users/';
const API_ASSOCIATIONS = 'http://localhost:3000/api/v1/associations/';
const API_REGISTERS = 'http://localhost:3000/api/v1/register/';
const API_EVENTS = 'http://localhost:3000/api/v1/events/';
const API_COMUNICATIONS = 'http://localhost:3000/api/v1/communications/';
/****************************************************************************************************************
 * Funciones para mandar a llamar a construir en el monitor
 ***********************************************************************************************************/
const callPatinadoresList = async()=>{
  try {
    const resApi =await fetch(API_USERS);
    const data = await resApi.json();
    console.log(data);

    monitor.innerHTML=`
    <section class="card bg-blue-100">
        <h3>Patinadores</h3>
        <button id="nuevo-patinador"><span class="material-symbols-outlined">
    add_circle
    </span>Nuevo</button>
        <table>
          <thead>
            <tr>
              <th>CURP</th>
              <th>NOMBRE</th>
              <th>NIVEL</th>
              <th>FECHA DE NACIMIENTO</th>
              <th>ASOCIACION</th>
              <th>VER</th>
              <th>ELIMINAR</th>
            </tr>
          </thead>
          <tbody id="listado_users">

          </tbody>
        </table>
      </section>`;
    data.documents.forEach(element => {
      let fila = nuevo('tr');
      fila.innerHTML=`
        <td>${element.data.curp}</td>
        <td>${element.data.nombre} ${element.data.apellido_paterno} ${element.data.apellido_materno}</td>
        <td>${element.data.nivel_actual}</td>
        <td>${element.data.fecha_nacimiento}</td>
        <td>${element.data.asociacion}</td>
        <td id="${element.id}" class="blue"><span class="material-symbols-outlined" id="${element.id}">visibility</span></td>
        <td id="${element.id}_delete" class="red"><span class="material-symbols-outlined" id="${element.id}_delete">delete</span></td>`;

        n('listado_users').appendChild(fila);

        n(element.id).onclick = ()=> visualizar(element,'users');
        n(`${element.id}_delete`).onclick = ()=> eliminar(element,'users');


    });

    n('nuevo-patinador').onclick = ()=> nuevoRegistro('patinador');

  } catch (error) {
    console.log('ERROR',error)
  }

}
const callAsociacionesList = async()=>{
  try {
    const resApi =await fetch(API_ASSOCIATIONS);
    const data = await resApi.json();
    console.log(data);
    monitor.innerHTML=`
    <section class="card bg-blue-100">
        <h3>Asociaciones</h3>
        <button id="nuevo-asociacion"><span class="material-symbols-outlined">
    add_circle
    </span>Nuevo</button>
        <table>
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>REPRESENTANTE</th>
              <th>CORREO</th>
              <th>STATUS</th>
              <th>EDITAR</th>
              <th>ELIMINAR</th>
            </tr>
          </thead>
          <tbody id="listado_asociaciones">

          </tbody>
        </table>
      </section>`;
      data.documents.forEach(element =>{
        let fila = nuevo('tr');
        fila.innerHTML=`
        <td>${element.data.nombre}</td>
        <td>${element.data.representante}</td>
        <td>${element.data.correo}</td>
        <td class="${element.data.status.toLowerCase()}"><p>${element.data.status}</p></td>
        <td class="blue" id="${element.id}"><span class="material-symbols-outlined" id="${element.id}">
          edit
          </span></td>
        <td class="red" id="${element.id}_delete"><span class="material-symbols-outlined" id="${element.id}_delete">
          delete
          </span></td>
        </tr>`;
        n('listado_asociaciones').appendChild(fila);
        n(element.id).onclick = ()=> editar(element,'associations');
        n(`${element.id}_delete`).onclick = ()=> eliminar(element,'associations');
      });
      n('nuevo-asociacion').onclick = ()=> nuevoRegistro('asociacion');
  } catch (error) {
    console.log(error);
  }
}
const callSolicitudesList = async()=>{
  try {
    const resApi =await fetch(API_REGISTERS);
    const data = await resApi.json();
    console.log(data);
    monitor.innerHTML=`
    <section class="card bg-blue-100">
        <h3>Solicitudes</h3>
        <table>
          <thead>
            <tr>
              <th>CURP</th>
              <th>NOMBRE</th>
              <th>NIVEL</th>
              <th>COMPETENCIA</th>
              <th>STATUS</th>
              <th>VER SOLICITUD</th>
            </tr>
          </thead>
          <tbody id="listado_solicitudes">
          </tbody>
        </table>
      </section>`;
    data.documents.forEach(element=>{
      let fila = nuevo('tr');
      fila.innerHTML = `
      <td>${element.data.user.curp}</td>
      <td>${element.data.user.nombre} ${element.data.user.apellido_paterno} ${element.data.user.apellido_materno}</td>
      <td>${element.data.user.nivel_actual}</td>
      <td>${element.data.event.nombre}</td>
      <td class="${element.data.status}"><p>${element.data.status.toUpperCase()}</p></td>
      <td class="blue" id="${element.id}"><span class="material-symbols-outlined" id="${element.id}">visibility</span></td>
      `;
      n('listado_solicitudes').appendChild(fila);

      n(`${element.id}`).onclick = ()=> visualizar(element,'register');

    });
  } catch (error) {
    console.log(error)
  }
}
const callEventosList = async()=>{
  try {
    const resApi =await fetch(API_EVENTS);
    const data = await resApi.json();
    console.log(data);
    monitor.innerHTML=`
    <section class="card bg-blue-100">
        <h3>Eventos</h3>
        <button id="nuevo-evento"><span class="material-symbols-outlined">
    add_circle
    </span>Nuevo</button>
        <table>
          <thead>
            <tr>
              <th>EVENTO</th>
              <th>FECHA</th>
              <th>LUGAR</th>
              <th>STATUS</th>
              <th>EDITAR</th>
              <th>ELIMINAR</th>
            </tr>
          </thead>
          <tbody id="listado_eventos">
          </tbody>
        </table>
      </section>`;
      data.documents.forEach(element =>{
        let fila = nuevo('tr');
        fila.innerHTML = `
        <td>EVENTO 1${element.data.nombre}</td>
        <td>28 DE FEBRERO 2024 ${element.data.fecha_larga}</td>
        <td>CIUDAD DE MÉXICO, A.OREGÓN${element.data.lugar}</td>
        <td class="${element.data.status.toLowerCase()}"><p>${element.data.status}</p></td>
        <td class="blue" id="${element.id}"><span class="material-symbols-outlined" id="${element.id}">edit</span></td>
        <td class="red" id="${element.id}_delete"><span class="material-symbols-outlined" id="${element.id}_delete">delete</span></td>
        `;
        n('listado_eventos').appendChild(fila);
        n(element.id).onclick = ()=> editar(element,'events');
        n(`${element.id}_delete`).onclick = ()=> eliminar(element,'events');
      });
    n('nuevo-evento').onclick = ()=> nuevoRegistro('evento');
  } catch (error) {
    console.log(error);
  }


}
const callComunicadosList = async()=>{
  try {
    const resApi =await fetch(API_COMUNICATIONS);
    const data = await resApi.json();
    console.log(data);
    monitor.innerHTML=`
    <section class="card bg-blue-100">
        <h3>Comunicados</h3>
        <button id="nuevo-comunicado"><span class="material-symbols-outlined">
    add_circle
    </span>Nuevo</button>
        <table>
          <thead>
            <tr>
              <th>TITULO</th>
              <th>IMAGEN</th>
              <th>DESCRIPCIÓN</th>
              <th>STATUS</th>
              <th>EDITAR</th>
              <th>ELIMINAR</th>
            </tr>
          </thead>
          <tbody id="listado_com">

          </tbody>
        </table>
      </section>`;
    data.documents.forEach(element =>{
      let fila = nuevo('tr');
      fila.innerHTML = `
      <td>${element.data.titulo.toUpperCase()}</td>
      <td>${element.data.url_img}</td>
      <td>${element.data.descripcion}</td>
      <td class="${element.data.status.toLowerCase()}"><p>${element.data.status}</p></td>
      <td class="blue" id="${element.id}"><span class="material-symbols-outlined" id="${element.id}">edit</span></td>
      <td class="red" id="${element.id}_delete"><span class="material-symbols-outlined" id="${element.id}_delete">delete</span></td>
      `;
      n('listado_com').appendChild(fila);
      n(element.id).onclick = ()=> editar(element,'communications');
      n(`${element.id}_delete`).onclick = ()=> eliminar(element,'communications');

    });
      n('nuevo-comunicado').onclick = ()=> nuevoRegistro('comunicado');

  } catch (error) {
    console.log(error);
  }
}
/****************************************************************************************************************
 * Funciones para mandar a llamar a construir formularios
 ***********************************************************************************************************/
function nuevoRegistro(tipo){
  switch (tipo) {
    case 'patinador':
      console.log('nuevo:',tipo);
      break;
    case 'asociacion':
      console.log('nuevo:',tipo);
      break;
    case 'evento':
      console.log('nuevo:',tipo);
      break;
    case 'comunicado':
      console.log('nuevo:',tipo);
      break;

    default:
      break;
  }
}
/****************************************************************************************************************
 * Funciones para mandar a llamar alguna accion
 ***********************************************************************************************************/
const visualizar = (element,collection)=>{
  console.group('Visualizar');
  console.log(collection);
  console.log(element.id);
  console.groupEnd()

}
const eliminar = (element,collection)=>{
  console.group('Eliminar');
  console.log(collection);
  console.log(element.id);
  console.groupEnd()
}
const editar = (element,collection)=>{
  console.group('Editar');
  console.log(collection);
  console.log(element.id);
  console.groupEnd()
}
