import React from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ currentPage, setCurrentPage, totalItems, perPage, showItem }) => {
    let totalPages = Math.ceil(totalItems / perPage);
    let startPage = currentPage;
    let diff = totalPages - currentPage;

    if (diff <= showItem) {
        startPage = totalPages - showItem;
    }
    let endPage = startPage < 0 ? showItem : showItem + startPage;
    if (startPage <= 0) {
        startPage = -1;
    }
    const createButton = () => {
        const btns = [];
        for (let index = startPage; index < endPage; index++) {
            btns.push(
                <li onClick={() => setCurrentPage(index)} className={`${currentPage === index ? 'bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white' : 'bg-slate-500 hover:bg-indigo-400 shadow-md hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]'} w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`}>{index}</li>
            );

        }
        return btns;
    }

    return (
        <ul className='flex gap-3'>
            {
                currentPage > 1 && <li className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer' onClick={() => setCurrentPage(currentPage - 1)}><MdKeyboardArrowLeft />
                </li>
            }
            {
                createButton()
            }
            {
                currentPage < totalPages && <li className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer' onClick={() => setCurrentPage(currentPage + 1)}><MdKeyboardArrowRight />

                </li>
            }
        </ul>
    )
}

export default Pagination