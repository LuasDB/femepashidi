const mailParticipanteInicio=({ competencia, user,folio})=>{

  const fechaNac = new Date(user.fecha_nacimiento);
  const fechaActual = new Date();
  const añoActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth() + 1; // Meses van de 0 a 11
  let edad = añoActual - fechaNac.getFullYear();
  if (mesActual < 7 || (mesActual === 7 && fechaActual.getDate() < 1)) {
    edad--;
  }

  edad;


  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;800&family=Rubik+Maps&display=swap');
    :root{
      --primary-color-r:#268dee;
      --background-input:#f0f0f0;
      --font-input:#333;
    }
    body{
      font-family: 'Nunito', sans-serif;
    }

    .container{
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
    }

      </style>
</head>
<body>
  <div class="" style="text-align: justify;">
  <img style="width: 90%;" src="cid:encabezadoImg" alt="Imagen Adjunta">
    <h2 style="
    color:#268dee;">${user.nombre.toUpperCase()} </h2>
    <p style="color:#333; text-align: justify;">Hemos recibido tu solicitud de Carta Permiso para participar en el torneo : <span style="font-weight: bold"> ${competencia.nombreCompetencia} </span> en el nivel : <span style="font-weight: bold"> ${competencia.nivelCompeticion}.</span> </p>
    <p style="color:#333; text-align: justify;">Hemos enviado copia de este correo al presidente de tu asociacion (${user.asociacion.nombre}) para que dé el Visto Bueno para que esta solicitud sea enviada al Presidente de FEMEPASHIDI.</p>
    <p style="color:#333; text-align: justify;">Una vez realizadas todas las autorizaciones, recibiras vía correo electrónico la carta que estás solicitando.</p>
    <p style="color:#333; text-align: justify;">En caso de que esta solicitud sea autorizada, te recordamos que deberás compartir tus resultados de la competencia vía correo electrónico a: <a href="mailto:resultados@femepashidi.com.mx">resultados@femepashidi.com.mx</a>.</p>
    <p style="color:#333; text-align: justify;">Cualquier comentario o sugerencia, con gusto lo recibiremos en el correo <a href="mailto:contacto@femepashidi.com.mx">contacto@femepashidi.com.mx</a> </p>

    <p style="
    color:#333; ">Saludos,</p>
    <p style="
    color:black; text-align: justify;">Federación Mexicana de Patinaje Sobre Hielo y Deportes de Invierno,A.C.</p>
    <a href="https://www.femepashidi.com.mx/inicio">https://www.femepashidi.com.mx/inicio/</a>
  </div>
  <br>
  <div style="border: 2px solid rgb(72, 72, 131);padding: 1rem;">
    <img style="width: 90%;" src="cid:encabezadoImg" alt="Imagen Adjunta">
    <h3 style="text-align: center;">Solicitud de Carta Permiso Competencias Internacionales</h3>
    <div style="text-align: right;margin:3rem;">Fecha de solicitud: ${competencia.date.slice(0,10)} ${competencia.date.slice(11,19)}</div>
    <div style="padding: 0 5%;">
      <table style="border: 1px solid gray; border-radius: 10px;width: 100%;padding: 1rem;margin: 1rem;">
        <tr>
          <td style="font-weight: bold;">Nombre</td>
          <td>${user.nombre}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Apellido Paterno</td>
          <td>${user.apellido_paterno}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Apellido Materno</td>
          <td>${user.apellido_materno}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Fecha de Nacimiento:</td>
          <td>${user.fecha_nacimiento} (Edad al 1 de Julio ${fechaActual.getFullYear()} : ${edad} años)</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Correo:</td>
          <td>${user.correo}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Asociacion a la que pertenece:</td>
          <td>${user.asociacion.abreviacion}</td>
        </tr>
      </table>
      <table style="border: 1px solid gray; border-radius: 10px;width: 100%;padding: 1rem; margin: 1rem;">

        <tr>
          <td style="font-weight: bold;">Competencia</td>
          <td>${competencia.nombreCompetencia}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Domicilio</td>
          <td>${competencia.domicilioCompetencia}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Ciudad</td>
          <td>${competencia.ciudadEstadoCompetencia}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Fechas del evento</td>
          <td>${competencia.fechaInicialCompetencia} al ${competencia.fechaFinalCompetencia}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Nivel en el que competirá</td>
          <td>${competencia.nivelCompeticion}</td>
          <td style="font-weight: bold;">Nivel Aprobado</td>
          <td>${user.nivel_actual}</td>
        </tr>
        <tr >
          <td style="font-weight: bold;">Comentarios</td>
          <td>${competencia.comentariosCompetencia}</td>
        </tr>
        <tr>
        <td style="font-weight: bold;">Folio de solicitud</td>
        <td>${folio}</td>
        </tr>
      </table>
      <p>Te pedimos validar que hayas seleccionado el Nivel correcto en el que deseas competir. En el caso de existir alguna modificación, solamente tendras que volver a realizar este proceso de Solicitud de Permiso para generar una nueva solicitud con los datos correctos</p>
      <p>Certifico que la información señalada es verdadera y correcta hasta mi más leal saber y entender.Acepto lois puntos de la Convocatoria y del Reglamento de Competencia.</p>
      <p>En caso de que esta solicitud sea autorizada, me comprometo a compartir los resultados de la competencia vía correo electrónico al correo : resultados@femepashidi.com.mx</p>

    </div>



  </div>
</body>
</html>
  `

}

const mailPresidenteInicio=({ competencia, user,folio,server,id})=>{

  const fechaNac = new Date(user.fecha_nacimiento);
  const fechaActual = new Date();
  const añoActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth() + 1; // Meses van de 0 a 11
  let edad = añoActual - fechaNac.getFullYear();
  if (mesActual < 7 || (mesActual === 7 && fechaActual.getDate() < 1)) {
    edad--;
  }

  edad;


  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;800&family=Rubik+Maps&display=swap');
    :root{
      --primary-color-r:#268dee;
      --background-input:#f0f0f0;
      --font-input:#333;
    }
    body{
      font-family: 'Nunito', sans-serif;
    }

    .container{
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
    }

      </style>
</head>
<body>
  <div class="" style="text-align: justify;">
  <img style="width: 90%;" src="cid:encabezadoImg" alt="Imagen Adjunta">

    <p style="color:#333; text-align: justify;">
    <span style="font-weight: bold"> ${user.nombre}  ${user.apellido_paterno}</span> está enviando esta solicitud adjunta para Competir Internacionalmente en el torneo :
    <span style="font-weight: bold"> ${competencia.nombreCompetencia} </span> en el nivel : <span style="font-weight: bold"> ${competencia.nivelCompeticion}</span>. Adjunto a este correo encontrará tambien la Convocatoria del Evento. </p>
    <p style="color:#333; text-align: justify;">Es necesario que dé su Visto Bueno para que esta solicitud sea enviada al Presidente de FEMEPASHIDI.</p>

    <a href="${server}api/v1/letters/verification/${id}/true" target="_self">
      <img style="width:200px;" src="cid:aceptarImg" alt="Imagen Adjunta">
    </a>
    <br>
    <a href="${server}api/v1/letters/verification/${id}/false" target="_self">
      <img style="width:200px;" src="cid:rechazarImg" alt="Imagen Adjunta">
    </a>





    <p style="color:#333; text-align: justify;">Una vez realizadas todas las autorizaciones, recibiras vía correo electrónico la Carta Permiso con copia al Solicitante.</p>

    <p style="color:#333; text-align: justify;">Cualquier comentario o sugerencia, con gusto lo recibiremos en el correo <a href="mailto:contacto@femepashidi.com.mx">contacto@femepashidi.com.mx</a> </p>

    <p style="
    color:#333; ">Saludos,</p>
    <p style="
    color:black; text-align: justify;">Federación Mexicana de Patinaje Sobre Hielo y Deportes de Invierno,A.C.</p>
    <a href="https://www.femepashidi.com.mx/inicio">https://www.femepashidi.com.mx/inicio/</a>
  </div>
  <br>
  <div style="border: 2px solid rgb(72, 72, 131);padding: 1rem;">
    <img style="width: 90%;" src="cid:encabezadoImg" alt="Imagen Adjunta">
    <h3 style="text-align: center;">Solicitud de Carta Permiso Competencias Internacionales</h3>
    <div style="text-align: right;margin:3rem;">Fecha de solicitud: ${competencia.date.slice(0,10)} ${competencia.date.slice(11,19)}</div>
    <div style="padding: 0 5%;">
      <table style="border: 1px solid gray; border-radius: 10px;width: 100%;padding: 1rem;margin: 1rem;">
        <tr>
          <td style="font-weight: bold;">Nombre</td>
          <td>${user.nombre}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Apellido Paterno</td>
          <td>${user.apellido_paterno}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Apellido Materno</td>
          <td>${user.apellido_materno}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Fecha de Nacimiento:</td>
          <td>${user.fecha_nacimiento} (Edad al 1 de Julio ${fechaActual.getFullYear()} : ${edad} años)</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Correo:</td>
          <td>${user.correo}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Asociacion a la que pertenece:</td>
          <td>${user.asociacion.abreviacion}</td>
        </tr>
      </table>
      <table style="border: 1px solid gray; border-radius: 10px;width: 100%;padding: 1rem; margin: 1rem;">

        <tr>
          <td style="font-weight: bold;">Competencia</td>
          <td>${competencia.nombreCompetencia}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Domicilio</td>
          <td>${competencia.domicilioCompetencia}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Ciudad</td>
          <td>${competencia.ciudadEstadoCompetencia}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Fechas del evento</td>
          <td>${competencia.fechaInicialCompetencia} al ${competencia.fechaFinalCompetencia}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Nivel en el que competirá</td>
          <td>${competencia.nivelCompeticion}</td>
          <td style="font-weight: bold;">Nivel Aprobado</td>
          <td>${user.nivel_actual}</td>
        </tr>
        <tr >
          <td style="font-weight: bold;">Comentarios</td>
          <td>${competencia.comentariosCompetencia}</td>
        </tr>
        <tr>
        <td style="font-weight: bold;">Folio de solicitud</td>
        <td>${folio}</td>
        </tr>
      </table>
      <p>Te pedimos validar que hayas seleccionado el Nivel correcto en el que deseas competir. En el caso de existir alguna modificación, solamente tendras que volver a realizar este proceso de Solicitud de Permiso para generar una nueva solicitud con los datos correctos</p>
      <p>Certifico que la información señalada es verdadera y correcta hasta mi más leal saber y entender.Acepto lois puntos de la Convocatoria y del Reglamento de Competencia.</p>
      <p>En caso de que esta solicitud sea autorizada, me comprometo a compartir los resultados de la competencia vía correo electrónico al correo : resultados@femepashidi.com.mx</p>

    </div>



  </div>
</body>
</html>
  `

}

