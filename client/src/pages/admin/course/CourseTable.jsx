import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const invoices = [
    {
      invoice: "INV-0001",
      paymentStatus: "Paid",
      paymentMethod: "Paypal",
      totalAmount: "$500.00",
    },
    {
      invoice: "INV-0002",
      paymentStatus: "Paid",
      paymentMethod: "Stripe",
      totalAmount: "$1,000.00",
    },
    {
      invoice: "INV-0003",
      paymentStatus: "Paid",
      paymentMethod: "Paypal",
      totalAmount: "$1,000.00",
    },
  ]


const CourseTable = () => {
   const navigate = useNavigate()

 
  return (
    <div>
        <Button onClick={()=>navigate(`create`)} >
            Create a new course
            </Button>
            <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
        
    </div>
  )
}

export default CourseTable