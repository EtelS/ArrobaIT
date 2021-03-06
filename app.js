
const contactoFormulario= document.querySelector('#formulario')



contactoFormulario.addEventListener('submit', (e)=>{
    
    e.preventDefault();
    document.getElementById("formcontact").textContent="Se está enviando el correo, aguarde..."
    let datosformulario= {
        name: nombre.value,
        direccion: direccion.value,
        barrio: barrio.value,
        gps: gps.value,
        telefono: telefono.value,
        tele_alt: tele_alt.value,
        email:email.value,
        una_planta: unapl.checked,
        dos_plantas: dospl.checked,
        tres_mb: tresmb.checked,
        seis_mb: seismb.checked,
        diez_mb: diezmb.checked,
        diezdiez: diezdiez.checked
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