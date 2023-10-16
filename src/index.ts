import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { dbConnected } from './database/db';

import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import roleRouter from './routes/role.route';
import clientRouter from './routes/client.route';
import providerRouter from './routes/provider.route';
import seedRouter from './routes/seed.route';
import serviceRouter from './routes/service.route';
import serviceTypeRouter from './routes/service-type.route';
import chatRouter from './routes/chat.route';

dotenv.config();

const corsOptions = {
	origin: process.env.FRONTEND_URL,
};

const app = express();
//Base de datos
dbConnected();

//Middlewares
// app.use(cors(process.env.NODE_ENV !== 'development' ? corsOptions : {}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
// 	fileUpload({
// 		useTempFiles: true,
// 		tempFileDir: '/tmp/',
// 		createParentPath: true,
// 	})
// );

//Rutas
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/rol', roleRouter);
app.use('/api/client', clientRouter);
app.use('/api/provider', providerRouter);
app.use('/api/seed', seedRouter);
app.use('/api/service', serviceRouter);
app.use('/api/service-type', serviceTypeRouter);
app.use('/api/chatbot', chatRouter);

//Servidor
app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
