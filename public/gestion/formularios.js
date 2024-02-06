/**
 * FORMULARIO DE NUEVO PATINADOR
 */
const formNewUser = `
<form id="users">
<datalist id="list_nivel">
  <option value="Nivel 1">
  <option value="Nivel 2">
  <option value="Nivel 3">
  <option value="Nivel 4">
</datalist>
<datalist id="list_asoc">
  <option value="Asociacion 1">
  <option value="Asociacion 2">
  <option value="Asociacion 3">
  <option value="Asociacion 4">
</datalist>
<section class="card container-form">
  <h3>Datos del deportista</h3>
    <div class="flex-container-input">
      <label for="curp">
        CURP
        <input type="text" id="curp" class="envioDb">
      </label>
    </div>

    <div class="">
      <div class="flex-container-input">
        <label for="nombre"> Nombre
          <input type="text" id="nombre" class="envioDb">
        </label>
        <label for="apellido_paterno"> Apellido paterno
          <input type="text" id="apellido_paterno" class="envioDb">
        </label><label for="apellido_materno"> Apellido materno
          <input type="text" id="apellido_materno" class="envioDb">
        </label>
      </div>
      <div class="flex-container-input">
        <label for="fecha_nacimiento"> Fecha de nacimiento
          <input type="date" id="fecha_nacimiento" class="envioDb">
        </label>
        <label for="lugar_nacimiento"> Lugar de Nacimiento
          <input type="text" id="lugar_nacimiento" class="envioDb">
        </label>
        <label for="sexo"> Sexo
          <select id="sexo" class="envioDb">
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="">--Selecciona--</option selected>
          </select>
        </label>
      </div>
      <div class="flex-container-input">
        <label for="correo"> Correo de contacto
          <input type="text" id="correo" class="envioDb">
        </label>
        <label for="telefono"> Teléfono/whatsapp
          <input type="text" id="telefono" class="envioDb">
        </label>
      </div>
    </div>
    <div class="flex-container-input">
      <label for="nivel_actual"> Nivel Actual
        <input list="list_nivel" id="nivel_actual" class="envioDb">
      </label>
    </div>
    <div class="flex-container-input">
      <label for="asociacion"> Asociacion a la que pertenece
        <input list="list_asoc" id="asociacion" class="envioDb">
      </label>
    </div>
    </form>
    <button id="guardar">Guardar</button>
</section>

`;

const formNewAssociation = `
<section class="card container-form">
<h3>Datos de la asociación</h3>

  <div class="flex-container-input">
    <label for="nombre">
      Nombre
      <input type="text" id="nombre" name="nombre" class="envioDb">
    </label>
  </div>
  <div class="flex-container-input">
    <label for="representante">
      Representante
      <input type="text" id="representante"  name="representante" class="envioDb">
    </label>
  </div>
  <div class="flex-container-input">
    <label for="correo">
      Correo
      <input type="text" id="correo" name="correo" class="envioDb">
    </label>
  </div>
  <div class="flex-container-input">
    <label for="status">
      Status
      <select name="status" id="status" name="status" class="envioDb">
        <option value="Activo">Activo</option>
        <option value="Baja">Baja</option>
      </select>
    </label>
  </div>
  <button id="guardar">Guardar</button>
</section>
`;

const formNewEvent = `
<section class="card container-form">
      <h3>Datos de la competencia</h3>

        <div class="flex-container-input">
          <label for="nombre">
            Nombre
            <input type="text" id="nombre" class="envioDb">
          </label>
        </div>
        <div class="flex-container-input">
          <label for="lugar">
            Lugar
            <input type="text" id="lugar" class="envioDb">
          </label>
        </div>
        <div class="flex-container-input">
          <label for="fecha_corta">
            Fecha
            <input type="date" id="fecha_corta" class="envioDb">
          </label>
        </div>
        <div class="flex-container-input">
          <label for="texto">
            Descripción
            <input type="text" id="texto" class="envioDb">
          </label>
        </div>
        <div class="flex-container-input">
          <label for="status">
            Status
            <select name="status" id="status" class="envioDb">
              <option value="Activo">Activo</option>
              <option value="Baja">Baja</option>
            </select>
          </label>
        </div>
        <button id="guardar">Guardar</button>
    </section>
`;

const formNewCommunication = `
<section class="card container-form">
<h3>Datos del comunicado</h3>

  <div class="flex-container-input">
    <label for="titulo">
      Titulo
      <input type="text" id="titulo" class="envioDb">
    </label>
  </div>
<h3>Descripcion del comunicado</h3>
  <div class="flex-container-input">
    <label for="texto1">
      Texto 1
      <input type="text" id="texto1" class="envioDb"></textarea>
    </label>
  </div>
  <div class="flex-container-input">
    <label for="texto2">
      Texto 2
      <input type="text" id="texto2" class="envioDb"></textarea>
    </label>
  </div>
  <div class="flex-container-input">
    <label for="texto3">
      Texto 3
      <input type="text" id="texto3" class="envioDb"></textarea>
    </label>
  </div>
  <div class="flex-container-input">
    <label for="texto4">
      Texto 4
      <input type="text" id="texto4" class="envioDb"></textarea>
    </label>
  </div>
  <div class="flex-container-input">
    <label for="texto5">
      Texto 5
      <input type="text" id="texto5" class="envioDb"></textarea>
    </label>
  </div>
  <div class="flex-container-input">
    <label for="archivoInput">
      Imagen
      <input type="file" id="archivoInput">
    </label>
  </div>
  <div class="flex-container-input">
    <label for="status">
      Status
      <select name="status" id="status" class="envioDb">
        <option value="Activo">Activo</option>
        <option value="Baja">Baja</option>
      </select>
    </label>
  </div>
  <button id="guardar">Guardar</button>
</section>
`;

const titulos ={
  'users':`Atleta`,
  'register':`Solicitud`
}
