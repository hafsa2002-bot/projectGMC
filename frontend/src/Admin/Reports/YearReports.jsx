import React, {useState, useEffect} from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import axios from 'axios'

function YearReports({}) {
    const [data, setData] = useState([])
        const fetchData = () => {
            axios.get("http://localhost:3003/reports/yearly-income")
                .then(response => {
                    setData(response.data)
                    console.log("Week Data: ", response.data);
                })
                .catch(error => console.log("error: ", error))
        }
        useEffect(() => {
            fetchData()
        }, [])
  return (
    <ResponsiveContainer width="100%" height={300} >
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        right: marginRight,
                        top: 10
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis  yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip  content={<CustomTooltip />} />
                    <Legend/>
                    <Line yAxisId="left" type="monotone" dataKey="totalIncome" stroke="#3b82f6" />
                    <Line yAxisId="right" type="monotone" dataKey="totalOrders" stroke="#10b981" />
                </LineChart>
        </ResponsiveContainer>
  )
}

export default YearReports

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-2 rounded-md">
                <p className="text-medium text-lg text-white">{label}</p>
                <p className="text-sm text-blue-400">
                    Total Income:
                    <span className="ml-2">{payload[0].value} MAD</span>
                </p>
                <p className="text-sm text-green-400">
                    Total Orders:
                    <span className="ml-2">{payload[1].value}</span>
                </p>
            </div>
        );
    }
  };
