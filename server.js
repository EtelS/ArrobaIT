const express= require ('express');
const app= express();
const nodemailer = require('nodemailer');
require('dotenv').config();
const PORT = process.env.PORT || 5000;


//middleware
app.use(express.static('public'))
app.use(express.json());

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})
app.post('/', (req, res) => {
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
        // host: process.env.HOST,
        // port: process.env.PORT_MAIL,
        // secure: false,
        service:"Hotmail",
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.PASS_MAIL
        },
        tls:{
            rejectUnauthorized:false
        }
    })
    const mailOptions = {
        from: process.env.USER_MAIL,
        to: process.env.TO_MAIL,
        subject: 'Contacto desde página web',
        html: contentHTML
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            console.log(error);
            res.send('error');
        }else{
            console.log('succes')
            res.send('success')
        }
        })
})

app.listen(PORT, ()=>{
    console.log( `Server running on port ${PORT}`)
})