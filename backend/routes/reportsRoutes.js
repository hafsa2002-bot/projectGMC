import express from 'express'
import Order from '../models/Order.js'

const router = express.Router()

// weekly income 
router.get("/reports/weekly-income", async (req, res) => {
    try{
        const now = new Date();
        now.setHours(23, 59, 59, 999)

        // get the strat of 7days ago
        const startOfWeek = new Date()
        startOfWeek.setDate(now.getDate() - 6)
        startOfWeek.setHours(0, 0, 0, 0)

        const pipeline = [
            {
                $match: {
                    createdAt: {$gte: startOfWeek, $lte: now},
                }
            },
            {
                $group: {
                    _id: {$dateToString: {format: "%Y-%m-%d", date: "$createdAt"}},
                    totalIncome: {$sum: "$amountPaid"},
                    totalOrders: {$sum: 1}
                }
            },
            {$sort: {_id: -1}}
        ]
        const results = await Order.aggregate(pipeline)

        // Days of the week in correct order (starting from today)
        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let weekData = []
        for(let i = 0; i < 7; i++){
            const date = new Date()
            date.setDate(now.getDate() - i);
            date.setHours(0, 0, 0, 0)

            // Get the day name based on today's position
            let dayName = weekDays[date.getDay()];

            weekData.push({
                name: dayName,
                date: date.toISOString().split("T")[0],
                totalIncome: 0,
                totalOrders: 0,
            })
        }

        // Merge database results into weekData
        results.forEach(({ _id, totalIncome, totalOrders }) => {
            const index = weekData.findIndex((day) => day.date === _id);
            if (index !== -1) {
                weekData[index].totalIncome = totalIncome;
                weekData[index].totalOrders = totalOrders;
            }
        });

        // Reverse the array to ensure it starts with today's data
        weekData.reverse();

        res.json(weekData)
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching weekly income report", error });
    }
})

// last three months
router.get("/reports/last-three-months-weekly-income", async (req, res) => {
    try {
        const now = new Date();
        now.setHours(23, 59, 59, 999);

        // Find the start of the current week (Monday)
        const currentMonday = new Date(now);
        currentMonday.setDate(currentMonday.getDate() - (currentMonday.getDay() === 0 ? 6 : currentMonday.getDay() - 1));
        currentMonday.setHours(0, 0, 0, 0);

        // Get the start of 11 weeks ago (so we have a total of 12 weeks)
        const startOfPeriod = new Date(currentMonday);
        startOfPeriod.setDate(startOfPeriod.getDate() - (11 * 7));

        // MongoDB aggregation pipeline
        const pipeline = [
            {
                $match: {
                    createdAt: { $gte: startOfPeriod, $lte: now },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        week: { $isoWeek: "$createdAt" }, // ISO week number
                    },
                    totalIncome: { $sum: "$amountPaid" },
                    totalOrders: { $sum: 1 },
                },
            },
            { $sort: { "_id.year": 1, "_id.week": 1 } }, // Sort by year & week
        ];

        const results = await Order.aggregate(pipeline);

        // Generate the last 12 weeks including the current week
        let weekData = [];
        let tempDate = new Date(startOfPeriod);

        for (let i = 0; i < 12; i++) {
            // Get the first day of the week (Monday)
            const startOfWeek = new Date(tempDate);
            startOfWeek.setDate(tempDate.getDate() - (tempDate.getDay() === 0 ? 6 : tempDate.getDay() - 1));

            // Format: "31 Mar", "7 Apr"
            const formattedDate = `${startOfWeek.getDate()} ${startOfWeek.toLocaleString('en-US', { month: 'short' })}`;

            weekData.push({
                name: formattedDate,
                firstDayOfWeek: startOfWeek.toISOString().split("T")[0], // YYYY-MM-DD
                totalIncome: 0,
                totalOrders: 0,
            });

            tempDate.setDate(tempDate.getDate() + 7); // Move to next week
        }

        // Merge database results into weekData
        results.forEach(({ _id, totalIncome, totalOrders }) => {
            const index = weekData.findIndex(
                (week) => week.firstDayOfWeek === getFirstDayOfWeekFromISO(_id.year, _id.week)
            );
            if (index !== -1) {
                weekData[index].totalIncome = totalIncome;
                weekData[index].totalOrders = totalOrders;
            }
        });

        res.json(weekData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching last 3 months weekly income report", error });
    }
});

