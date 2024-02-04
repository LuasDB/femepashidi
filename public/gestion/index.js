/****************************************************************************************************************
 * funciones para facilitar el llamado a elementos del DOM
 * ***********************************************************************************************************/
const $ = (elemento)=> document.querySelector(elemento); 
const $a = (elemento)=> document.querySelectorAll(elemento); 
const n = (elemento)=> document.getElementById(elemento);
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
 * Funciones para mandar a llamar a construir en el monitor
 ***********************************************************************************************************/
const callPatinadoresList = ()=>{
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>FUBM901026HDFNRR07</td>
              <td>MARIO SAUL DE LA FUENTE BARRUETA</td>
              <td>INTERMEDIO</td>
              <td>26-10-1990</td>
              <td>CDMX</td>
              <td><span class="material-symbols-outlined">
                visibility
                </span></td>
            </tr>
             
          </tbody>
        </table>
        
    
    
      </section>`;
      n('nuevo-patinador').onclick = ()=> nuevoRegistro('patinador');
}
const callAsociacionesList = ()=>{
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
          <tbody>
            <tr>
              <td>Nombre de la asociacion</td>
              <td>Lic. Francisco Garcia Villanueva</td>
              <td>francisco.garcia@correo.com</td>
              <td class="activo"><p>Activo</p></td>
              <td class="blue"><span class="material-symbols-outlined">
                edit
                </span></td>
              <td class="red"><span class="material-symbols-outlined">
                delete
                </span></td>
            </tr>
             
          </tbody>
        </table>
      </section>`;
      n('nuevo-asociacion').onclick = ()=> nuevoRegistro('asociacion');

}
const callSolicitudesList = ()=>{
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
          <tbody>
            <tr>
              <td>FUBM901026HDFNRR07</td>
              <td>MARIO SAUL DE LA FUENTE BARRUETA</td>
              <td>INTERMEDIO</td>
              <td>NOMBRE DE COMPETENCIA</td>
              <td class="inscrito"><p>INSCRIPCION</p></td>
              <td class="blue"><span class="material-symbols-outlined">
                visibility
                </span></td>
            </tr>
            <tr>
              <td>ECOJ901026HDFNRR07</td>
              <td>OSCAR JAVIER ENRIQUEZ CRESPO</td>
              <td>INTERMEDIO</td>
              <td>NOMBRE DE COMPETENCIA</td>
              <td class="aprobado"><p>APROBADO</p></td>
              <td class="blue"><span class="material-symbols-outlined">
                visibility
                </span></td>
            </tr>
            <tr>
              <td>RBDS901026HDFNRR07</td>
              <td>DANIEL SAMUEL REYES BAUTISTA</td>
              <td>INTERMEDIO</td>
              <td>NOMBRE DE COMPETENCIA</td>
              <td class="registrado"><p>REGISTRADO</p></td>
              <td class="blue"><span class="material-symbols-outlined">
                visibility
                </span></td>
            </tr>
             
          </tbody>
        </table>
      </section>`;
}
const callEventosList = ()=>{
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
          <tbody>
            <tr>
              <td>EVENTO 1</td>
              <td>28 DE FEBRERO 2024</td>
              <td>CIUDAD DE MÉXICO, A.OREGÓN</td>
              <td class="activo"><p>Activo</p></td>
              <td class="blue"><span class="material-symbols-outlined">
                edit
                </span></td>
              <td class="red"><span class="material-symbols-outlined">
                delete
                </span></td>
            </tr>
            <tr>
                <td>EVENTO 2</td>
                <td>15 DE FEBRERO 2024</td>
                <td>CIUDAD DE MÉXICO, A.OREGÓN</td>
                <td class="pausa"><p>Pausa</p></td>
                <td class="blue"><span class="material-symbols-outlined">
                  edit
                  </span></td>
                <td class="red"><span class="material-symbols-outlined">
                  delete
                  </span></td>
              </tr>
             
          </tbody>
        </table>
      </section>`;
    n('nuevo-evento').onclick = ()=> nuevoRegistro('evento');
    
}
const callComunicadosList = ()=>{
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
          <tbody>
            <tr>
              <td>TITULO DEL COMUNICADO</td>
              <td>https://images.pexels.com/photos/6015846/pexels-photo-6015846.jpeg?auto=compress&cs=tinysrgb&w=600</td>
              <td>Breve descripcion</td>
              <td class="activo"><p>Activo</p></td>
              <td class="blue"><span class="material-symbols-outlined">
                edit
                </span></td>
              <td class="red"><span class="material-symbols-outlined">
                delete
                </span></td>
            </tr>
            <tr>
                <td>TITULO DEL COMUNICADO</td>
                <td>https://images.pexels.com/photos/6015846/pexels-photo-6015846.jpeg?auto=compress&cs=tinysrgb&w=600</td>
                <td>Breve descripcion</td>
                <td class="activo"><p>Activo</p></td>
                <td class="blue"><span class="material-symbols-outlined">
                  edit
                  </span></td>
                <td class="red"><span class="material-symbols-outlined">
                  delete
                  </span></td>
              </tr>
             
          </tbody>
        </table>
      </section>`;
      n('nuevo-comunicado').onclick = ()=> nuevoRegistro('comunicado');
    
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
