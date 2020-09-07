require('dotenv').config(); 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

const albumRouter = require('./routes/albums');
const indexRouter = require('./routes/index');

app.use('/albums', albumRouter);
app.use(expressLayouts);
app.use('/', indexRouter);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(express.static(__dirname + '/public'));


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

app.listen(7788, () => console.log('Server started'));