import { Nitro } from "nitropack";
import mongoose from "mongoose";

export default async (_nitroApp: Nitro) => {
    const config = useRuntimeConfig();
    try {
        await mongoose.connect('mongodb://localhost:27017/nitro');
    } catch (e) {
        console.error(e);
    }
};