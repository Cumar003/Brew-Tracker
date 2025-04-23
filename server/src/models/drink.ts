import { Schema, Document, model } from "mongoose";

interface IDrink extends Document {
  name: string;
  price: number;
  image: Buffer;
}

const drinkSchema = new Schema<IDrink>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Buffer },
});

const Drink = model<IDrink>("Drink", drinkSchema);

export { Drink, IDrink };
