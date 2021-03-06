import { Router } from "express";
import * as control from '../../control/users.control';


const routes = Router();

routes.route('/')
.get(control.getMany)
.post(control.create);

routes.route('/:id')
.get(control.getOne)
.patch(control.updateOne)
.delete(control.deleteOne);




export default routes;