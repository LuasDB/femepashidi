/****************************************************************************************************************
 * Llamada a formularios
 * ***********************************************************************************************************/
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
function fechaCorta(){
const hoy = new Date();
const año = hoy.getFullYear();
const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
const dia = ('0' + hoy.getDate()).slice(-2);
return `${año}-${mes}-${dia}`;
}
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
const API = 'http://localhost:3000/api/v1/';
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
      monitor.innerHTML=formNewUser;
      n('guardar').onclick = ()=> enviarBd('users');
      break;
    case 'asociacion':
      console.log('nuevo:',tipo);
      monitor.innerHTML = formNewAssociation;
      n('guardar').onclick = ()=> enviarBd('associations');

      break;
    case 'evento':
      console.log('nuevo:',tipo);
      monitor.innerHTML = formNewEvent;
      n('guardar').onclick = ()=> enviarBd('events');
      break;
    case 'comunicado':
      console.log('nuevo:',tipo);
      monitor.innerHTML = formNewCommunication;
      n('guardar').onclick = ()=> enviarBd('communications');
      break;
    default:
      break;
  }
}
/****************************************************************************************************************
 * Funciones para enviar a Base de datos
 ***********************************************************************************************************/
const enviarBd = async(collection)=>{
  if(collection != 'communications'){
  Swal.fire({
    title: "¡Envio a Base de datos!",
    text: "Revisaste que la información sea correcta?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "No,espera",
    confirmButtonText: "Si,claro"
  }).then(async(result) => {
    if (result.isConfirmed){
      const obj ={}
      $a('.envioDb').forEach(element =>{
        if(element.id === 'fecha_corta'){
          obj['fecha_larga']=fechaLarga(element.value);
        }
        obj[element.id]=element.value
        console.log(element.value)
      });
      console.log(obj);

      await fetch(`${API}${collection}`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(obj)
      })
      .then(response=>response.json())
      .then(data=>{
        if(data.id){
         monitor.innerHTML=``;
         Swal.fire({
          title: `${data.message}`,
          text: "Tu información se guardo correctamente",
          icon: "success",
          showConfirmButton: false,
          timer:2000
        });
        }
      })
      .catch(error=> {
        Swal.fire({
          title: `Algo salio mal`,
          text: `${error}`,
          icon: "error",
          showConfirmButton: false,
          timer:2000
        });
      });
    }
  });
  }else{
    Swal.fire({
      title: "¡Envio a Base de datos!",
      text: "Revisaste que la información sea correcta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No,espera",
      confirmButtonText: "Si,claro"
    }).then(async(result) => {
      if (result.isConfirmed){
        //PARA LA IMAGEN
        const archivoInput = document.getElementById('archivoInput');
        console.log(archivoInput.files[0]);
        const archivo = archivoInput.files[0];
        const typeFile = archivo.name.split('.');
        const nuevoNombre = `${Date.now()}-notification.${typeFile[1]}`;

        if(archivo) {
          console.log('EXISTE EL ARCHIVO');
          const formData = new FormData();
          formData.append('archivo', archivo,nuevoNombre);

          await fetch(`${API}upload`, {
            method: 'POST',
            body: formData,
          })
          .then(response => response.text())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error('Error al subir el archivo:', error);
          });
        } else {
          console.error('Selecciona un archivo antes de hacer clic en "Subir Archivo".');
        }

        const obj ={}
        $a('.envioDb').forEach(element =>{
          if(element.id === 'fecha_corta'){
            obj['fecha_larga']=fechaLarga(element.value);
          }

          obj[element.id]=element.value
          console.log(element.value);
        });
        obj['url_img']=nuevoNombre;
        console.log(obj);


        await fetch(`${API}${collection}`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(obj)
        })
        .then(response=>response.json())
        .then(data=>{
          if(data.id){
           monitor.innerHTML=``;
           Swal.fire({
            title: `${data.message}`,
            text: "Tu información se guardo correctamente",
            icon: "success",
            showConfirmButton: false,
            timer:2000
          });
          }
        })
        .catch(error=> {
          Swal.fire({
            title: `Algo salio mal`,
            text: `${error}`,
            icon: "error",
            showConfirmButton: false,
            timer:2000
          });
        });









      }
    });
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
  $('section').classList.add('hidden');
  n('modal_bg').classList.remove('hidden');
  let visual = nuevo('section');
  visual.classList.add('card');
  visual.classList.add('modal');
  visual.id = `${element.id}_modal`;
  if(collection === 'users'){
  visual.innerHTML=`
  <div class="header-modal">
  <h3>${titulos[collection]}</h3>
  <span class="material-symbols-outlined red" id="close_modal">
    close_fullscreen
    </span>
  </div>
  <div class="flex-container-input">
  <label for="">CURP
    <p>FUBM901026HDFNRR07${element.data.curp}</p>
  </label>
</div>
<div class="flex-container-input">
  <label for="">NOMBRE
    <p>${element.data.nombre} ${element.data.apellido_paterno} ${element.data.apellido_materno}</p>
  </label>
  <label for="">FECHA DE NACIMIENTO
    <p>${fechaLarga(element.data.fecha_nacimiento)}</p>
  </label>
  <label for="">LUGAR DE NACIMIENTO
    <p>${element.data.lugar_nacimiento}</p>
  </label>
  <label for="">SEXO
    <p>${element.data.sexo}</p>
  </label>
</div>
<div class="flex-container-input">
  <label for="">CORREO
    <p>${element.data.correo}</p>
  </label>
  <label for="">TELEFONO/WHATSAPP
    <p>${element.data.telefono}</p>
  </label>
</div>
<div class="flex-container-input">
  <label for="">ASOCIACION A LA QUE PERTENECE
    <p>${element.data.asociacion}</p>
  </label>
  <label for="">NIVEL ACTUAL
    <p>${element.data.nivel_actual}</p>
  </label>
</div>

  `;}
  if(collection === 'register'){
    visual.innerHTML=`
    <div class="header-modal">
    <h3>${titulos[collection]}</h3>
    <span class="material-symbols-outlined red" id="close_modal">
      close_fullscreen
      </span>
    </div>

    `;
  }
  console.log(element);
  monitor.appendChild(visual);
  n('close_modal').onclick = () => cerrarModal(visual.id);

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
const cerrarModal = (id)=>{
  n('modal_bg').classList.add('hidden');
  n(id).remove();
  $('section').classList.remove('hidden');
}
