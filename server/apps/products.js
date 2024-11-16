import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("product");
  try {
    const product = await collection.find({}).toArray();
    return res.status(200).json({ data: product });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch products.",
    });
  }
});

productRouter.get("/:id", async (req, res) => {
  const collection = db.collection("product");
  const productId = new ObjectId(req.params.id);
  try {
    const product = await collection
      .find({
        _id: productId,
      })
      .toArray();
    return res.status(200).json({ data: product });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch products.",
    });
  }
});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("product");
  const productData = { ...req.body };
  try {
    const product = await collection.insertOne(productData);
    return res.status(201).json({
      message: "Product has been created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Product has been created failed.",
    });
  }
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("product");
  const newProductData = { ...req.body };
  const productId = new ObjectId(req.params.id);
  try {
    const product = await collection.updateOne(
      {
        _id: productId,
      },
      {
        $set: newProductData,
      }
    );
    return res.status(200).json({
      message: "Product has been updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Product has been updated failed.",
    });
  }
});

productRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("product");
  const productId = new ObjectId(req.params.id);
  try {
    const product = await collection.deleteOne({
      _id: productId,
    });
    return res.status(200).json({
      message: "Product has been deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Product has been deleted failed.",
    });
  }
});

export default productRouter;
