import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Pagination from '../Pagination';
import Search from '../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../../store/Reducers/productReducer';

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    // const [allProducts, setAllProducts] = useState([]);
    let { loader, totalProducts, products } = useSelector(state => state.product);
    useEffect(() => {
        console.log('working');
        const obj = {
            perPage: parseInt(perPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_products(obj));
    }, [perPage, currentPage, searchValue]);

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <h1 className='text-[#000] font-semibold text-lg mb-3'>All Products</h1>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                <Search setPerPage={setPerPage} setSearchValue={setSearchValue} searchValue={searchValue} />
                <div className='relative overflow-x-auto mt-4'>
                    <table className='w-full text-sm text-[#d0d3d6]'>
                        <thead className='uppercase border-b border-slate-700 text-[#d0d3d6]'>
                            <tr>
                                <th scope='col' className='py-1 px-4'>No</th>
                                <th scope='col' className='py-1 px-4'>Image</th>
                                <th scope='col' className='py-1 px-4'>Name</th>
                                <th scope='col' className='py-1 px-4'>Category</th>
                                <th scope='col' className='py-1 px-4'>Brand</th>
                                <th scope='col' className='py-1 px-4'>Price</th>
                                <th scope='col' className='py-1 px-4'>Discount</th>
                                <th scope='col' className='py-1 px-4'>Stock</th>
                                <th scope='col' className='py-1 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((element, index) => {
                                    return <tr key={index}>
                                        <td className='py-1 px- font-medium whitespace-nowrap text-center'>{index + 1}</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>
                                            <div className='flex justify-center items-center'>
                                                <img src={element.images[0]} className='w-[45px] h-[45px]' />
                                            </div>
                                        </td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>{element.name.length > 15 ? element?.name?.slice(0, 15) + '...' : element.name}</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>{element.category}</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>{element.brand}</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>${element.price}</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>{element.discount === 0 ? 'No Discount' : element.discount + '%'}</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>{element.discount}</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>
                                            <div className='flex justify-center items-center gap-4'>
                                                <Link to={`/seller/dashboard/edit-product/${index}`} className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit />
                                                </Link>
                                                <Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye />
                                                </Link>
                                                <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                    {totalProducts > perPage && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={50} perPage={perPage} showItem={3} />}
                </div>
            </div>
        </div>
    )
}

export default Products