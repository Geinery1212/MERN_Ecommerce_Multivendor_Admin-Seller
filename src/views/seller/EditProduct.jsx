import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { get_category } from '../../store/Reducers/categoryReducer';
import { useDispatch, useSelector } from 'react-redux';
import { get_product, messageClear, product_image_update, update_product } from '../../store/Reducers/productReducer';
import { FadeLoader, PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import toast from 'react-hot-toast';
const EditProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.category);
    const { product, loader, errorMessage, successMessage, loader2 } = useSelector(state => state.product);
    // console.log(productId);
    const [showCategory, setShowCategory] = useState(false);
    const [category, setCategory] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [allCategories, setAllCategories] = useState([]);
    const [imageShow, setImageShow] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        discount: '',
        price: '',
        brand: '',
        stock: '',
        category: ''
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
        if (files.length > 0) {
            // console.log(image);
            // console.log(files)
            dispatch(product_image_update({
                oldImage: image,
                newImage: files[0],
                productId
            }));
        }
    }

    const update = (e) => {
        e.preventDefault();
        const obj = {
            name: formData.name,
            description: formData.description,
            discount: formData.discount,
            price: formData.price,
            brand: formData.brand,
            stock: formData.stock,
            category: category,
            productId: productId
        };
        dispatch(update_product(obj));
    }

    useEffect(() => {
        dispatch(get_category({
            searchValue: '',
            perPage: '',
            page: ''
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            setAllCategories(categories);
        }
    }, [categories]);

    useEffect(() => {
        setFormData({
            name: product.name,
            description: product.description,
            discount: product.discount,
            price: product.price,
            brand: product.brand,
            category: product.category,
            stock: product.stock
        });
        setCategory(product.category);
        setImageShow(product.images);
    }, [product]);

    useEffect(() => {
        dispatch(get_product({ productId }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successMessage, errorMessage]);

    return (
        <>
            {loader2 && <div className='w-screen h-screen flex justify-center
            items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
            <div className='px-2 lg:px-7 pt-5'>
                <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                    <div className='flex justify-between items-center pb-4'>
                        <h1 className='text-[#d0d2d6] text-xl font-semibold'>Edit Product</h1>
                        <Link to={"/seller/dashboard/all-products"} className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm
                    px-7 py-2'>All Product</Link>
                    </div>
                    <div>
                        <form onSubmit={update}>
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
                                                (allCategories.length > 0) && allCategories.map((item, index) => {
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
                                {(imageShow && imageShow.length > 0) && imageShow.map((img, index) =>
                                    <div key={index}>
                                        <label htmlFor={index}>
                                            <img src={img} alt="" />
                                        </label>
                                        <input type="file" id={index} name={index} onChange={(e) => changeImage(img, e.target.files)} className='hidden' value={''} />
                                    </div>)}
                            </div>
                            <button className='bg-red-500 w-[280px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 mb-3' disabled={loader ? true : false}>
                                {
                                    loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle}></PropagateLoader> : 'Save Changes'
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProduct