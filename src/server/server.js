import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

let app = express();

// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
app.use(express.json({extended: true}));

app.use(cors());

export default app;