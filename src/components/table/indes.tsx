import React from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import { cn } from '@/lib/utils'

type DataTableProps = {
    headers: string[]
    children: React.ReactNode
}

const DataTable = ({headers,children}: DataTableProps) => {
  return (
    <Table className='rounded-t-xl'>
        <TableHeader>
            <TableRow className="bg-grandis max-md:text-xs">
                {headers.map((header,key)=>(
                    <TableHead
                        key={key}
                        className={cn(key== headers.length -1 && "text-right","text-black max-md:p-1")}
                    >
                        {header}
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
    </Table>
  )
}

export default DataTable