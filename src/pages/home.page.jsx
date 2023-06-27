import FoodFetch from "../components/foodFetch"
import { useEffect } from "react"

export default function HomePage(){
    useEffect(()=>{
        FoodFetch();
    }, [])

    return(
        <div>
            <p>It begins</p>
        </div>
    )

}