import { Model, ObjectId } from "mongoose"

interface IAdmin {
    _id: ObjectId,
    email: string,
    password: string,
}

export type AdminModel = Model<IAdmin>

export default IAdmin;