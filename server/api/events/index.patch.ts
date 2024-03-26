import { Schema, model } from "mongoose";
import { Event } from "../../../models/event"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log(body)
    try {
        await Event.findOneAndUpdate({ id: body.id }, body);
        return { message: 'Event Deleted' };
    } catch (e: any) {
        throw createError({
            message: e.message
        });
    }
})

/* export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
        await Event.create(body);
        return { message: 'Event created' };
    } catch (e: any) {
        throw createError({
            message: e.message
        });
    }
}) */
