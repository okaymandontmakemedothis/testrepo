import { Document, model, Schema } from 'mongoose';
import { IDrawing } from './drawing';

export interface IDrawingObject extends Document {
    drawingId: IDrawing['_id'];
    type: string;
    objectId: number;
    x: number;
    y: number;
    height: number;
    width: number;
    primaryRGBA: { r: number, g: number, b: number, a: number };
    secondaryRGBA: { r: number, g: number, b: number, a: number };
    pointsList: { x: number, y: number }[];
    strokeWidth: number;
    testureId: number;
    style: string;
}

const DrawingObjectSchema: Schema = new Schema({
    drawingId: [Schema.Types.ObjectId],
    type: { type: String, required: true },
    objectId: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    primaryRGBA: { type: { r: Number, g: Number, b: Number, a: Number }, required: true },
    secondaryRGBA: { type: { r: Number, g: Number, b: Number, a: Number }, required: true },
    pointsList: [{ x: Number, y: Number }],
    strokeWidth: Number,
    testureId: Number,
    style: String,
});

export default model<IDrawingObject>('DrawingObject', DrawingObjectSchema);
