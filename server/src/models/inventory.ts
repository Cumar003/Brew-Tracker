import { Schema, Document, model, ObjectId } from "mongoose";

interface IInventory extends Document {
  drink_id: ObjectId;
  quantity: number;
  updated_at: Date;
}

const inventorySchema = new Schema<IInventory>({
  drink_id: { type: Schema.Types.ObjectId, ref: "Drink", required: true },
  quantity: { type: Number, required: true },
  updated_at: { type: Date, default: Date.now },
});

const Inventory = model<IInventory>("Inventory", inventorySchema);

export { Inventory, IInventory };
