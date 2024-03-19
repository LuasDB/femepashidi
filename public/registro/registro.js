/****************************************************************************************************************
 * funciones para facilitar el llamado a elementos del DOM
 * ***********************************************************************************************************/
const $ = (elemento)=> document.querySelector(elemento);
const $a = (elemento)=> document.querySelectorAll(elemento);
const n = (elemento)=> document.getElementById(elemento);
const nuevo = (elemento)=> document.createElement(elemento);

const btn_curp = document.getElementById('buscar_curp');
btn_curp.onclick = ()=> buscarCurp();
const nuevo_registro = document.getElementById('nuevo_registro');
nuevo_registro.onclick= ()=> nuevoRegistro();
const monitor = document.getElementById('monitor');

const inicio = ` <section class="card">
<div class="search-curp  area-form">
  <label for="curp">CURP</label>
  <input type="text" placeholder="Tu CURP" id="curp">
  <button class="btn-form item-center" id="buscar_curp">Buscar</button>
  <a id="nuevo_registro" class="link">Registrarme</a>
</div>
<div class="toggle-container area-description ">
  <div class="toogle-left ">
    <img src="../img/galery/LOGO FEDE BLANCO.png" alt="LOGO FEMEPASHIDI">
    <h2>Bienvenido</h2>
    <p>Si ya te has registrado antes </p>
    <p>ingresa tu CURP</p>
  </div>
  <div class="toogle-right hidden">
    <div class="container-right">
      <h2>Completa el siguiente formulario</h2>
      <p>Para registrarte te pedimos que llenes el siguiente formuario.</p>
      <p>Debes tener a la mano tu <span>CURP</span> y una fotografia no mayor a 10MB</p>
    </div>
  </div>
</div>
</section>`;

const area_right = document.querySelector('.toogle-right');
const area_left = document.querySelector('.toogle-left');
$('.area-form').style.fontSize="10px"
/***************************************************************************************************************************************
 * VARIABLES API
 *******************************************************************************************************************************************/
// const server = 'http://localhost:3000/api/v1/'
const server = 'https://femepashidiapi.onrender.com/api/v1/'
const API_USERS = `${server}users/`;
const API_EVENTS = `${server}events`;
const API_ASSOCIATIONS =`${server}associations`;
const API_REGISTER =`${server}register`;



/***************************************************************************************************************************************
 * FUNCIONES DECLARATIVAS PARA LA APLICACIÓN
 *******************************************************************************************************************************************/

