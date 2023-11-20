import Image from 'next/image'
import { Open_Sans } from 'next/font/google'
const openSans = Open_Sans({ subsets: ['latin'] })


import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {useEffect, useState} from "react";
import VersionOne from "@/components/VersionOne";
import VersionTwo from "@/components/VersionTwo";

export default function Home() {



  return (
    <main className={openSans.className}>
      <div className={'container mx-auto mt-24'}>
          <p className={'text-4xl mb-6'}>Version 1</p>
          <VersionOne />
          <p className={'text-4xl mb-6 mt-64'}>Version 2</p>
          <VersionTwo />
      </div>

    </main>
  )
}
