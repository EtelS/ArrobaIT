const express= require('express');
const app= express();
const path= require('path');
require('dotenv').config()

const port= process.env.PORT || 3000

app.use(express.urlencoded({extended: false}));
app.use(require('./routes/index'));
app.use(express.static(path.join(__dirname, '/public' )))
app.listen(port, ()=>{
    console.log(`Server on port ${port}`);
});
