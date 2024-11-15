import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

//read all product
productRouter.get("/", async (req, res) => {
  try {
    //use products collection from practice-mango database
    const productsCollection = db.collection("products");
    //find all data from collection
    const products = await productsCollection.find({}).toArray();
    //return response
    return res.json({ data: products });
  } catch (error) {
    console.error(error);
  }
});

//create new product
productRouter.post("/", async (req, res) => {
  try {
    //use products collection from practice-mango database
    const productsCollection = db.collection("products");
    //declare valiable to recieve request
    //insert data to collection
    const productsData = { ...req.body };
    await productsCollection.insertOne(productsData);
    //return response
    return res.json({ message: "Product has been created successfully" });
  } catch (error) {
    console.error(error);
  }
});

//update product
productRouter.put("/:productId", async (req, res) => {
  try {
    //use products collection from practice-mango database
    const productsCollection = db.collection("products");
    //declare valiable to recieve productId from client using ObjectId
    const productId = new ObjectId(req.params.productId);
    //declare valiable to recieve request body from client
    const newProductData = { ...req.body };
    //update product
    await productsCollection.updateOne(
      { _id: productId },
      { $set: newProductData }
    );
    //return response
    return res.json({
      message: "Product has been updated successfully",
    });
  } catch (error) {
    console.error(error);
  }
});

//delete product
productRouter.delete("/:productId", async (req, res) => {
  try {
    //use products collection from practice-mango database
    const productsCollection = db.collection("products");
    //declare valiable to recieve productId from client using ObjectId
    //delete product by productId
    const productId = new ObjectId(req.params.productId);
    await productsCollection.deleteOne({
      _id: productId,
    });
    //return response
    return res.json({
      message: "Product has been deleted successfully",
    });
  } catch (error) {
    console.error(error);
  }
});

export default productRouter;
