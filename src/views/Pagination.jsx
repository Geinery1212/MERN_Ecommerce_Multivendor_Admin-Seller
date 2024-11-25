import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Pagination = ({ currentPage = 1, setCurrentPage, totalItems = 1, perPage = 1, showItem = 5 }) => {
    const totalPages = Math.ceil(totalItems / perPage);

    const startPage = Math.max(1, currentPage - Math.floor(showItem / 2));
    const endPage = Math.min(totalPages, startPage + showItem - 1);

    const createButton = () => {
        const btns = [];
        for (let index = startPage; index <= endPage; index++) {
            btns.push(
                <li
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`${currentPage === index
                        ? 'bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white'
                        : 'bg-slate-500 hover:bg-indigo-400 shadow-md hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]'
                        } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`}
                >
                    {index}
                </li>
            );
        }
        return btns;
    };

    return (
        <ul className="flex gap-3">
            {currentPage > 1 && (
                <li
                    className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <MdKeyboardArrowLeft />
                </li>
            )}
            {createButton()}
            {currentPage < totalPages && (
                <li
                    className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <MdKeyboardArrowRight />
                </li>
            )}
        </ul>
    );
};

export default Pagination;
