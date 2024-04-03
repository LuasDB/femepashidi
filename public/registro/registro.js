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
// const server = 'http://localhost:3000/api/v1/';


const server = 'https://femepashidi.siradiacion.com.mx/api/v1/'
// const server = 'https://femepashidiapi.onrender.com/api/v1/'
const API_USERS = `${server}users/`;
const API_EVENTS = `${server}events`;
const API_ASSOCIATIONS =`${server}associations`;
const API_REGISTER =`${server}register`;

const estados = {
  'AS': 'Aguascalientes',
  'BC': 'Baja California',
  'BS': 'Baja California Sur',
  'CC': 'Campeche',
  'CL': 'Coahuila',
  'CM': 'Colima',
  'CS': 'Chiapas',
  'CH': 'Chihuahua',
  'DF': 'Ciudad de México',
  'DG': 'Durango',
  'GT': 'Guanajuato',
  'GR': 'Guerrero',
  'HG': 'Hidalgo',
  'JC': 'Jalisco',
  'MC': 'Estado de México',
  'MN': 'Michoacán',
  'MS': 'Morelos',
  'NT': 'Nayarit',
  'NL': 'Nuevo León',
  'OC': 'Oaxaca',
  'PL': 'Puebla',
  'QT': 'Querétaro',
  'QR': 'Quintana Roo',
  'SP': 'San Luis Potosí',
  'SL': 'Sinaloa',
  'SR': 'Sonora',
  'TC': 'Tabasco',
  'TS': 'Tamaulipas',
  'TL': 'Tlaxcala',
  'VZ': 'Veracruz',
  'YN': 'Yucatán',
  'ZS': 'Zacatecas',
  'NE': 'Extranjero',
};

const categories = {
  2:`A`,
  3:`A`,
  4:`A`,
  5:`A`,
  6:`B`,
  7:`B`,
  8:`B`,
  9:`B`,
  10:`C`,
  11:`C`,
  12:`C`,
  13:`C`,
  14:`C`,
  15:`D`,
  16:`D`,
  17:`D`,
  18:`D`,
  19:`D`,
  20:`MAYOR`,
  28:`ADULTO`,
}

const categoriesInternational = {
  2:`A`,
  3:`A`,
  4:`A`,
  5:`A`,
  6:`B`,
  7:`B`,
  8:`B`,
  9:`B`,
  10:`C`,
  11:`C`,
  12:`C`,
  13:`C`,
  14:`C`,
  15:`D`,
  16:`D`,
  17:`D`,
  18:`D`,
  19:`D`,
  20:`MAYOR`,
  28:`ADULTO`,
}


const verifyCategory=(fecha_nacimiento)=>{
  const fecha = new Date(fecha_nacimiento);
  const hoy = new Date();
  const diferenciaMilisegundos = hoy - fecha;
  let edadExacta = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365.25));
  console.log('Edad:',edadExacta);
  let verificacion = edadExacta;
    if(edadExacta >= 28){
      verificacion=28;
    }else if (edadExacta >= 20){
      verificacion=20;

    }
    console.log(categories[verificacion])

    return categories[verificacion];

}

