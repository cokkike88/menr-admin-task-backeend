import config from './config';
import app from './server/server';
import conectarDB from './db';
import './router/routes';

conectarDB();


app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.listen(config.port, () => {
    console.log(`Server run on port ${config.port}`);
})