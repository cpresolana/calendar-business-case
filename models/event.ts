import { Schema, model } from "mongoose";

export const EventSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: [true, "Il titolo è richiesto"],
    },
    start: {
        type: String,
        required: [true, "La data di inizio è richiesta"],
        validate: {
            validator: checkStartDate,
            message: "La data di inizio deve essere precedente alla data di fine"
        }
    },
    end: {
        type: String,
        required: [true, "La data di fine è richiesta"],
        validate: {
            validator: checkEndDate,
            message: "La data di fine deve essere successiva alla data di inizio"
        }
    },
})
function checkStartDate(value: any) {
    if (value && this.start) {
        return new Date(value) < new Date(this.end);
    }
}

function checkEndDate(value: any) {
    if (value && this.start) {
        return new Date(value) >= new Date(this.start);
    }
}

export const Event = model<any>('Event', EventSchema);