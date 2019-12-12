const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');


//Midlewares
app.use(cors())
app.use(bodyParser.json());

//Import routes
const postRoutes = require('./routes/posts');

app.use('/posts', postRoutes);


//Routes
app.get('/', (req, res) => {
    res.send('Home path');
});


//Connect to DB 
mongoose.connect(
    process.env.DB_CONECT, 
    { useNewUrlParser: true,
    useUnifiedTopology: true},
    ()=> console.log('connected')
);
//App listening
app.listen(3000);
