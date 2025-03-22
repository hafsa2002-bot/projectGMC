import axios from 'axios'
import { ArrowRight } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

function RecentCategories() {
    const [recentCategories, setRecentCategories] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3003/admin/items/categories")
        .then(response => setRecentCategories(response.data))
        .catch(error => console.log("Error: ", error))
    }, [])
  return (
    <div>
        <div>
            <p>Categories</p>
            <Link className=' text-blue-600   py-2 font-semibold flex justify-center items-center gap-3'>
                <p>View All</p>
                <div><ArrowRight size={20} /></div>
            </Link>
        </div>
        <div>
        {recentCategories 
            ?(
                <div>
                    {recentCategories.slice(0, 4).map((category, index) => (
                        <div>
                            <p>{category.categoryName}</p>
                        </div>
                    ))}
                </div>
            ):(
                <p>No Categories</p>
            )}
        </div>

    </div>
  )
}

export default RecentCategories
