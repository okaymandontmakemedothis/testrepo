import { Document, model, Schema } from 'mongoose';

export interface IDrawing extends Document {
    name: string;
    tags: string[];
}

const DrawingSchema: Schema = new Schema({
    name: { type: String, required: true },
    tags: [String],
});

export default model<IDrawing>('Drawing', DrawingSchema);
