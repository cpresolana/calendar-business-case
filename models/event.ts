import { Schema, model } from "mongoose";

export const EventSchema = new Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
    },
    start: {
        type: String
    },
    end: {
        type: String
    },
})

export const Event = model<any>('Event', EventSchema);