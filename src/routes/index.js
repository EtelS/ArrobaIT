const { Router } = require('express');
const nodemailer = require('nodemailer');
const router= Router();



router.post('/sendmail', async  (req, res)=>{
    const {name, direccion, barrio, coord_gps, telefono, tel_alt, email, planta, velocidad}= req.body;
    

    contentHTML=`
        <h1> Información de Contacto </h1>
        <ul>
            <li>Nombre: ${name}</li>
            <li>Dirección: ${direccion}</li>
            <li>Barrio: ${barrio}</li>
            <li>GPS: ${coord_gps}</li>
            <li>Teléfono: ${telefono}</li>
            <li>Teléfono alternativo: ${tel_alt}</li>
            <li>E-mail: ${email}</li>
            <li>Casa de: ${planta}</li>
            <li>Velocidad de conexión: ${velocidad}</li>
        </ul>
    `;
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT_MAIL,
        secure: false,
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.PASS_MAIL
        },
        tls:{
            rejectUnauthorized:false
        }
    })
    const info= await transporter.sendMail({
        from: process.env.FROM_MAIL,
        to: process.env.TO_MAIL,
        subject: process.env.SUBJECT_MAIL,
        html: contentHTML
    });

    res.send(console.log('success'));

})

module.exports= router;