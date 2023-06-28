import FoodFetch from "../components/foodFetch"
import { useEffect, useState } from "react"

export default function HomePage(){
    const [userInput, setUserInput] = useState("")
    const [foodSearch, setFoodSearch] = useState();
    const [foodResponse, setFoodResponse] = useState([]);
    const [start, setStart] = useState(false);
    const [foodDisplay, setFoodDisplay] = useState("")

    const handleChange = (event)=>{
        setUserInput(event.target.value);
    }

    const submitFoodSearch = ()=>{
        //setFoodSearch(userInput);
        console.log(FoodFetch(userInput));
        setStart(true);
    }
    // useEffect(()=>{
    //     setFoodResponse(FoodFetch(foodSearch));
    // }, [foodSearch])

    const renderFoodResponse = ()=>{
        let tempArr = [];
        if (foodResponse){
            tempArr = foodResponse.map((data)=>{
                <p>{data.name}</p>
            })
        }
        setFoodDisplay(tempArr);
    }

    useEffect(()=>{
        renderFoodResponse()
    }, [foodResponse])

    return(
        <div>
            <div className="FormCard">
                <p>Type what you've eaten today! (More details will give better response accuracy!)</p>
                <div className="InputField">
                    <input type="text" onChange={handleChange} value={userInput}/>
                    <button className="Btn" onClick={submitFoodSearch}>Submit</button>
                </div>
            </div>
            <div>
                {start ? foodDisplay : ""}
            </div>
        </div>
    )

}