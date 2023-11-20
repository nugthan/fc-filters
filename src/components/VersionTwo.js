import {useMemo, useState} from "react";
import {useGlobalFilter, usePagination, useSortBy, useTable} from "react-table";
import {CalendarDaysIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import { Popover, Transition } from '@headlessui/react'
import { usePopper } from 'react-popper'
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

export default function VersionTwo() {
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
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    // filter
    const [customFilters, setCustomFilters] = useState({
        0: {
            category: 'Title',
            operator: 'Is equal',
            value: 'Custom value'
        }
    })

    // popover
    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let { styles, attributes } = usePopper(referenceElement, popperElement)


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
            value: 'Custom value'
        }
        setCustomFilters(newCustomFilters)
    }

    const removeFilter = (id) => {
        const newCustomFilters = {...customFilters}
        delete newCustomFilters[id]
        setCustomFilters(newCustomFilters)
    }

    return (
        <div>
            <div className={'flex items-center'}>
                <div className={'flex items-center'}>
                    {Object.keys(customFilters).map((filterID, index) => (
                        <Popover>
                            {({ open, close }) => (
                                /* Use the `open` state to conditionally change the direction of the chevron icon. */
                                <div className={'relative'}>
                                    <Transition
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Popover.Panel
                                            className={'absolute z-10 bg-white rounded-md shadow-xl flex flex-col bottom-[10px] w-[300px] h-[250px]'}
                                        >
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
                                            <div className={'mt-2 border-t pt-2 flex justify-end pb-2'}>
                                                <div className={'px-2'}>
                                                    <button className={'bg-[#E9E9E9] h-[30px] text-black rounded px-3 text-[12px] font-semibold mr-2'} onClick={() => close()}>Cancel</button>
                                                    <button className={'bg-[#00A3FF] h-[30px] text-white rounded px-3 text-[12px] font-semibold'}>Apply</button>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                    <Popover.Button className={'bg-[#E9E9E9] hover:bg-[#DCDCDC] transition h-[30px] rounded px-3 text-[12px] font-semibold mr-2'}>
                                        <div className={'flex items-center h-full py-2 text-[#4C4C4C]'}>
                                            {customFilters[filterID].category}: <span className={'w-[60px] truncate text-left ml-1'}>{customFilters[filterID].value}</span>
                                            <span className={'mx-2 h-full border border-gray-400'}></span>
                                            <div onClick={() => removeFilter(filterID)}>
                                                <CloseIcon className={'text-gray-400 w-4 h-4 hover:bg-gray-700'} />
                                            </div>
                                        </div>
                                    </Popover.Button>
                                </div>
                            )}
                        </Popover>
                    ))}
                    <Popover>
                        {({ open, close }) => (
                            /* Use the `open` state to conditionally change the direction of the chevron icon. */
                            <div className={'relative'}>
                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Popover.Panel
                                        className={'absolute z-10 bg-white rounded-md shadow-xl flex flex-col bottom-[10px] w-[300px] h-[250px]'}
                                    >
                                        <div className={'grid grid-cols-2 h-[100%] overflow-y-scroll'}>
                                            <div className={'overflow-y-scroll p-2'}>
                                                <p className={'bg-[#E7E7E7] font-semibold px-2 py-1'}>CATEGORY</p>
                                                <p className={'hover:bg-[#f2f2f2] py-2 px-2'}>Title</p>
                                                <p className={'hover:bg-[#f2f2f2] py-2 px-2'}>Tags</p>
                                                <p className={'hover:bg-[#f2f2f2] py-2 px-2'}>Price</p>
                                            </div>
                                        </div>
                                        <div className={'mt-2 border-t pt-2 flex justify-end pb-2'}>
                                            <div className={'px-2'}>
                                                <button className={'bg-[#E9E9E9] h-[30px] text-black rounded px-3 text-[12px] font-semibold mr-2'} onClick={() => close()}>Cancel</button>
                                                <button onClick={() => {addFilter(), close()}} className={'bg-[#56C08A] h-[30px] text-white rounded px-3 text-[12px] font-semibold'}>Create</button>
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                                <Popover.Button className={'bg-[#56C08A] h-[30px] text-white rounded px-3 text-[12px] font-semibold'}>Add Filter</Popover.Button>
                            </div>
                        )}
                    </Popover>
                </div>
                <div className={'flex-1 flex items-center justify-end'}>
                    <div className={''}>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                value={globalFilter || ''}
                                className="h-[30px] rounded block border-0 pl-10 text-faded text-[13px] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-white"
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
                    <button className={'bg-black h-[30px] text-white rounded px-3 text-[12px] font-semibold'}>Export CSV</button>
                </div>
                <div className={'flex items-center'}>
                </div>
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
