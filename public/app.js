
const contactoFormulario= document.querySelector('#formulario')

contactoFormulario.addEventListener('submit', (e)=>{
    
    e.preventDefault();
    document.getElementById("formcontact").textContent="aguarde por favor"
    let datosformulario= {
        name: name.value,
        direccion: direccion.value,
        barrio: barrio.value,
        gps: gps.value,
        telefono: telefono.value,
        tele_alt: tele_alt.value,
        email:email.value
        // planta: planta.value,
        // velocidad: velocidad.value
    }
      
    let xhr= new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload= function(){
        if (xhr.responseText == 'success'){
            document.getElementById("formcontact").textContent="Mensaje enviado!"
        }else{
            document.getElementById("formcontact").textContent="Reintente por favor"
        }
    }
    xhr.send(JSON.stringify(datosformulario));
})