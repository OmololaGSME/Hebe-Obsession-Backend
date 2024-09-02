import mongoose, { Schema } from "mongoose";
import IPic, { PicModel } from "../interfaces/gallery";

const imageSchema = new Schema<IPic, PicModel>({
    photo: { type: String, required: true },
    imageId: { type: String, required: true },
}, { timestamps: true });

const Pic = mongoose.model<IPic, PicModel>('Pic', imageSchema);
export default Pic;