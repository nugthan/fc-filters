


export default function Popover({customFilters, filterID}) {
    return (
        <div className={'grid grid-cols-2 h-full'}>
            <div className={'overflow-y-scroll p-2 border-r border-r-[#E7E7E7]'}>
                <p className={'bg-[#E7E7E7] font-semibold px-2 py-1'}>CATEGORY</p>
                <p className={'hover:bg-[#f2f2f2] py-2 px-2'}>Title</p>
                <p className={'hover:bg-[#f2f2f2] py-2 px-2'}>Tags</p>
                <p className={'hover:bg-[#f2f2f2] py-2 px-2'}>Price</p>
            </div>
            <div className={'w-full p-2'}>
                <input
                    className="h-[30px] rounded block border-0 w-full px-2 text-faded text-[13px] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-white"
                    value={customFilters[filterID].value}></input>
            </div>
        </div>
    )
}
