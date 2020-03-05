import config from './config';
import app from './server/server';
import conectarDB from './db';
import './router/routes';

conectarDB();


app.get('/', (req, res) => {
    res.send('Hola mundo');
});

const port = process.env.PORT || config.port;

app.listen(port, '0.0.0.0', () => {
    console.log(`Server run on port ${config.port}`);
})