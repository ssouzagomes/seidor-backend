import fs from "fs";
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { User, UserTypes } from "../../types/user.types";
import AppError from "../../exceptions/generic.exception";
import { registerUserValidation } from "../../validations/user.validations";

export namespace RegisterUserService {
  export const execute = async (model: UserTypes.RegisterParams) => {
    const { name } = await registerUserValidation.parseAsync(model);

    const filePath = path.resolve('./src/database', 'data.json');
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    const users = data.users as User[] || []

    const userExist = users.find((user) => user.name.toLowerCase() === name.toLowerCase())

    if (userExist) {
      throw new AppError('USER_ALREADY_EXIST', 400)
    }

    const user = {
      id: uuidv4(),
      name
    };

    users.push(user)

    const newData = {
      ...data,
      users
    }

    const jsonData = JSON.stringify(newData, null, 2); 

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) throw err;
    });

    return user
  };
}
