import repo from "@/db/repo";
import { IBaseQueryModel } from "@/models/common";
import bcrypt from "bcryptjs";

const user = {
  getByEmail: async (email: string) => {
    let query: IBaseQueryModel = {
      page: Number(0),
      size: Number(1),
    };
    query.filter = { email: email };

    const result = await repo.find("user", query);
    return result && result.length > 0 ? result[0] : null;
  },
  checkEmailExist: async (email: string) => {
    let query: IBaseQueryModel = {
      page: Number(0),
      size: Number(1),
    };
    query.filter = { email: email };

    const result = await repo.find("user", query);
    return result && result.length > 0;
  },
  create: async (data: any) =>{
    return await repo.insert('user', data)
  },
  login: async (data: any) =>{
    const userExisting = await user.getByEmail(data.email)
    if(!userExisting) return null
    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      userExisting.password
    );
    return isPasswordCorrect ? userExisting : null
  }
};

export default user;
