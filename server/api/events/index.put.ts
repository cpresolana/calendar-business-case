import { Schema, model } from "mongoose";
import { Event } from "../../../models/event"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const result = await Event.find(
        {
            $or: [
                { start: { $lte: body.start }, end: { $gte: body.start } },
                { start: { $lte: body.end }, end: { $gte: body.end } },
                { start: { $gt: body.start }, end: { $lt: body.end } }
            ]
        }
    )
    if (await (result).length > 0 && body.start && body.end && body.start < body.end) {
        console.log(result.length)
        throw createError({
            message: "Hai già un appuntamento in questa fascia oraria",
        });
    }

    try {
        await Event.replaceOne({ id: body.id }, body, { runValidators: true });
        return { message: 'Evento Modificato' };
    } catch (e: any) {
        throw createError({
            message: e.message
        });
    }


})