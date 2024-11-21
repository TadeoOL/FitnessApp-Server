import express, { Application } from 'express';
import routes from './routes';
import errorMiddleware from './middleware/error.middleware';

const app: Application = express();

app.use(express.json());
app.use('/api', routes);
app.use(errorMiddleware);

export default app;