import mongoose from 'mongoose';
import { MONGO_URI } from './config';

const mongooseSchema = new mongoose.Schema({
    ProductName: { type: String, required: true },
  ProductPrice: { type: Number, required: true },
  ProductCode: { type: String, required: true }
});

const Products = mongoose.model("Products", mongooseSchema);

export default Products;
