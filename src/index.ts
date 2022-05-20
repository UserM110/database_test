import express, {Application, Request, Response} from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import erroMiddleware from './middleware/error.middleware';

const PORT = 3000;
//server
const app: Application = express();
//middleware
app.use(express.json());
//http
app.use(morgan('common'));
//security
app.use(helmet())

//routing
app.get('/', (req: Request, res: Response) => {
    throw new Error("Error");
    res.json({
        message: "Hello World",
    });
});
//post
app.post('/', (req: Request, res: Response) => {res.json({
    message: "Hello World",
    data: req.body,
});
});
app.use(erroMiddleware);

app.use((_req: Request, res:Response) => {
    res.status(404).json({
        message: 'Oh Error try again'
    });
});

app.listen(PORT, () => {console.log(`Server is starting at prot:${PORT}`);
});


export default app;