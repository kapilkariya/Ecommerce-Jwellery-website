import express from "express";
import {singleproductinfo, addproduct,removeproduct,listproduct} from '../controlers/productcontroller.js'
import upload from "../middleware/multer.js";
import adminauth from "../middleware/adminauth.js";

const productrouter= express.Router();
productrouter.post('/add',adminauth,upload.fields([{name:'image1' , maxCount:1},{name:'image2' , maxCount:1},{name:'image3' , maxCount:1},{name:'image4' , maxCount:1}]),addproduct);
productrouter.post('/remove',removeproduct);
productrouter.post('/single',singleproductinfo);
productrouter.get('/list',listproduct)

export default productrouter;