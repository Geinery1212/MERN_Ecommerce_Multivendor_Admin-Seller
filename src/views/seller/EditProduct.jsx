import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminImage from '../../images/admin.jpg';
const EditProduct = () => {
    const categories = [
        {
            id: 1,
            name: 'Sports'
        },
        {
            id: 2,
            name: 'T-shirt'
        },
        {
            id: 3,
            name: 'Pants'
        },
        {
            id: 4,
            name: 'Shorts'
        },
        {
            id: 5,
            name: 'Skirts'
        },
        {
            id: 6,
            name: 'Joggers'
        }
        ,
        {
            id: 5,
            name: 'Socks'
        }
    ];
    const [showCategory, setShowCategory] = useState(false);
    const [category, setCategory] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [allCategories, setAllCategories] = useState(categories);

    const [imageShow, setImageShow] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        discount: '',
        price: '',
        brand: '',
        stock: ''
    });
    const inputHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const categorySearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        if (value) {
            let srcValue = allCategories.filter(element => element.name.toLowerCase().includes(value.toLowerCase()));
            setAllCategories(srcValue);
        } else {
            setAllCategories(categories);
        }
    }   

    const changeImage = (image, files) => {
        if(files.length > 0){
            console.log(image);
            console.log(files)
        }
    }  

    useEffect(() => {
        setFormData({
            name: 'Men´s t-shirt',
            description: 'This is a demos description!',
            discount: 10,
            price: 500,
            brand: 'Koal',
            stock: 43
        });
        setCategory("T-shirt");
        setImageShow([adminImage, adminImage

        ]);
    }, []);

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                <div className='flex justify-between items-center pb-4'>
                    <h1 className='text-[#d0d2d6] text-xl font-semibold'>Edit Product</h1>
                    <Link to={"/seller/dashboard/all-products"} className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm
                    px-7 py-2'>All Product</Link>
                </div>
                <div>
                    <form>
                        {/* product name and brand */}
                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="name">Product Name:</label>
                                <input type="text" name="name" id="name" placeholder='Product Name'
                                    onChange={inputHandler} value={formData.name} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'/>
                            </div>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="nabrandme">Product Brand:</label>
                                <input type="text" name="brand" id="brand" placeholder='Product Brand'
                                    onChange={inputHandler} value={formData.brand} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'/>
                            </div>
                        </div>
                        {/* Product category and stock */}
                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                            <div className='flex flex-col w-full gap-1 relative'>
                                <label htmlFor="category">Product Category:</label>
                                <input type="text" name="category" id="category" placeholder='--select category--'
                                    readOnly onClick={() => setShowCategory(!showCategory)} onChange={inputHandler} value={category}
                                    className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6] w-full'/>
                                <div className={`absolute top-[101%] bg-[#475569] w-full transition-all
                                    ${showCategory ? 'scale-100' : 'scale-0'}`}>
                                    <div className='w-full px-4 py-2 fixed'>
                                        <input type="text" placeholder='Search' className='px-3 py-1 focus:border-slate-500
                                        outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden w-full'
                                            onChange={categorySearch} value={searchValue} />
                                    </div>
                                    <div className='pt-14'></div>
                                    <div className='flex justify-start items-start flex-col h-[200px]'>
                                        {
                                            allCategories.map((item, index) => {
                                                return <span key={index} onClick={() => {
                                                    setShowCategory(false)
                                                    setCategory(item.name)
                                                    setSearchValue('')
                                                    setAllCategories(categories)
                                                }} className={`px-4 py-2 hover:bg-indigo-500 hover:text-white
                                                    hover:shadow-lg w-full cursor-pointer ${category === item.name && 'bg-indigo-500'}`}>{item.name}</span>
                                            })
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="stock">Product Stock:</label>
                                <input type="text" name="stock" id="stock" placeholder='Stock'
                                    onChange={inputHandler} value={formData.stock} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'/>
                            </div>
                        </div>
                        {/* Price and  Discount*/}
                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="price">Price:</label>
                                <input type="number" name="price" id="price" placeholder='Price'
                                    onChange={inputHandler} value={formData.price} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'/>
                            </div>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="discount">Discount:</label>
                                <input type="number" name="discount" id="discount" placeholder='Discount by %'
                                    onChange={inputHandler} value={formData.discount} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'/>
                            </div>
                        </div>
                        {/* description */}
                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="description">Description:</label>
                                <textarea name="description" id="description" onChange={inputHandler} value={formData.description} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' rows={4}></textarea>
                            </div>
                        </div>
                        {/* image */}
                        <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2
                        sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4'>
                            {imageShow.map((img, index) =>
                                <div key={index}>
                                    <label htmlFor={index}>
                                        <img src={img} alt="" />
                                    </label>
                                    <input type="file" id={index} name={index} onChange={(e)=>changeImage(img, e.target.files)} className='hidden'/>
                                </div>)}
                        </div>
                        <button className='bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2'>Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct