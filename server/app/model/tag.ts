import { Document, model, Schema } from 'mongoose';

export interface ITag extends Document {
    name: string;
    numberOfUses: number;
}

const TagSchema: Schema = new Schema({
    name: { type: String, required: true },
    numberOfUses: Number,
});

export default model<ITag>('Tag', TagSchema);