//Funcion para el efecto de cambio de formulario
const activar = ()=>{

  const area_form = document.querySelector('.area-form');
  const area_descripcion = document.querySelector('.area-description');
  $('.image-skating').classList.add('hidden')

  area_form.classList.add('active-form');
  area_descripcion.classList.add('active');
  area_right.classList.remove('hidden');
  area_left.classList.add('hidden');
  area_form.classList.remove('search-curp');
  area_form.classList.add('search-curp-active');
}
//
const nuevoRegistro = async()=>{
  activar();
  $('.area-form').innerHTML=`
  <form id="form_nuevo">
    <div class="col-2">
      <label for="curp">CURP
        <input type="text" placeholder="TU CURP" name="curp" id="curp">
      </label>
      <figure>
        <div>
        <label for="file_input" id="nombre_archivo">Haz click aqui para subir tu foto
        <input type="file" style="display:none" id="file_input" name="archivo" class="envioDb fotoNueva" >
          <img src="./user.png" class="img-user" id="img_user"></div>
        </label>
      </figure>
    </div>
    <div class="col-3">
      <label for="nombre">NOMBRE(S)
        <input type="text" placeholder="TU NOMBRE" id="nombre" name="nombre" class="envioDb">
      </label>
      <label for="apellido_paterno">APELLIDO PATERNO
        <input type="text" placeholder="APELLIDO PATERNO" id="apellido_paterno" name="apellido_paterno" class="envioDb" >
      </label>
      <label for="apellido_materno">APELLIDO MATERNO
        <input type="text" placeholder="APELLIDO MATERNO" id="apellido_materno" name="apellido_materno" class="envioDb" >
      </label>
    </div>
    <div class="col-3">
      <label for="fecha_nacimiento">FECHA DE NACIMIENTO
        <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" class="envioDb" >
      </label>
      <label for="sexo">SEXO
        <select id="sexo" name="sexo" class="envioDb">
          <option value="MASCULINO">MASCULINO</option>
          <option value="FEMENINO">FEMENINO</option>
        </select>
      </label>
      <label for="lugar_nacimiento">LUGAR DE NACIMIENTO
        <select id="lugar_nacimiento" name="lugar_nacimiento" class="envioDb">
          <option value="CDMX">CDMX</option>
          <option value="EDO.DE MÉXICO">EDO.DE MÉXICO</option>
        </select>
      </label>
    </div>
    <div class="col-3">
      <label for="telefono">TELEFONO
       <input type="phone" id="telefono" name="telefono" class="envioDb">
      </label>
      <label for="correo">CORREO
        <input type="email" id="correo" name="correo" class="envioDb">
      </label>
      <label for="nivel_actual">NIVEL ACTUAL
        <select id="nivel_actual" name="nivel_actual" class="envioDb">
          <option value="Debutantes 1">Debutantes 1</option>
          <option value="Debutantes 2">Debutantes 2</option>
          <option value="Pre-Básicos">Pre-Básicos</option>
          <option value="Básicos">Básicos</option>
          <option value="Pre-preliminar">Pre-preliminar</option>
          <option value="Preliminar">Preliminar</option>
          <option value="Intermedios 1">Intermedios 1</option>
          <option value="Intermedios 2">Intermedios 2</option>
          <option value="Novicios">Novicios</option>
          <option value="Avanzados 1">Avanzados 1</option>
          <option value="Avanzados 2">Avanzados 2</option>
          <option value="Adulto Bronce">Adulto Bronce</option>
          <option value="Adulto Plata">Adulto Plata</option>
          <option value="Adulto Oro">Adulto Oro</option>
          <option value="Adulto Master">Adulto Master</option>
          <option value="Adulto Master Elite">Adulto Master Elite</option>
          <option value="ADULTO PAREJAS">ADULTO PAREJAS</option>
          <option value="ADULTO PAREJAS INTERMEDIATE">ADULTO PAREJAS INTERMEDIATE</option>
          <option value="ADULTO PAREJAS MASTER">ADULTO PAREJAS MASTER</option>
          <option value="ADULTO PAREJAS MASTER ELITE">ADULTO PAREJAS MASTER ELITE</option>
        </select>
      </label>
    </div>
    <div class="col-3">

      <label for="asociacion">ASOCIACIÓN
        <select id="asociacion" name="id_asociacion" class="envioDb">
        </select>
      </label>
      <label></label>
      <a class="btn-form" id="enviar">Enviar</a>
    </div>
  </form>`;

  //Buscamos las asociaciones vigentes
  const res = await fetch(API_ASSOCIATIONS);
  const data_associations=await res.json();
  const associations = data_associations.documents;
  if(data_associations.message != "TODOS"){
    return;
  }
  const asociaciones = n('asociacion');
  associations.forEach(association =>{
    const option = document.createElement('option');
    option.innerHTML=association.data.nombre;
    option.value=association.id;
    asociaciones.appendChild(option);
  })

  n('enviar').onclick = ()=> envioNuevoRegistro();

  $('.area-description').innerHTML=`
  <div class="toogle-left ">
    <div class="container-right">
      <h4>Registro</h4>
      <p>Completa el siguiente formulario</p>
      <p>Debes tener a la mano:</p>
      <p>* CURP</p>
      <p>* Fotografia de frente con fondo</p>
      <p> blanco en formato .png o .jpg</p>
      <p> no mayor a 10MB</p>
      <br>
      <p>Al registrarte se te enviara </p>
        <p>un correo deconfirmación </p>
        <p>para posteriormente poder acceder al</p>
        <p>registro de competencias</p>


    </div>
  </div>`;

  let img = n('img_user');
  //Funcionalidad para las imagenes
  n('file_input').addEventListener('change', (event) => {

    // n('nombre_archivo').textContent= event.target.files[0].name;

    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
          img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

  }
  );



}
const buscarCurp=async()=>{
  if(n('curp').value.trim() === ''){
    return;
  }
  //traemos la información de la Base de datos
  await fetch(`${API_USERS}${n('curp').value}`)
  .then(response => response.json())
  .then(async(data )=> {

    console.log(data);
    if(data.message==='Usuario no encontrado'){
      Swal.fire({
        title: `${data.message}`,
        text: `Si aun no te has registrado registrate en el boton "Registrarme"`,
        icon: "error",
        showConfirmButton: true,
      });
      return
    }
    const usuario = data.documents[0].data;
    if(usuario.verificacion === false){
      Swal.fire({
        title: `NO ENCONTRADO`,
        text: `Necesitas verificar tu cuenta, al registrarte te enviamos un correo`,
        icon: "error",
        showConfirmButton: true,
      });
      console.log('ESTO ES LA VERIFICACION:',usuario.verificacion)
      return;
    }

    activar();
    $('.area-form').innerHTML=`
    <form id="nuevo_form">
    <input type="text" placeholder="Tu nombre" value="${data.documents[0].id}" style="display:none;" name="id_user" >
    <input type="text" placeholder="Tu nombre" value="${usuario.id_asociacion}" style="display:none;" name="id_association" >



      <div class="col-2">
        <label for="curp">CURP
          <input type="text" placeholder="Tu nombre" value="${usuario.curp}" disabled>
        </label>
        <figure>
          <img src="./user.png" class="img-user">
        </figure>
      </div>

      <div class="col-3">
        <label for="curp">NOMBRE(S)
          <input type="text" placeholder="Tu nombre" value="${usuario.nombre}" disabled>
        </label>
        <label for="curp">APELLIDO PATERNO
          <input type="text" placeholder="APELLIDO PATERNO" value="${usuario.apellido_paterno}" disabled>
        </label>
        <label for="curp">APELLIDO MATERNO
          <input type="text" placeholder="APELLIDO PATERNO" value="${usuario.apellido_materno}" disabled>
        </label>
      </div>
      <div class="col-3">
        <label for="curp">FECHA DE NACIMIENTO
          <input type="date" value="${usuario.fecha_nacimiento}" disabled>
        </label>
        <label for="curp">SEXO
          <input type="text" placeholder="APELLIDO PATERNO" value="${usuario.sexo}" disabled>
        </label>
        <label for="curp">LUGAR DE NACIMIENTO
          <input type="text" value="${usuario.lugar_nacimiento}" disabled>
        </label>
      </div>
      <div class="col-3">
        <label for="curp">CATEGORIA
          <input type="text" placeholder="APELLIDO PATERNO" value="${usuario.categoria}" disabled>
        </label>
        <label for="curp">NIVEL ACTUAL
          <input type="text" placeholder="APELLIDO PATERNO" value="${usuario.nivel_actual}" disabled>
        </label>
        <label for="curp">ASOCIACIÓN
          <input type="text" placeholder="APELLIDO PATERNO" value="${usuario.asociacion.nombre}" disabled>
        </label>

      </div>
      <div class="col-3">
      <label for="curp">TELEFONO
          <input type="phone" value="${usuario.telefono}" disabled>
        </label>
        <label for="curp">CORREO
          <input type="email" value="${usuario.correo}" disabled>
        </label>
      </div>
      <label for="competencia">COMPETENCIA A LA QUE TE INSCRIBES
        <select name="id_events" competencia" id="competencia">

        </select>
      </label>
      <div class="col-3">

      <label for="curp">
      </label>
      <label for="curp">

      </label>
      <a class="btn-form" id="enviar_registro">Enviar</a>
    </div>


    </form>
    `;
    n('enviar_registro').onclick= ()=> envioRegistroCompetencia();

    //Buscamos los eventos para cargarlos
    const res = await fetch(API_EVENTS);
    const data_events = await res.json();
    const events = data_events.documents;
    const competencias = n('competencia');
    events.forEach(event => {
      const option = document.createElement('option');
      option.innerHTML=`${event.data.nombre}`;
      option.value=event.id;
      competencias.appendChild(option);
    });
    $('.area-description').innerHTML=`
    <div class="toogle-left ">
      <div class="container-right">
        <p><span>Hola<span></p>
        <p><span>${usuario.nombre.toUpperCase()}<span></p>
        <br>
        <p>Selecciona la competencia</p>
        <p>a la que deseas inscribirte</p>
        <br>
        <p>Se te enviara un correo de </p>
        <p>notificación cuando tu solicitud</p>
        <p>haya sido aprobada.</p>
        <br>
        <p>Te sugerimos estar atento</p>
      </div>
    </div>
    `;
    $('.img-user').src=data.img;
  }).catch((error)=>{
    console.log(error)

  });
}

