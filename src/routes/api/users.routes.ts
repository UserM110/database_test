import { Router } from "express";
import * as control from '../../control/users.control';


const routes = Router();

routes.post('/', control.create);





export default routes;