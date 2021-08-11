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
    const {name, direccion, barrio, coord_gps, telefono, tele_alt, email, una_planta, dos_plantas, tres_mb, seis_mb, diez_mb, diezdiez}= req.body;
    

    contentHTML=`
        <h1> Información de Contacto </h1>
        <ul>
            <li>Nombre: ${name}</li>
            <li>Dirección: ${direccion}</li>
            <li>Barrio: ${barrio}</li>
            <li>GPS: ${coord_gps}</li>
            <li>Teléfono: ${telefono}</li>
            <li>Teléfono alternativo: ${tele_alt}</li>
            <li>E-mail: ${email}</li>
        </ul>
        <h2>Plantas de la casa: </h2>
        <ul>
            <li>Casa de una planta: ${una_planta}</li>
            <li>Casa de dos plantas: ${dos_plantas}</li>
        </ul>
        <h2>Velocidad pedida: </h2>
        <ul>
            <li>3 megas: ${tres_mb}</li>
            <li>seis megas: ${seis_mb}</li>
            <li>diez megas: ${diez_mb}</li>
            <li>10/10 simetricos: ${diezdiez}</li>
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
        from: process.env.FROM_MAIL,
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