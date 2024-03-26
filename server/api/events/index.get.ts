import { Schema, model } from "mongoose";
import { Event } from "../../../models/event"

export default defineEventHandler(async () => {
    const events = await Event.find();
    return {
        events
    }
})