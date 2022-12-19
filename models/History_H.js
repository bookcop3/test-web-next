import mongoose from 'mongoose';

const history_HSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postp: {
      name: { type: String, required: true },
      category: { type: String, default: 'home' },
      status_p: { type: String, required: true },
      status_o: { type: String, required: true },
      receive_m: { type: String, required: true },
      price_type: { type: String, required: true },
      price: { type: Number, required: true, default: 0 },
      price_h: { type: Number, required: true, default: 0 },
    },
    postp2: {
      area_p: { type: String, required: true, default: 0 },
      floor: { type: String, required: true },
      room_b: { type: Number, required: true },
      room_t: { type: Number, required: true },
      details: { type: String, required: true },
      image: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const History_H =
  mongoose.models.History_H || mongoose.model('History_H', history_HSchema);
export default History_H;
