import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: 'variables.env'});

const conectarDB = async () => {
    try{

        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log('DB conectada');
    }
    catch(error){
        console.log(error);
        // Detiene la app
        process.exit(1);
    }
}

export default conectarDB;