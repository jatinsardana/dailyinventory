import express from "express";
import products from "../Models/Products.js";

const router = express.Router();

router.post("/insertproduct", async (req, res) => {
  const { ProductName, ProductPrice, ProductCode } = req.body;

  try {
    const pre = await products.findOne({ ProductCode });
    if (pre) {
      return res.status(422).json("Product is already added.");
    }

    const addProduct = new products({ ProductName, ProductPrice, ProductCode });
    await addProduct.save();
    res.status(201).json(addProduct);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const getProducts = await products.find({});
    res.status(200).json(getProducts);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const getProduct = await products.findById(req.params.id);
    if (!getProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(getProduct);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/updateproduct/:id", async (req, res) => {
  const { ProductName, ProductPrice, ProductCode } = req.body;

  try {
    const updateProducts = await products.findByIdAndUpdate(
      req.params.id,
      { ProductName, ProductPrice, ProductCode },
      { new: true }
    );
    if (!updateProducts) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updateProducts);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const deleteProduct = await products.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(deleteProduct);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
