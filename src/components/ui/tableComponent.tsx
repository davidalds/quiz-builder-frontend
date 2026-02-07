import type { ReactNode } from 'react'
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCaption,
} from './table'

interface TableComponentProps {
  caption?: string
  headers: string[]
  children: ReactNode | ReactNode[]
}

function TableComponent({ caption, headers, children }: TableComponentProps) {
  return (
    <Table>
      {caption ? <TableCaption>{caption}</TableCaption> : <></>}
      <TableHeader>
        <TableRow>
          {headers.map((headTitle, index) => (
            <TableHead key={index}>{headTitle}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  )
}

export default TableComponent
