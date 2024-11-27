import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Pagination from '../Pagination';
import Search from '../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { delete_product_discount, get_products_discount } from '../../store/Reducers/productReducer';
import { FadeLoader } from 'react-spinners';
import MyMoney from '../../utils/MyMoney';
import Swal from 'sweetalert2';

const DiscountProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const formatter = new MyMoney();    
    let { loader, totalProductsDiscount, productsDiscount } = useSelector(state => state.product);
    const deleteProduct = (id) => {        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_product_discount(id));
            }
        });
    }

    useEffect(() => {
        const obj = {
            perPage: parseInt(perPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_products_discount(obj));
    }, [perPage, currentPage, searchValue, dispatch, totalProductsDiscount]);
    return (
        <>
            {loader && <div className='w-screen h-screen flex justify-center
            items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
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
                                    productsDiscount?.map((element, index) => {
                                        return <tr key={index}>
                                            <td className='py-1 px- font-medium whitespace-nowrap text-center'>{index + 1}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>
                                                <div className='flex justify-center items-center'>
                                                    <img src={element.images[0]} className='w-[45px] h-[45px]' alt='' />
                                                </div>
                                            </td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>{element.name.length > 15 ? element?.name?.slice(0, 15) + '...' : element.name}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>{element.category}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>{element.brand}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>{formatter.centsToFomattedCurrency(element.price)}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>{element.discount === 0 ? 'No Discount' : element.discount + '%'}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>{element.discount}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>
                                                <div className='flex justify-center items-center gap-4'>
                                                    <Link to={`/seller/dashboard/edit-product/${element._id}`} className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit />
                                                    </Link>
                                                    <Link to={`/seller/dashboard/view-product/${element._id}`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye />
                                                    </Link>
                                                    <Link onClick={() => deleteProduct(element._id)} className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash />
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
                        {totalProductsDiscount > perPage && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={totalProductsDiscount} perPage={perPage} showItem={Math.floor(totalProductsDiscount / perPage)} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiscountProducts