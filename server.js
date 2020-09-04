require('dotenv').config(); 
const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}); 
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database successfully connected'));



 
app.listen(9001, () => console.log('Server started'));