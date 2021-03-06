import db from "../database";
import User from "../types/user.type";
import config from "../config";
import bcrypt from "bcrypt";


const hashPassword = (password: string) => {
    const salt = parseInt(config.salt as string, 10);
    return bcrypt.hashSync(`${password}${config.pepper}`, salt);
}

class UserModel {
    //create
    async create(u: User): Promise<User> {
        try {
            //op con. w DB
            const connection = await db.connect();
            const sql = `INSERT INTO users (email, user_name,first_name, last_name, password)
            values ($1, $2, $3, $4, $5) returning id, email, username, first_name, last_name`;
            
            //query
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPassword(u.password),
            ]);
            //release con.
            connection.release();
            //return
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to create (${u.user_name}): ${(error as Error).message}`);
            
        }
    }
    //get all
    async getMany() : Promise<User[]> {
        try {
            const connection = await db.connect(); 
            const sql = 
            'select id, email, user_name, first_name, last_name from users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;

        } catch (error){
            throw new Error(`Error at retrieving users ${(error as Error).message}`);
        }
    }
    //select
    async getOne(id: string) : Promise<User>{
        try {
            const connection = await db.connect();
            const sql = `SELECT id, email, user_name, first_name, last_name FROM users WHERE id=($1)`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error at retrieving ${id}, ${(error as Error).message}`);
        }
    }
    //update
    async updateOne(u: User) : Promise<User>{
        try {
            const connection = await db.connect();
            const sql = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 
             WHERE id=$6 returning id, email, user_name, first_name, last_name`;
            const result = await connection.query(sql, [u.email, u.user_name, u.first_name, u.last_name, hashPassword(u.password), u.id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error at update: ${u.user_name}, ${(error as Error).message}`);
        }
    }
    //delete
    async deleteOne(id: string): Promise<User> {
        try {
            const connection = await db.connect();
            const sql = `DELETE FROM users WHERE id=($1) RETURNING id, email, user_name, first_name, last_name`;
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error at deleting ${id}, ${(error as Error).message}`);
        }
    }

    //auth
    
}


export default UserModel;