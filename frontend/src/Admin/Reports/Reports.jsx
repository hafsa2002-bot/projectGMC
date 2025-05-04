import React, {useState} from 'react'
import WeekReport from './WeekReport'
import OneMonthReports from './OneMonthReports'
import ThreeMonthsReports from './ThreeMonthsReports'
import YearReports from './YearReports'
import { ChevronDown } from 'lucide-react'
import MostPopularCharts from './MostPopularCharts'

function Reports() {
  const [showPeriodOptions, setShowPeriodOptions] = useState(false)
  const [reportsPeriod, setReportsPeriod] = useState("week")
  return (
    <div className=' font-poppins mb-20 ml-12'>
      <p className='text-3xl font-medium mb-10  mt-5 text-blue-500 font-poppins'>Reports</p>
      <div className='bg-white p-3  w-10/12   rounded-xl'>
        <div className='flex justify-between items-center mt-2 mb-7 mx-3'>
          <h1 className='text-xl font-semibold'>Income & Orders Tracker</h1>
          <div 
            className='relative cursor-pointer  min-w-32 hover:bg-gray-200 bg-white rounded-full flex gap-1 items-center justify-center border border-gray-300 text-gray-600 px-3 py-1'
            onClick={() => setShowPeriodOptions(!showPeriodOptions)}
          >
            <div>
              {reportsPeriod === "week" && <p>Week</p>}
              {reportsPeriod === "month" && <p>Month</p>}
              {reportsPeriod === "3-months" && <p>Last 3 Months</p>}
              {reportsPeriod === "year" && <p>Year</p>}
            </div>
            <ChevronDown/>
            {showPeriodOptions && (
              <div className='absolute top-10 z-50 bg-white border border-gray-200 rounded-xl w-32'>
                <div
                  onClick={() => setReportsPeriod("week")} 
                  className='px-3 py-2 border-b border-gray-300'
                >
                  Week
                </div>
                <div  
                  onClick={() => setReportsPeriod("month")} 
                  className='px-3 py-2 border-b border-gray-300'
                >
                  Month
                </div>
                <div
                  onClick={() => setReportsPeriod("3-months")}  
                  className='px-3 py-2 border-b border-gray-300'
                >
                  last 3 months
                </div>
                <div
                  onClick={() => setReportsPeriod("year")}  
                  className='px-3 py-2'
                >
                  Year
                </div>
              </div>
            )}
          </div>
        </div>
        {reportsPeriod === "week" && <WeekReport/>}
        {reportsPeriod === "month" && <OneMonthReports/>}
        {reportsPeriod === "3-months" && <ThreeMonthsReports/>}
        {reportsPeriod === "year" && <YearReports/>}
      </div>

      <div className='w-full mt-10'>
        <h1 className='text-xl font-semibold mb-4'>Most Popular Products</h1>
        <div className='bg-white w-10/12 px-2 py-6 flex justify-center rounded-lg'>
          <MostPopularCharts h={400} w={800} outerRad={180} layout="vertical" align="right" verticalAlign="middle" />
        </div>
      </div>
      
      
      
    </div>
  )
}

export default Reports
