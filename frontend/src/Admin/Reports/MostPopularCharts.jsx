import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

function MostPopularCharts({h, w, outerRad, layout, align, verticalAlign, fontSize}) {
    const [data, setData] = useState([])
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE'];
    // const COLORS = ['#3B82F6', '#22C55E', '#FACC15', '#F97316', '#8C6EF9'];
    const getMostPopularProducts = () => {
        axios.get("http://localhost:3003/popular-products")
            .then(response => setData(response.data))
            .catch(error => console.log("Error: ", error))
    }
    useEffect(() => {
        getMostPopularProducts()
    }, [])

    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)
        
       
        return (
            <text
                x={x}
                y={y}
                fill='white'
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                fontSize={fontSize}
            >
                {` ${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    const CustomTooltip = ({active, payload}) => {
        if(active && payload && payload.length){
            return (
                <div className='bg-white shadow px-3 py-1 rounded-lg border border-gray-300'>
                    <p>
                        <span className='font-semibold'>{payload[0].name}</span> : {payload[0].value} items
                    </p>
                </div>
            )
        }
    }

  return (
    <PieChart width={w} height={h}>
        <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={outerRad}
        >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <Tooltip content={<CustomTooltip/>} />
        <Legend
            // layout="vertical"
            // align="right"
            // verticalAlign="middle"
            layout={layout}
            align={align}
            verticalAlign={verticalAlign}
            // formatter={(value) => <span className="text-sm">{value}</span>}
            formatter={(value) => <span className="text-sm text-gray-700 font-medium ">{value}</span>}
        />
    </PieChart>
  )
}

export default MostPopularCharts