const verifyCategoryInternational=(fecha_nacimiento)=>{
  const fecha = new Date(fecha_nacimiento);
  const hoy = new Date();
  const diferenciaMilisegundos = hoy - fecha;
  let edadExacta = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365.25));

  let verificacion = edadExacta;
    if(edadExacta >= 28){
      verificacion=28;
    }else if (edadExacta >= 20){
      verificacion=20;

    }
    console.log(categories[verificacion])

    return categories[verificacion];

}
function fechaActual(){
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const day = String(fecha.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


/***************************************************************************************************************************************
 * FUNCIONES DECLARATIVAS PARA LA APLICACIÓN
 *******************************************************************************************************************************************/

function transformarFecha(fecha) {
  // Separar la fecha en día, mes y año
  const [dia, mes, anio] = fecha.split('/');

  // Obtener el año completo dependiendo de si es 1900 o 2000
  const anioCompleto = (parseInt(anio) < 50) ? 2000 + parseInt(anio) : 1900 + parseInt(anio);

  // Crear una nueva fecha en formato válido (mes-1 porque los meses van de 0 a 11 en JavaScript)
  const fechaValida = new Date(anioCompleto, parseInt(mes) - 1, parseInt(dia));

  // Obtener la fecha en formato 'yyyy-mm-dd'
  const fechaInputDate = fechaValida.toISOString().split('T')[0];

  return fechaInputDate;
}
//Funcion para validar un curp
function validarCURP(curp) {
  const regexCURP = /^[A-Z]{4}[0-9]{6}[H,M][A-Z]{5}[A-Z0-9]{2}$/;
  if (!regexCURP.test(curp)) {
    Swal.fire({
      title: `CURP NO VALIDO`,
      text: `Este CURP no cumple con el formato, verificalo`,
      icon: "error",
      showConfirmButton: true,
    });
    return
  }


  // Extraer información del CURP
  const fechaNacimiento = transformarFecha(`${curp.substr(8, 2)}/${curp.substr(6, 2)}/${curp.substr(4, 2)}`)
  let sexo ='';
  if(curp.charAt(10) === 'H'){
    sexo = 'MASCULINO'
  }else{
    sexo='FEMENINO'
  }

  const estadoNacimiento = estados[curp.substr(11, 2)] ;
  console.log(fechaNacimiento);
  console.log(sexo);
  console.log(estadoNacimiento);

  // // Validar fecha de nacimiento
  // if (isNaN(fechaNacimiento.getTime())) {

  //     Swal.fire({
  //       title: `FECHA DE NACIMIENTO NO VALIDA`,
  //       text: `Revisa bien tu CURP `,
  //       icon: "error",
  //       showConfirmButton: true,
  //     });
  //     return
  // }

  return { fechaNacimiento, sexo, estadoNacimiento };
}
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
        <select id="sexo" name="sexo" class="envioDb" >
          <option value="MASCULINO">MASCULINO</option>
          <option value="FEMENINO">FEMENINO</option>
        </select>
      </label>
      <label for="lugar_nacimiento">LUGAR DE NACIMIENTO
        <select id="lugar_nacimiento" name="lugar_nacimiento" class="envioDb" >
        <option value="Aguascalientes">Aguascalientes</option>
        <option value="Baja California">Baja California</option>
        <option value="Baja California Sur">Baja California Sur</option>
        <option value="Campeche">Campeche</option>
        <option value="Coahuila">Coahuila</option>
        <option value="Colima">Colima</option>
        <option value="Chiapas">Chiapas</option>
        <option value="Chihuahua">Chihuahua</option>
        <option value="Ciudad de México">Ciudad de México</option>
        <option value="Durango">Durango</option>
        <option value="Guanajuato">Guanajuato</option>
        <option value="Guerrero">Guerrero</option>
        <option value="Hidalgo">Hidalgo</option>
        <option value="Jalisco">Jalisco</option>
        <option value="Estado de México">Estado de México</option>
        <option value="Michoacán">Michoacán</option>
        <option value="Morelos">Morelos</option>
        <option value="Nayarit">Nayarit</option>
        <option value="Nuevo León">Nuevo León</option>
        <option value="Oaxaca">Oaxaca</option>
        <option value="Puebla">Puebla</option>
        <option value="Querétaro">Querétaro</option>
        <option value="Quintana Roo">Quintana Roo</option>
        <option value="San Luis Potosí">San Luis Potosí</option>
        <option value="Sinaloa">Sinaloa</option>
        <option value="Sonora">Sonora</option>
        <option value="Tabasco">Tabasco</option>
        <option value="Tamaulipas">Tamaulipas</option>
        <option value="Tlaxcala">Tlaxcala</option>
        <option value="Veracruz">Veracruz</option>
        <option value="Yucatán">Yucatán</option>
        <option value="Zacatecas">Zacatecas</option>
        <option value="Extranjero">Extranjero</option>
        </select>
      </label>
    </div>
    <div class="col-3">
    <label for="categoria">Categoria
        <input type="text" placeholder="" id="categoria" name="categoria" class="envioDb" disabled>
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
      <label for="asociacion">ASOCIACIÓN
      <select id="asociacion" name="id_asociacion" class="envioDb">
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
      <a class="btn-form" id="enviar">Enviar</a>
    </div>
  </form>`;
  n('curp').addEventListener('input',function(){
    if(n('curp').value.length === 18){
      const { fechaNacimiento, sexo, estadoNacimiento }=validarCURP(n('curp').value);
      if( fechaNacimiento && sexo && estadoNacimiento){
        n('fecha_nacimiento').value =fechaNacimiento;
        n('sexo').value =sexo;
        n('lugar_nacimiento').value = estadoNacimiento;
        let categoria = verifyCategory(fechaNacimiento)
        console.log(categoria);
        console.log(n('categoria').value);
        n('categoria').value = `${categoria}`;
      }else{
        alert('no funciono')
      }
    }
  });



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
        title: `NO APROBADO`,
        text: `Es necesario verificar tu cuenta. En cuanto se apruebe tu solicitud, se te enviará un correo para que verifiques tu cuenta y puedas entrar`,
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
      <label for="nivel_actual">NIVEL ACTUAL
        <select id="nivel_actual" name="nivel_actual" class="envioDb" placeholder="Selecciona tu nivel">
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
      <label for="categoria">CATEGORIA
      <select id="categoria" name="categoria" class="envioDb" placeholder="Selecciona tu nivel">
        <option value="A">A (5 AÑOS O MENOS)</option>
        <option value="B">B (6 A 9 AÑOS)</option>
        <option value="C">C (10 A 14 AÑOS)</option>
        <option value="D">D (15 A 19 AÑOS)</option>
        <option value="MAYOR">MAYOR (20 A 27 AÑOS)</option>
        <option value="ADULTO">ADULTO(28 AÑOS O MAS)</option>
        <option value="CALSS I">CALSS I(NACIDOS ENTRE EL 1 DE JULIO DE1985 Y 30 DE JUNIO DE 1995)</option>
        <option value="CALSS II">CALSS II(NACIDOS ENTRE EL 1 DE JULIO DE1975 Y 30 DE JUNIO DE 1985)</option>
        <option value="CALSS III">CALSS III(NACIDOS ENTRE EL 1 DE JULIO DE1965 Y 30 DE JUNIO DE 1975)</option>
        <option value="CALSS IV">CALSS IV(NACIDOS ENTRE EL 1 DE JULIO DE1955 Y 30 DE JUNIO DE 1965)</option>
        <option value="CALSS V">CALSS V(NACIDOS ANTES DEL 30 DE JUNIO DE 1965)</option>

      </select>
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

  //Para competencia internacional cambiamos la categoria segun el nivel que escojan y su edad:
  n('nivel_actual').addEventListener('change', ()=>{

    const internationalLevel = {
      'Adulto Bronce':true,
      'Adulto Plata':true,
      'Adulto Oro':true,
      'Adulto Master':true,
      'Adulto Master Elite':true,
    }
    const internationalCat = {
      'Adulto Bronce':true,
      'Adulto Plata':true,
      'Adulto Oro':true,
      'Adulto Master':true,
      'Adulto Master Elite':true,
    }
    console.log('cambio el nivel',n('nivel_actual').value)
    let nuevo_nivel =n('nivel_actual').value;
    if(internationalLevel[nuevo_nivel]){

    }
  })

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
          // Visualizar los datos en la consola
          for (let entry of formData.entries()) {
            console.log(entry[0], entry[1]);
        }




            const inputs = document.querySelectorAll('.envioDb');
            let camposFaltantes = [];

            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].value === '') {
                    camposFaltantes.push(inputs[i]);
                }
            }

            if (camposFaltantes.length > 0) {
                alert('Todos los campos deben ser llenados.');
                camposFaltantes.forEach(input => {
                    input.style.border = '1px solid red';
                });
                return;
            }

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
      formData.append('status','Preinscrito');
      formData.append('fecha_solicitud',fechaActual());
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




