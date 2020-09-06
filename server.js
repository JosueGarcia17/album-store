require('dotenv').config(); 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

app.set('view-engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}); 
const db = mongoose.connection;

db.on('error', (error) => { 
    server.close();
    console.error(error)}
);

db.on('crash', () => {
    server.close();
})

db.once('open', () => console.log('Database successfully connected'));

app.use(express.json());

const albumRouter = require('./routes/albums');

app.use('/albums', albumRouter);

 
app.listen(8000, () => console.log('Server started'));