import { Response, Request, NextFunction} from "express";
import UserModel from "../models/user.model";


const userModel = new UserModel();

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.create(req.body)
        res.json({
            status: "success",
            data: {...user},
            message: "Done",
        }); 
    } catch (error) {
        next(error);
    }
};

export const getMany = async (__: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userModel.getMany();
        } catch (err) {
            next(err)
            
        }
    };
