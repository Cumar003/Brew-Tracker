import { Schema, Document, model, ObjectId, Types } from "mongoose";

interface ILog extends Document {
  drink_id: ObjectId;
  user_id: ObjectId;
  amount: number;
  was_last: boolean;
}

const logsSchema = new Schema<ILog>(
  {
    drink_id: { type: Types.ObjectId, ref: "Drink" },
    user_id: { type: Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    was_last: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Log = model<ILog>("Log", logsSchema);

export { Log, ILog };
