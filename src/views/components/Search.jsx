import React from 'react'

const Search = ({setPerPage, setSearchValue, searchValue}) => {
    return (
        <div className='flex justify-between items-center'>
            <select onClick={(e) => setPerPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            <input type="text" placeholder='search' className='px-4 py-2
            focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700
            rounded-md text-[#d0d2d6]' onChange={(e)=>setSearchValue(e.target.value)} value={searchValue}/>
        </div>
    )
}

export default Search