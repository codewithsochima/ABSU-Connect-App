const express = require('express')

const app = express();

const PORT = 3000;

app.get('/', (req,res) =>{
    res.send('Welcome to ABSU Connect API');
});

app.listen(PORT, () => {
    console.log(`ABSU Connect server is running on port ${PORT}`)
});