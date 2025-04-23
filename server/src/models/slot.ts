import { Schema, ObjectId, model } from "mongoose";

interface ISlot extends Document {
    id: string;
    drink_id: ObjectId;
    occupied: boolean;
    updated_last: Date;
  }
  
  const slotSchema = new Schema<ISlot>({
    id: { type: String, required: true },
    drink_id: { type: Schema.Types.ObjectId, ref: 'Drink', required: true },
    occupied: { type: Boolean, default: false },
    updated_last: { type: Date, default: Date.now },
  });
  
  const Slot = model<ISlot>('Slot', slotSchema);
  
  export { Slot, ISlot };
  