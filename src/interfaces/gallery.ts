import { Model } from "mongoose"
interface IPic {
    photo: string,
    imageId: string
}

export type PicModel = Model<IPic>;

export default IPic;