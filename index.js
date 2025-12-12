import express from 'express';
// const express = require('express');
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routerAPI from './routes/index.js';
import path from 'path';
import fs from "fs"
// const dotenv = require('dotenv');
import cors from 'cors';
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use(cors({
  origin: ["https://frontend-phi-blond-39.vercel.app"],
  credentials: true
}));

dotenv.config();
const urldb = process.env.URI_DB;

mongoose.connect(urldb);
const db = mongoose.connection;

db.on('error', ()=> {
    console.error('error de conexión');
})
db.once('open', ()=> {
    console.log('conexión con el db 👍');
})


app.use('/api', express.static('public'));
// app.get("/api/variedades", (req, res) => {
//   const filePath = path.resolve("./public/html/variedades.html");

//   fs.readFile(filePath, "utf-8", (err, data) => {
//     if (err) {
//       res.status(500).send("Error al cargar el archivo");
//     } else {
//       res.send(data);
//     }
//   });
// });//agrego un html con el nombre "variedades" y me levanta esa pagina!!!!!!
// app.use('/api/variedad', express.static('public'));
// app.use('/api/tiendas', express.static('public'));//agrego un html con el nombre favoritos y me levanta esa pagina!!!!!
app.get ('/', (request, response )=> {
    response.send('<h1> API REST </h1>');
})
routerAPI(app);
app.listen(PORT, () => {
    console.log(`api rest en el puerto ${PORT}`);
})

console.log('PORT desde .env:', PORT);
