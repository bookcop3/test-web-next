import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    post: {
      name: { type: String, required: true },
      category: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true, default: 0 },
    },
    post2: {
      name: { type: String, required: true },
      adress: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
