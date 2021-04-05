import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs";

export const genUUID = (): string => uuidv4();

export const timeUnits = {
    SECOND: 1000,
    MINUTE: 1000 * 60,
    HOUR: 1000 * 60 * 60,
    DAY: 1000 * 60 * 60 * 24
}

export const hashPassword = async (saltRounds = 10, password): Promise<string> => {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) reject(err);
            resolve(hash)
        });
    });
};

export const verifyPassword = async (password, hashedPassword): Promise<boolean> => {
    return await new Promise(((resolve) => {
        bcrypt.compare(password, hashedPassword, (err, success) => {
            if (err || !success) resolve(false);
            resolve(true);
        });
    }));
};
