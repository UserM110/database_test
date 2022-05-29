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

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userModel.getMany();
            res.json({status: "success", data: users, message: "retrival was successful"});
        } catch (error) {
            next(error)
            
        }
    };

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.getOne(req.params.id as unknown as string);
        res.json({status: "success", data: user, message: "retrival was successful"});
    } catch (error) {
        next(error)
        
    }
};

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.updateOne(req.body);
        res.json({status: "success", data: user, message: "successful updating"});
    } catch (error) {
        next(error)
        
    }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.deleteOne(req.params.id as unknown as string);
        res.json({status: "success", data: user, message: "Deleting Done"});
    } catch (error) {
        next(error)
        
    }
};