import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { get_category } from '../../store/Reducers/categoryReducer';
import { useDispatch, useSelector } from 'react-redux';
import { get_product } from '../../store/Reducers/productReducer';
import { FadeLoader } from 'react-spinners';
const ViewProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { product, loader2 } = useSelector(state => state.product);
    const [category, setCategory] = useState('');
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

    useEffect(() => {
        dispatch(get_category({
            searchValue: '',
            perPage: '',
            page: ''
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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


    return (
        <>
            {loader2 && <div className='w-screen h-screen flex justify-center
            items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
            <div className='px-2 lg:px-7 pt-5'>
                <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                    <div className='flex justify-between items-center pb-4'>
                        <h1 className='text-[#d0d2d6] text-xl font-semibold'>View Product</h1>
                        <Link to={"/seller/dashboard/all-products"} className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm
                    px-7 py-2'>All Product</Link>
                    </div>
                    <div>
                        <div>
                            {/* product name and brand */}
                            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="name">Product Name:</label>
                                    <input readOnly type="text" name="name" id="name" placeholder='Product Name'
                                        value={formData.name} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6] cursor-default'/>
                                </div>
                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="nabrandme">Product Brand:</label>
                                    <input readOnly type="text" name="brand" id="brand" placeholder='Product Brand'
                                        value={formData.brand} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6] cursor-default'/>
                                </div>
                            </div>
                            {/* Product category and stock */}
                            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                                <div className='flex flex-col w-full gap-1 relative'>
                                    <label htmlFor="category">Product Category:</label>
                                    <input type="text" name="category" id="category" placeholder='--select category--'
                                        readOnly value={category}
                                        className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6] w-full cursor-default'/>
                                    <div className={`absolute top-[101%] bg-[#475569] w-full transition-all scale-100`}>
                                    </div>
                                </div>
                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="stock">Product Stock:</label>
                                    <input readOnly type="text" name="stock" id="stock" placeholder='Stock'
                                        value={formData.stock} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6] cursor-default'/>
                                </div>
                            </div>
                            {/* Price and  Discount*/}
                            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="price">Price:</label>
                                    <input readOnly type="number" name="price" id="price" placeholder='Price'
                                        value={formData.price} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6] cursor-default'/>
                                </div>
                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="discount">Discount:</label>
                                    <input readOnly type="number" name="discount" id="discount" placeholder='Discount by %'
                                        value={formData.discount} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6] cursor-default'/>
                                </div>
                            </div>
                            {/* description */}
                            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="description">Description:</label>
                                    <textarea readOnly name="description" id="description" value={formData.description} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6] cursor-default' rows={4}></textarea>
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
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProduct