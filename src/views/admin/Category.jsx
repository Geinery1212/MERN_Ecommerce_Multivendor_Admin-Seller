import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BsImage } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Pagination from '../Pagination';
import Search from '../components/Search';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { add_category, get_category, messageClear } from '../../store/Reducers/categoryReducer';
import toast from 'react-hot-toast';
const Category = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [perPage, setPerPage] = useState(5);
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const { loader, errorMessage, successMessage, categories, totalCategories } =
        useSelector(state => state.category);
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        image: ''
    });
    const dispatch = useDispatch();
    const imageHandler = (e) => {
        let files = e.target.files;
        if (files.length > 0) {
            setSelectedImage(URL.createObjectURL(files[0]));
            setData({
                ...data,
                image: files[0]
            })
        }
    }
    const add = (e) => {
        e.preventDefault();
        dispatch(add_category(data));
    }
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            setSelectedImage('');
            setData({
                name: '',
                image: ''
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successMessage, errorMessage]);

    useEffect(() => {
        const obj = {
            perPage: parseInt(perPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_category(obj));
    }, [perPage, currentPage, searchValue]);   
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md'>
                <h1 className='text-[#d0d2d6] font-semibold text-lg'>Category</h1>
                <button className='bg-red-500 shadow-lg hover:shadow-red-500/50 px-4 py-2 cursor-pointer text-white rounded-sm text-sm' onClick={() => setShow(true)}>Add</button>
            </div>
            <div className='flex flex-wrap w-full'>
                {/* table */}
                <div className='w-full lg:w-7/12'>
                    <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                        <Search setPerPage={setPerPage} setSearchValue={setSearchValue} searchValue={searchValue} />
                        <div className='relative overflow-x-auto'>
                            <table className='w-full text-sm text-[#d0d3d6]'>
                                <thead className='uppercase border-b border-slate-700 text-[#d0d3d6]'>
                                    <tr>
                                        <th scope='col' className='py-1 px-4'>No</th>
                                        <th scope='col' className='py-1 px-4'>Image</th>
                                        <th scope='col' className='py-1 px-4'>Name</th>
                                        <th scope='col' className='py-1 px-4'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories.map((element, index) => {
                                            return <tr key={element._id}>
                                                <td className='py-1 px- font-medium whitespace-nowrap'>{element._id}</td>
                                                <td className='py-1 px-4 font-medium whitespace-nowrap'>
                                                    <img src={element.image} alt={element.name} className='w-[45px] h-[45px]' />
                                                </td>
                                                <td className='py-1 px-4 font-medium whitespace-nowrap'>{element.name}</td>
                                                <td className='py-1 px-4 font-medium whitespace-nowrap'>
                                                    <div className='flex justify-center items-center gap-4'>
                                                        <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit />
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
                            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={50} perPage={perPage} showItem={3} />
                        </div>
                    </div>
                </div>
                {/* add category */}
                <div className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${show ? 'right-0' : '-right-[340px]'} z-[9999] top-0 transition-all duration-500`}>
                    <div className='w-full pl-5'>
                        <div className='bg-[#6a5fdf] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d3d6]'>
                            <div className='flex justify-between items-center mb-4'>
                                <h1 className='font-semibold text-xl mb-4 w-full text-center'>Add Category</h1>
                                <div className='block lg:hidden' onClick={() => setShow(false)}>
                                    <IoMdCloseCircle />
                                </div>
                            </div>
                            <form onSubmit={add}>
                                <div className='flex flex-col w-full gap-1 mb-3'>
                                    <label htmlFor="name">Category Name</label>
                                    <input type="text" id='name' name='name' placeholder='Category Name' className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                                        onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} />
                                    <div>
                                        <label className='flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#d0d2d6]' htmlFor='image'>
                                            {
                                                selectedImage !== '' ? <img className='w-full h-full' src={selectedImage} alt="" /> : <>
                                                    <span><BsImage /></span>
                                                    <span>Select Image</span>
                                                </>
                                            }
                                        </label>
                                        <input onChange={imageHandler} type="file" name='image' id='image' className='hidden' />
                                    </div>
                                    <button className='bg-red-500 w-full hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 mb-3' disabled={loader ? true : false}>
                                        {
                                            loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle}></PropagateLoader> : 'Add Category'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category