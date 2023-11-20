import Image from 'next/image'
import { Open_Sans } from 'next/font/google'
const openSans = Open_Sans({ subsets: ['latin'] })


import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {useEffect, useState} from "react";
import VersionOne from "@/components/VersionOne";

export default function Home() {



  return (
    <main className={openSans.className}>
      <div className={'container mx-auto mt-24'}>
          <VersionOne />
      </div>

    </main>
  )
}
