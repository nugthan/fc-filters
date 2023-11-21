import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import {MagnifyingGlassIcon, ChevronDownIcon, CalendarDaysIcon, TrashIcon} from '@heroicons/react/20/solid'
import {useEffect, useMemo, useState} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function VersionOne () {
    const [originalData, setOriginalData] = useState([
        {
            id: '1',
            title: 'Product 1',
            tags: ['tag 1', 'tag 2'],
            price: 100,
        },
        {
            id: '2',
            title: 'Product 2',
            tags: ['tag 2', 'tag 3'],
            price: 400,
        },
        {
            id: '3',
            title: 'Product 3',
            tags: ['tag 1', 'tag 3'],
            price: 500,
        },
    ]);
    const [data, setData] = useState(originalData);
    const [dateData, setDateData] = useState(data);
    const [customFilters, setCustomFilters] = useState({
        0: {
            category: 'Title',
            operator: 'Is equal',
            value: ''
        }
    })
    const [advanced, setAdvanced] = useState(false)
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const columns = useMemo(() => [
        {
            Header: 'Title',
            accessor: 'title',
            type: 'text'
        },
        {
            Header: 'Tags',
            accessor: 'tags',
            type: 'text',
            Cell: ({value}) => {
                if (!value) return
                return <div className={'flex flex-wrap gap-2'}>
                    {value.map((item, itemID) => (
                        <span key={itemID} className={'border px-2 py-1'}>{item}</span>
                    ))}
                </div>
            }
        },
        {
            Header: 'Price',
            accessor: 'price',
            type: 'text',
            Cell: ({value}) => {
                if (!value) return
                return <p>£{value}</p>
            }
        }
    ], []);

    const filter = () => {
        if (customFilters.length === 0) {
            setData(originalData)
            console.log('set original data')
        }
        if (customFilters && advanced) {
            const newFilteredData = originalData.filter((item) => {
                let result = true
                Object.keys(customFilters).forEach((filterID) => {
                    const filter = customFilters[filterID]
                    if (filter.category === 'Title') {
                        if (filter.operator === 'Is equal') {
                            // if title contains but not exact
                            if (!item.title.toLowerCase().includes(filter.value.toLowerCase())) {
                                result = false
                            }
                        }
                        if (filter.operator === 'Is not equal') {
                            // if title does not contain but not exact
                            if (item.title.toLowerCase().includes(filter.value.toLowerCase())) {
                                result = false
                            }
                        }
                    }
                    if (filter.category === 'Tags') {
                        if (filter.operator === 'Is equal') {
                            if (!item.tags.includes(filter.value.toLowerCase())) {
                                result = false
                            }
                        }
                        if (filter.operator === 'Is not equal') {
                            if (item.tags.includes(filter.value.toLowerCase())) {
                                result = false
                            }
                        }
                    }
                    if (filter.category === 'Price') {
                        if (filter.operator === 'Is equal') {
                            if (item.price !== parseInt(filter.value)) {
                                result = false
                            }
                        }
                        if (filter.operator === 'Is not equal') {
                            if (item.price === parseInt(filter.value)) {
                                result = false
                            }
                        }
                        if (filter.operator === 'Is larger than') {
                            if (item.price <= filter.value) {
                                result = false
                            }
                        }
                        if (filter.operator === 'Is smaller than') {
                            if (item.price >= filter.value) {
                                result = false
                            }
                        }
                    }
                })
                return result
            })
            setData(newFilteredData)
            console.log(newFilteredData)
        }
    }

    useEffect(() => {
        // clear filters if advanced is false
        if (!advanced) {
            setData(originalData)
        } else {
            filter()
        }
    }, [advanced]);

    useEffect(() => {
        filter()
    }, [customFilters]);




    const {
        getTableProps,
        state,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);
    const { globalFilter } = state;


    const addFilter = () => {
        const newCustomFilters = {...customFilters}
        newCustomFilters[Object.keys(customFilters).length] = {
            category: 'Title',
            operator: 'Is equal',
            value: ''
        }
        setCustomFilters(newCustomFilters)
    }
    const removeFilter = () => {
        const newCustomFilters = {...customFilters}
        delete newCustomFilters[Object.keys(customFilters).length - 1]
        setCustomFilters(newCustomFilters)
    }

    return (
        <div>
            <div className={'bg-[#F2F2F2] rounded p-[10px]'}>
                <div className={'flex items-center'}>
                    <div className={'flex-1 flex items-center'}>
                        <div className={''}>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    value={globalFilter || ''}
                                    className="h-[30px] w-[400px] rounded block border-0 pl-10 text-faded text-[13px] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-white"
                                    placeholder=""
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={'flex items-center'}>
                            <p className={'ml-[10px] mr-1'}>Date:</p>
                            <DatePicker
                                selectsRange={true}
                                showIcon
                                icon={<CalendarDaysIcon />}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => {
                                    setDateRange(update);
                                }}
                                isClearable={true}
                            />
                        </div>
                        <div className={'flex items-center'}>
                            <p className={'ml-[10px] mr-1'}>Show:</p>
                            <select
                                className={'relative rounded appearance-none bg-white h-[30px] border px-3 mr-2 text-[14px] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'}
                                value={pageSize}
                                onChange={e => {
                                    setPageSize(Number(e.target.value))
                                }}
                            >
                                {[10, 20, 30, 40, 50].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={'flex items-center'}>
                        {!advanced &&
                            <p className={'font-medium text-[#00A3FF] underline cursor-pointer'} onClick={() => setAdvanced(true)}>Advanced search</p>
                        }
                        {advanced &&
                            <p className={'font-medium text-[#00A3FF] underline cursor-pointer'} onClick={() => setAdvanced(false)}>Simple search</p>
                        }
                        <button className={'bg-black h-[30px] text-white rounded px-3 text-[12px] font-semibold ml-3'}>Export CSV</button>
                    </div>
                </div>
                {advanced && (
                    <div className={'border-t border-t-[#97979744] pt-[10px] mt-[10px]'}>

                        {customFilters && Object.keys(customFilters).map((item, id)=> (
                            <div className={'w-full flex items-center mb-2'}>
                                <select
                                    className={'relative rounded appearance-none bg-white flex-1 h-[30px] border px-3 mr-2 text-[14px] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'}
                                    value={customFilters[item].category}
                                    onChange={e => {
                                        const newCustomFilters = {...customFilters}
                                        newCustomFilters[item].category = e.target.value
                                        setCustomFilters(newCustomFilters)
                                    }}
                                >
                                    {['Title', 'Tags', 'Price'].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className={'relative rounded appearance-none bg-white h-[30px] border px-3 mr-2 text-[14px] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'}
                                    value={customFilters[item].operator}
                                    onChange={e => {
                                        const newCustomFilters = {...customFilters}
                                        newCustomFilters[item].operator = e.target.value
                                        setCustomFilters(newCustomFilters)
                                    }}
                                >
                                    {['Is equal', 'Is not equal', 'Is larger than', 'Is smaller than'].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    className="h-[30px] w-[400px] flex-1 rounded block border-0 px-2 text-faded text-[13px] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-white"
                                    placeholder=""
                                    value={customFilters[item].value}
                                    onChange={(e) => {
                                        const newCustomFilters = {...customFilters}
                                        newCustomFilters[item].value = e.target.value
                                        setCustomFilters(newCustomFilters)
                                    }}
                                />
                                <TrashIcon className={'h-5 w-5 ml-2 cursor-pointer text-[#D64444]'} onClick={() => removeFilter()} />
                            </div>
                        ))}


                        <button onClick={() => addFilter()} className={'bg-[#56C08A] h-[30px] text-white rounded px-3 text-[12px] font-semibold'}>Add Filter</button>
                    </div>
                )}
            </div>
            <div className={'mt-2'}>
                <table {...getTableProps()} className={'w-full border'}>
                    <thead className={'border-b border-b-borderdark'}>
                    {headerGroups.map((headerGroup, index) => (
                        <tr className={'text-left'} key={index} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, index) => (
                                <th key={index} {...column.getHeaderProps(column.getSortByToggleProps())} className={'select-none bg-[#002543] text-white px-2'}>
                                    {column.render('Header')}
                                    <span className={'ml-1'}>
                                          {column.isSorted
                                              ? column.isSortedDesc
                                                  ?

                                                  <svg width="8px" height="5px" viewBox="0 0 6 3" className={'inline-block'}>
                                                      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                          <g id="Dashboard" transform="translate(-1836, -112)" fill="#000" fillRule="nonzero">
                                                              <g id="Sort-Down" transform="translate(1836, 112)">
                                                                  <polygon id="Path" points="3 3 6 0 0 0"></polygon>
                                                              </g>
                                                          </g>
                                                      </g>
                                                  </svg>
                                                  :
                                                  <svg width="8px" height="5px" viewBox="0 0 6 3" className={'inline-block'}>
                                                      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                          <g id="Dashboard" transform="translate(-1836, -112)" fill="#000" fillRule="nonzero">
                                                              <g id="Sort-Down" transform="translate(1839, 113.5) scale(1, -1) translate(-1839, -113.5)translate(1836, 112)">
                                                                  <polygon id="Path" points="3 3 6 0 0 0"></polygon>
                                                              </g>
                                                          </g>
                                                      </g>
                                                  </svg>
                                              :
                                              <svg width="8px" height="5px" viewBox="0 0 6 3" className={'inline-block'}>
                                                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                      <g id="Dashboard" transform="translate(-1836, -112)" fill="transparent" fillRule="nonzero">
                                                          <g id="Sort-Down" transform="translate(1839, 113.5) scale(1, -1) translate(-1839, -113.5)translate(1836, 112)">
                                                              <polygon id="Path" points="3 3 6 0 0 0"></polygon>
                                                          </g>
                                                      </g>
                                                  </g>
                                              </svg>
                                          }
                                      </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                        <tbody {...getTableBodyProps()}>
                        {rows.map((row, index) => {
                            prepareRow(row);
                            return (
                                <tr key={index}
                                    className={'cursor-pointer relative transition-colors text-faded border-b hover:bg-[#E7E7E7]'}
                                    {...row.getRowProps()}
                                >
                                    {row.cells.map(cell => {
                                        // eslint-disable-next-line react/jsx-key
                                        return <td className={'py-4 px-2'} key={cell.key} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            );
                        })}
                        </tbody>
                </table>
            </div>
        </div>
    )
}
