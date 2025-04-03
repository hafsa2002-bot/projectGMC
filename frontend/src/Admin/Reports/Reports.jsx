import React, {useState} from 'react'
import WeekReport from './WeekReport'
import OneMonthReports from './OneMonthReports'
import ThreeMonthsReports from './ThreeMonthsReports'
import YearReports from './YearReports'
import { ChevronDown } from 'lucide-react'

function Reports() {
  const [showPeriodOptions, setShowPeriodOptions] = useState(false)
  const [reportsPeriod, setReportsPeriod] = useState("week")
  return (
    <div>
      <div className='bg-white p-3  w-10/12 m-auto rounded-xl'>
        <div className='flex justify-between items-center mt-2 mb-7 mx-3'>
          <h1 className='text-2xl font-outfit'>Income & Orders Tracker</h1>
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
      
      
      
    </div>
  )
}

export default Reports
