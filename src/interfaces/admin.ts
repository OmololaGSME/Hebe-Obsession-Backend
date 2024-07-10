import { Model } from "mongoose"

interface IAdmin {
    email: string,
    password: string,
}

export type AdminModel = Model<IAdmin>

export default IAdmin;