const mailPresidenteFemepashidi=({ competencia, user,folio,server,id})=>{
  const fechaNac = new Date(user.fecha_nacimiento);
  const fechaActual = new Date();
  const añoActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth() + 1; // Meses van de 0 a 11
  let edad = añoActual - fechaNac.getFullYear();
  if (mesActual < 7 || (mesActual === 7 && fechaActual.getDate() < 1)) {
    edad--;
  }
  edad;
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;800&family=Rubik+Maps&display=swap');
    :root{
      --primary-color-r:#268dee;
      --background-input:#f0f0f0;
      --font-input:#333;
    }
    body{
      font-family: 'Nunito', sans-serif;
    }

    .container{
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
    }

      </style>
</head>
<body>
  <div class="" style="text-align: justify;">
  <img style="width: 90%;" src="cid:encabezadoImg" alt="Imagen Adjunta">

    <p style="color:#333; text-align: justify;">
    <span style="font-weight: bold"> ${user.nombre}  ${user.apellido_paterno}</span> está enviando esta solicitud adjunta para Competir Internacionalmente en el torneo :
    <span style="font-weight: bold"> ${competencia.nombreCompetencia} </span> en el nivel : <span style="font-weight: bold"> ${competencia.nivelCompeticion}</span>. Esta solicitud ya ha sido autorizada por el presidente de ${user.asociacion.nombre}</p>


    <p style="color:#333; text-align: justify;">Adjunto a este correo encontrará tambien la Convocatoria del Evento. </p>

    <a href="${server}api/v1/letters/approve/${id}/true" target="_self">
      <img style="width:200px;" src="cid:aceptarImg" alt="Imagen Adjunta">
    </a>
    <br>
    <a href="${server}api/v1/letters/approve/${id}/false" target="_self">
      <img style="width:200px;" src="cid:rechazarImg" alt="Imagen Adjunta">
    </a>





    <p style="color:#333; text-align: justify;">Una vez realizadas todas las autorizaciones, recibiras vía correo electrónico la Carta Permiso con copia al Solicitante.</p>

    <p style="color:#333; text-align: justify;">Cualquier comentario o sugerencia, con gusto lo recibiremos en el correo <a href="mailto:contacto@femepashidi.com.mx">contacto@femepashidi.com.mx</a> </p>

    <p style="
    color:#333; ">Saludos,</p>
    <p style="
    color:black; text-align: justify;">Federación Mexicana de Patinaje Sobre Hielo y Deportes de Invierno,A.C.</p>
    <a href="https://www.femepashidi.com.mx/inicio">https://www.femepashidi.com.mx/inicio/</a>
  </div>
  <br>
  <div style="border: 2px solid rgb(72, 72, 131);padding: 1rem;">
    <img style="width: 90%;" src="cid:encabezadoImg" alt="Imagen Adjunta">
    <h3 style="text-align: center;">Solicitud de Carta Permiso Competencias Internacionales</h3>
    <div style="text-align: right;margin:3rem;">Fecha de solicitud: ${competencia.date.slice(0,10)} ${competencia.date.slice(11,19)}</div>
    <div style="padding: 0 5%;">
      <table style="border: 1px solid gray; border-radius: 10px;width: 100%;padding: 1rem;margin: 1rem;">
        <tr>
          <td style="font-weight: bold;">Nombre</td>
          <td>${user.nombre}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Apellido Paterno</td>
          <td>${user.apellido_paterno}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Apellido Materno</td>
          <td>${user.apellido_materno}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Fecha de Nacimiento:</td>
          <td>${user.fecha_nacimiento} (Edad al 1 de Julio ${fechaActual.getFullYear()} : ${edad} años)</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Correo:</td>
          <td>${user.correo}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Asociacion a la que pertenece:</td>
          <td>${user.asociacion.abreviacion}</td>
        </tr>
      </table>
      <table style="border: 1px solid gray; border-radius: 10px;width: 100%;padding: 1rem; margin: 1rem;">

        <tr>
          <td style="font-weight: bold;">Competencia</td>
          <td>${competencia.nombreCompetencia}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Domicilio</td>
          <td>${competencia.domicilioCompetencia}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Ciudad</td>
          <td>${competencia.ciudadEstadoCompetencia}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Fechas del evento</td>
          <td>${competencia.fechaInicialCompetencia} al ${competencia.fechaFinalCompetencia}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Nivel en el que competirá</td>
          <td>${competencia.nivelCompeticion}</td>
          <td style="font-weight: bold;">Nivel Aprobado</td>
          <td>${user.nivel_actual}</td>
        </tr>
        <tr >
          <td style="font-weight: bold;">Comentarios</td>
          <td>${competencia.comentariosCompetencia}</td>
        </tr>
        <tr>
        <td style="font-weight: bold;">Folio de solicitud</td>
        <td>${folio}</td>
        </tr>
      </table>
      <p>Te pedimos validar que hayas seleccionado el Nivel correcto en el que deseas competir. En el caso de existir alguna modificación, solamente tendras que volver a realizar este proceso de Solicitud de Permiso para generar una nueva solicitud con los datos correctos</p>
      <p>Certifico que la información señalada es verdadera y correcta hasta mi más leal saber y entender.Acepto lois puntos de la Convocatoria y del Reglamento de Competencia.</p>
      <p>En caso de que esta solicitud sea autorizada, me comprometo a compartir los resultados de la competencia vía correo electrónico al correo : resultados@femepashidi.com.mx</p>

    </div>



  </div>
</body>
</html>
  `

}

const mailParticipanteAceptacion=({ competencia, user})=>{

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;800&family=Rubik+Maps&display=swap');
    :root{
      --primary-color-r:#268dee;
      --background-input:#f0f0f0;
      --font-input:#333;
    }
    body{
      font-family: 'Nunito', sans-serif;
    }

    .container{
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
    }

      </style>
</head>
<body>
  <div class="" style="text-align: justify;">
  <img style="width: 90%;" src="cid:encabezadoImg" alt="Imagen Adjunta">
    <h2 style="
    color:#268dee;">${user.nombre.toUpperCase()} </h2>
    <p style="color:#333; text-align: justify;">Le informamos que su solicitud adjunta para competir INternacionalmente en el torneo <span style="font-weight: bold"> ${competencia.nombreCompetencia} </span> en el nivel : <span style="font-weight: bold"> ${competencia.nivelCompeticion}</span> ha sido <span style="font-weight: bold">APROBADA</span></p>
    <p style="color:#333; text-align: justify;">Adjunto a este correo encontrará la Carta Permiso solicitada</p>
    <p style="color:#333; text-align: justify;">Le recordamos que deberá compartir sus resultados de la competencia vía correo electrónico a:<a href="mailto:resultados@femepashidi.com.mx">resultados@femepashidi.com.mx</a>. </p>

    <p style="
    color:#333; ">Saludos,</p>
    <p style="
    color:black; text-align: justify;">Federación Mexicana de Patinaje Sobre Hielo y Deportes de Invierno,A.C.</p>
    <a href="https://www.femepashidi.com.mx/inicio">https://www.femepashidi.com.mx/inicio/</a>
  </div>
</body>
</html>
  `

}

module.exports = {mailParticipanteInicio,mailPresidenteInicio,mailPresidenteFemepashidi,mailParticipanteAceptacion}
