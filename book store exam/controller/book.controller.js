import httpError from "../middleware/httpError.js";
import bookModel from "../model/book.model.js";
import fs from "fs"

const add = async (req, res, next) => {
  try {
    const { title, author, ISBN, description, price } = req.body;
  
    const bookImage = req.files?.bookImage[0]?.path || null;

    if (!title || !author || !ISBN || !description || !price || !bookImage) {
      return next(new httpError(400, "all fields are required"));
    }

    const book = await bookModel.create({
      title,
      author,
      ISBN,
      description,
      price,
      bookImage: [bookImage],
    });
    res.status(201).json({
      success: true,
      message: "book created successfully",
      book,
    });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};
const getAll = async (req, res, next) => {
  try {
    const books = await bookModel.find({});

    if (!books) {
      return next(new httpError(404, "no books found"));
    }

    res.status(200).json({
      success: true,
      message: "all book data fetched successfully",
      total: books.length,
      books,
    });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};
const getById = async (req, res, next) => {
  try {
    const {id}=req.params;
    const books = await bookModel.findById(id);

    if (!books) {
      return next(new httpError(404, "books not found"));
    }

    res.status(200).json({
      success: true,
      message: "book fetched successfully",
      books,
    });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};
const deleteBook = async (req, res, next) => {
  try {
    const deleteBooks = await bookModel.findByIdAndDelete(id);

    if (!books) {
      return next(new httpError(404, "no books found"));
    }
  const filesToDelete = [deleteBooks.bookImage];

    res.status(200).json({
      success: true,
      message: "all book data fetched successfully",
      deleteBooks,
    });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};
const update = async(req,res,next)=>{
    
}

export default { add,getAll,getById,deleteBook };
