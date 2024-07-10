import mongoose, { Schema, Model } from "mongoose";
import IAdmin from "../interfaces/admin";
import { AdminModel } from "../interfaces/admin";


const adminSchema = new Schema<IAdmin, AdminModel>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

const Admin = mongoose.model<IAdmin, AdminModel>('Admin', adminSchema);
export default Admin;