import express, {Application, Request, Response} from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import erroMiddleware from './middleware/error.middleware';
import config from './config';
//import db from './database';

const PORT = config.port || 3000;
//server
const app: Application = express();
//middleware
app.use(express.json());
//http
app.use(morgan('common'));
//security
app.use(helmet());

app.use('/api', routes);


//routing
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "Hello World",
    });
});

/*//post
app.post('/', (req: Request, res: Response) => {res.json({
    message: "Hello World",
    data: req.body,
});
});*/

/*test connection
db.connect().then(client => {
    return client.query('SELECT NOW()').then(res => {
        client.release();
        console.log(res.rows);
    })
    .catch(err => {
        client.release();
        console.log(err.stack)
    });
});*/

app.use(erroMiddleware);

app.use((_req: Request, res:Response) => {
    res.status(404).json({
        message: 'Error try again'
    });
});

app.listen(PORT, () => {console.log(`Server is starting at prot:${PORT}`);
});


export default app;