// Function to get the first Monday of an ISO week
function getFirstDayOfWeekFromISO(year, week) {
    const firstDayOfYear = new Date(year, 0, 1);
    const daysToMonday = (firstDayOfYear.getDay() === 0 ? 6 : firstDayOfYear.getDay() - 1);
    const firstMonday = new Date(firstDayOfYear);
    firstMonday.setDate(firstDayOfYear.getDate() - daysToMonday + (week - 1) * 7);
    return firstMonday.toISOString().split("T")[0];
}

// current month income
router.get("/reports/last-month-daily-income", async (req, res) => {
    try {
        const now = new Date();
        now.setHours(23, 59, 59, 999);

        // Get the date 30 days ago
        const startOfPeriod = new Date(now);
        startOfPeriod.setDate(startOfPeriod.getDate() - 29); // Including today
        startOfPeriod.setHours(0, 0, 0, 0);

        // MongoDB aggregation pipeline
        const pipeline = [
            {
                $match: {
                    createdAt: { $gte: startOfPeriod, $lte: now },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalIncome: { $sum: "$amountPaid" },
                    totalOrders: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } }, // Sort by date (ascending)
        ];

        const results = await Order.aggregate(pipeline);

        // Generate the last 30 days with just the day of the month (1, 2, 3, ...)
        let dailyData = [];
        let tempDate = new Date(startOfPeriod);

        for (let i = 0; i < 30; i++) {
            const dayOfMonth = tempDate.getDate(); // Get the day of the month (1, 2, 3, ...)
            dailyData.push({
                name: dayOfMonth.toString(), // Just the day number as string
                date: tempDate.toISOString().split("T")[0], // YYYY-MM-DD
                totalIncome: 0,
                totalOrders: 0,
            });

            tempDate.setDate(tempDate.getDate() + 1); // Move to next day
        }

        // Merge database results into dailyData
        results.forEach(({ _id, totalIncome, totalOrders }) => {
            const index = dailyData.findIndex((day) => day.date === _id);
            if (index !== -1) {
                dailyData[index].totalIncome = totalIncome;
                dailyData[index].totalOrders = totalOrders;
            }
        });

        res.json(dailyData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching last month's daily income report", error });
    }
});

//current year income
router.get("/reports/yearly-income", async (req, res) => {
    try {
        const now = new Date();
        now.setHours(23, 59, 59, 999);

        // Get the date 12 months ago
        const startOfYear = new Date(now);
        startOfYear.setMonth(startOfYear.getMonth() - 11); // Include the last 12 months
        startOfYear.setDate(1); // Start from the first day of the month
        startOfYear.setHours(0, 0, 0, 0);

        const pipeline = [
            {
                $match: {
                    createdAt: { $gte: startOfYear, $lte: now },
                },
            },
            {
                $group: {
                    _id: { $month: "$createdAt" }, // Group by month
                    totalIncome: { $sum: "$amountPaid" },
                    totalOrders: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } }, // Sort by month (ascending)
        ];

        const results = await Order.aggregate(pipeline);

        // Generate months array for the last 12 months
        let monthlyData = [];
        let tempDate = new Date(startOfYear);

        for (let i = 0; i < 12; i++) {
            const month = tempDate.getMonth(); // Get the month number (0 = January, 11 = December)
            monthlyData.push({
                name: tempDate.toLocaleString('en-US', { month: 'short' }),// Month abbreviation (e.g., "Jan", "Feb")
                month: month + 1, // Store the month number (1 = January, 12 = December)
                totalIncome: 0,
                totalOrders: 0,
            });

            tempDate.setMonth(tempDate.getMonth() + 1); // Move to the next month
        }

        // Merge database results into monthlyData
        results.forEach(({ _id, totalIncome, totalOrders }) => {
            const index = monthlyData.findIndex((month) => month.month === _id);
            if (index !== -1) {
                monthlyData[index].totalIncome = totalIncome;
                monthlyData[index].totalOrders = totalOrders;
            }
        });

        res.json(monthlyData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching yearly income report", error });
    }
});


export default router