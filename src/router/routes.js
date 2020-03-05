import app from '../server/server';
import authController from '../router/authRouter';
import usuarioRouter from '../router/usuarioRouter';
import proyectoRouter from '../router/proyectoRouter';
import tareaRouter from '../router/tareaRouter';

app.use('/api/auth', authController);
app.use('/api/usuario', usuarioRouter);
app.use('/api/proyecto', proyectoRouter);
app.use('/api/tarea', tareaRouter);