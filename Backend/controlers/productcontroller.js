import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productmodel.js'
import main from '../config/gemini.js'
// function to add products
const addproduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter((item) => { return item !== undefined })


    console.log(name, description, price, category, subCategory, sizes, bestseller)
    console.log(images)
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url
      }))

    const productdata = {
      name, description, price: Number(price), category, subCategory, sizes: JSON.parse(sizes), bestseller: bestseller === "true" ? true : false, images: imagesUrl, date: Date.now()
    }

    const product = new productModel(productdata);
    await product.save()

    res.json({ success: true, message: "Product added successfully" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
// function to list products
const listproduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products })
  }
  catch (error) {
    res.json({ success: false, message: error.message })
  }
}
// function to remove products
const removeproduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  }
  catch (error) {
    res.json({ success: false, message: error.message })
  }
}
// function to single product info
const singleproductinfo = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await productModel.findById(id);
    res.json({ success: true, product });
  }
  catch (error) {
    res.json({ success: false, message: error.message })
  }
}


//to generate content using gemini

export const generateContent = async (req, res) => {
  try {
    const { prompt1, prompt2 } = req.body;
    const content = await main(
      `Write a 30-40 word ecommerce product description using the product title and short details below.

      Title: "${prompt1}"
      Short description: "${prompt2}"

      Return ONLY the final description text.
      Do NOT add introductions, labels, or extra sentences.`
    );

    res.json({ success: true, content })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export { singleproductinfo, addproduct, removeproduct, listproduct }  