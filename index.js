const express = require('express');


const APP = express();
const PORT = process.env.PORT || 3001;

APP.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`);
})

