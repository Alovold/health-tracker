//import FoodFetch from "../components/foodFetch"
import { useEffect, useState } from "react"

export default function HomePage(){
    const [userInput, setUserInput] = useState("apple")
    const [foodSearch, setFoodSearch] = useState();
    const [foodResponse, setFoodResponse] = useState();
    // const [nutrientsResponse, setNutrientsResponse] = useState();
    //const [start, setStart] = useState(false);
    const [foodDisplay, setFoodDisplay] = useState("")
    const [foodList, setFoodList] = useState([])


    async function FoodFetch(input){
        const url = `https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?ingr=${input}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'ceb6181e97msha7525d0e7f9f296p1511d5jsna51407a657b5',
            'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
          }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setFoodResponse(result.hints[0]);
        } catch (error) {
            console.error(error);
        }
        }

        //function for the "Post" half of Edamam API for additional nutrition info, currently unable to locate syntax for post body
    // async function NutrientsFetch(){

    // }

    const addFood = ()=>{
        let tempObj = {
            image: foodResponse.food.image,
            name: foodResponse.food.label,
            Calories: foodResponse.food.nutrients.ENERC_KCAL,
            Fat: foodResponse.food.nutrients.FAT,
            Fiber: foodResponse.food.nutrients.FIBTG,
            Protein: foodResponse.food.nutrients.PROCNT
        }
    }


    const handleChange = (event)=>{
        setUserInput(event.target.value);
    }

    const submitFoodSearch = ()=>{
        setFoodSearch(userInput);
        console.log(userInput);
        //setStart(true);
    }
    useEffect(()=>{
        FoodFetch(foodSearch);
    }, [foodSearch])

    const renderFoodResponse = ()=>{
        let tempArr = [];
        if (foodResponse){
            // tempArr = foodResponse.map((data)=>{
            tempArr.push(<div className="SearchDisplay">
                <img src={foodResponse.food.image}/>
                <p>{foodResponse.food.label}</p>
                <p>Calories: {foodResponse.food.nutrients.ENERC_KCAL} Cal</p>
                <p>Fat: {foodResponse.food.nutrients.FAT} g</p>
                <p>Fiber: {foodResponse.food.nutrients.FIBTG} g</p>
                <p>Protein: {foodResponse.food.nutrients.PROCNT} g</p>
                <button type="button" className="Btn" onClick={}>Add to List</button>
                </div>)
            //     console.log(data)
            // })
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
                {foodDisplay}
            </div>
        </div>
    )

}