const cambiarFoto = ()=>{

  const file = $('.fotoNueva');
  console.log(file)
  let reader = new FileReader();

  reader.onload = (e)=>{
    console.log('Se entro al onload')
    let img = document.getElementById('img_user');

    console.log(e.target.result)
    console.log(img)
  }
  reader.readAsDataURL(file);
}

/***************************************************************************************************************************************
 * FUNCIONES DECLARATIVAS PARA ENVIO A BASE DE DATOS
 *******************************************************************************************************************************************/
const envioNuevoRegistro=async ()=>{
  //Convertimos el correo a minusculas
  const emailInput = n('correo');
  let email=emailInput.value;
  email=email.toLowerCase();
  emailInput.value=email;
  Swal.fire({
    title: "¡Estas a punto de registrarte!",
    text: "¿Revisaste que la información sea correcta?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "No,espera",
    confirmButtonText: "Si,claro"
  }).then(async(result) => {
    if (result.isConfirmed){
      //Validacion de curp existente
      let curp =n('curp').value;
      const curpVal = curp.toUpperCase();
      await fetch(`${API_USERS}validate/${curpVal}`)
      .then(response => response.json() )
      .then(async(result) =>{

        if(result.resultado){
          Swal.fire({
            title: `Este usuario ya ha sido dado de alta`,
            text: "Revisa tu correo de confirmación",
            icon: "error",
            showConfirmButton: true,
          });
          }else{
          const form = n('form_nuevo');
          const formData = new FormData(form);
          await fetch(API_USERS,{
            method:'POST',
            body:formData
          })
          .then(response => response.json())
          .then(data => {
              if(data.id){
                Swal.fire({
                  title: `${data.message}`,
                  text: "Tu información se guardo correctamente, te enviamos un correo para confirmar tu registro",
                  icon: "success",
                  showConfirmButton: true,
                })
                .then(res=>{
                  if(res.isConfirmed){
                    window.location.reload();
                  }
                });
              }
          });
        }
      });
    }
  });
}

const envioRegistroCompetencia = ()=>{

  Swal.fire({
    title: "¡Estas a punto de registrarte!",
    text: "¿Revisaste que la información sea correcta?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "No,espera",
    confirmButtonText: "Si,claro"
  }).then(async(result) => {
    if(result.isConfirmed){
      const form = n('nuevo_form');
      let formData = new FormData(form);
      formData.append('status','Inscrito');
      formData.append('fecha_solicitud','2024-03-03');
      for (let entry of formData.entries()) {
        console.log(entry[0] + ': ' + entry[1]);
    }

      // Crear un nuevo FormData y agregar algunos datos


    // Enviar el FormData al servidor
    fetch(API_REGISTER, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      if(data.id){
        Swal.fire({
          title: `${data.message}`,
          text: "Tu información se guardo correctamente, te enviamos un correo para confirmar tu registro",
          icon: "success",
          showConfirmButton: true,
        })
        .then(res=>{
          if(res.isConfirmed){
            window.location.reload();
          }
        });

    }})
    .catch(error => {
      console.error('Error:', error);
    });
    }
  });


}


// nuevo_registro.addEventListener('click',nuevoRegistro)
// btn_curp.addEventListener('click',buscarCurp);




