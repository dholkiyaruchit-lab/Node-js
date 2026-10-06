import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      title: { type: String, required: true },
      author: { type: String, required: true },
      ISBN: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      bookImage: { type: [String], required: true },
    },
  },
  {
    timestamp: true,
  },
);
const bookModel = mongoose.model("book",bookSchema);
export default bookModel;