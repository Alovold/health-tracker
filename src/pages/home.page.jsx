//import FoodFetch from "../components/foodFetch"
import { useEffect, useState } from "react"
//import config from "../config/index.js";

export default function HomePage(){
    const [userInput, setUserInput] = useState("apple")
    const [foodSearch, setFoodSearch] = useState();
    const [foodResponse, setFoodResponse] = useState();
    // const [nutrientsResponse, setNutrientsResponse] = useState();
    //const [start, setStart] = useState(false);
    const [foodDisplay, setFoodDisplay] = useState("")
    const [foodList, setFoodList] = useState([])
    const [foodListOutput, setFoodListOutput] = useState()


    async function FoodFetch(input){
        const url = `https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?ingr=${input}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
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
            label: foodResponse.food.label,
            calories: foodResponse.food.nutrients.ENERC_KCAL,
            fat: foodResponse.food.nutrients.FAT,
            fiber: foodResponse.food.nutrients.FIBTG,
            protein: foodResponse.food.nutrients.PROCNT
        }
        let tempArr = foodList;
        tempArr.push(tempObj);
        setFoodList(tempArr);
        //console.log(foodList)
        foodOutputRender();
    }


    
    const foodOutputRender = ()=>{
        let tempArr = [];

        //console.log(foodList)
        if (foodList){
        tempArr = foodList.map((item)=>{
            return (
        <div className="CardDisplay">
        <img src={item.image}/>
        <p>{item.label}</p>
        <p>Calories: {item.calories} Cal</p>
        <p>Fat: {item.fat} g</p>
        <p>Fiber: {item.fiber} g</p>
        <p>Protein: {item.protein} g</p>
        </div>
        )});
        }
        setFoodListOutput(tempArr);

    }

    // useEffect(()=>{
    //     foodOutputRender();
    // }, [])

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
                <button type="button" className="Btn" onClick={addFood}>Add to List</button>
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
                {foodListOutput}
            </div>
        </div>
    )

}