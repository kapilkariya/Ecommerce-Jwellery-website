import React, { useState, useRef } from "react";
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  // const quillRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("Rings");
  const [subCategory, setsubCategory] = useState("Antitarnish");
  const [bestseller, setbestseller] = useState(false);
  const [sizes, setsizes] = useState([]);
  const [quant,setquant]=useState({
    S:0,
    M:0,
    L:0,
    XL:0,
  })

  const generatecontent = async () => {
    if (!name && !description) return toast.error('please enter title or description')
    try {
      setLoading(true)
      const { data } = await axios.post(backendURL + '/api/product/generate', { prompt: name }, { headers: { token } })
      if (data.success) {
        setdescription(data.content)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    finally { setLoading(false) }
  }

  const onsubmithandler = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    setLoading(true);

    try {
      const formdata = new FormData()
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("price", price);
      formdata.append("category", category);
      formdata.append("subCategory", subCategory);
      formdata.append("bestseller", bestseller);
      formdata.append("sizes", JSON.stringify(sizes));
      formdata.append("quant",JSON.stringify(quant))
      formdata.append("date", Date.now());

      image1 && formdata.append("image1", image1)
      image2 && formdata.append("image2", image2)
      image3 && formdata.append("image3", image3)
      image4 && formdata.append("image4", image4)

      const response = await axios.post(backendURL + "/api/product/add", formdata, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setimage1(false);
        setimage2(false);
        setimage3(false);
        setimage4(false);
        setname("");
        setdescription("");
        setprice("");
        setbestseller(false)
        setsizes([])
      }
      else {
        toast.error(response.data.message)
        console.log(response.data.message)
      }
    }
    catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onsubmithandler} action="">
      <div className='p-8'>
        <p>Upload Images</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? 'uploadarea.png' : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setimage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? 'uploadarea.png' : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setimage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? 'uploadarea.png' : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setimage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? 'uploadarea.png' : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setimage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>
      <div className="px-8 max-w-4xl mx-auto  rounded-lg space-y-6 ">
        <div>
          <label htmlFor="productName" className="block text-base font-medium text-gray-800 mb-2">Product name</label>
          <input onChange={(e) => setname(e.target.value)} value={name} id="productName" type="text" placeholder="Type here" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150" />
        </div>

        <div>
          <label htmlFor="productDescription" className="block text-base font-medium text-gray-800 mb-2">Product description</label>
          <textarea onChange={(e) => setdescription(e.target.value)} value={description} id="productDescription" placeholder="Write content here" rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-y transition duration-150"></textarea>
          <button
            type='button'
            disabled={loading}
            onClick={generatecontent}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 whitespace-nowrap flex-shrink-0 h-fit self-start mt-2"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div>
            <label htmlFor="productCategory" className="block text-base font-medium text-gray-800 mb-2">Product category</label>
            <div className="relative">
              <select onChange={(e) => setcategory(e.target.value)} id="productCategory" className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-10 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none cursor-pointer transition duration-150" defaultValue="Women">
                <option value="Rings">Rings</option>
                <option value="Necklace">Necklace</option>
                <option value="Bangles">Bangles</option>
                <option value="Mangalsutra">Mangalsutra</option>
                <option value="Bracelet">Bracelet</option>
                <option value="Earrings">Earrings</option>
                <option value="Sets">Sets</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="subCategory" className="block text-base font-medium text-gray-800 mb-2">Sub category</label>
            <div className="relative">
              <select onChange={(e) => setsubCategory(e.target.value)} id="subCategory" className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-10 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none cursor-pointer transition duration-150" defaultValue="Topwear">
                <option value="Antitarnish">Anti-Tarnish</option>
                <option value="Americand">American Diamond</option>
                <option value="Rajwadi">Rajwadi</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="productPrice" className="block text-base font-medium text-gray-800 mb-2">Product Price</label>
            <input onChange={(e) => setprice(e.target.value)} value={price} id="productPrice" type="Number" placeholder="25" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150" />
          </div>
        </div>
      </div>
      <div className='px-8 py-5'>
        <p className='mb-2'> Product Sizes</p>
        <div className='flex gap-3'>
          <div >
            <p onClick={() => setsizes((prev) => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])} className={`${sizes.includes("S") ? "bg-gray-500" : "bg-gray-300"}  w-10 h-10 flex justify-center items-center  cursor-pointer`} >S</p>
            <input value={quant.S} onChange={(e)=>setquant(prev=>({...prev,S:Number(e.target.value)}))} className={`${sizes.includes("S")?'':'hidden'} border w-10 h-10 my-4 border-black text-center `} type="text" />
          </div>
          <div >
            <p onClick={() => setsizes((prev) => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])} className={`${sizes.includes("M") ? "bg-gray-500" : "bg-gray-300"}  w-10 h-10 flex justify-center items-center  cursor-pointer`} >M</p>
            <input value={quant.M} onChange={(e)=>setquant(prev=>({...prev,M:Number(e.target.value)}))} className={`${sizes.includes("M")?'':'hidden'} border w-10 h-10 my-4 border-black text-center`} type="text" />
          </div>
          <div >
            <p onClick={() => setsizes((prev) => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])} className={`${sizes.includes("L") ? "bg-gray-500" : "bg-gray-300"}  w-10 h-10 flex justify-center items-center  cursor-pointer`} >L</p>
            <input value={quant.L} onChange={(e)=>setquant(prev=>({...prev,L:Number(e.target.value)}))} className={`${sizes.includes("L")?'':'hidden'} border w-10 h-10 my-4 border-black text-center`} type="text" />
          </div>
          <div >
            <p onClick={() => setsizes((prev) => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])} className={`${sizes.includes("XL") ? "bg-gray-500" : "bg-gray-300"}  w-10 h-10 flex justify-center items-center  cursor-pointer`} >XL</p>
            <input value={quant.XL} onChange={(e)=>setquant(prev=>({...prev,XL:Number(e.target.value)}))} className={`${sizes.includes("XL")?'':'hidden'} border w-10 h-10 my-4 border-black text-center`} type="text" />
          </div>
        </div>
      </div>
      <div className='px-8 py-3 flex gap-2'>
        <input onChange={() => setbestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}


      <div className='flex justify-center mb-10 '>
        <button type='submit' className='py-2 px-15 active:bg-gray-700  bg-black text-white' >ADD</button>
      </div>

    </form>
  )
}

export default Add
