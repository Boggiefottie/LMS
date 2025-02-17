import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const Dashboard = () => {
  return (
    <div className=" grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">tor</p>
        </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">totalR</p>
        </CardContent>
      </Card>

    </div>
  )
}

export default Dashboard