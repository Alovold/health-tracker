//import FoodFetch from "../components/foodFetch"
import { useEffect, useState } from "react"
//import config from "../config/index.js";

export default function HomePage(){
    const [userInput, setUserInput] = useState("")
    const [foodSearch, setFoodSearch] = useState();
    const [foodResponse, setFoodResponse] = useState();
    const [nutrientsResponse, setNutrientsResponse] = useState();
    const [start, setStart] = useState(false);
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
            setFoodResponse(result.parsed[0]);
        } catch (error) {
            console.error(error);
        }
        }

        async function NutrientsFetch(){
            if (foodResponse){
            const url = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=5acdf7a2&app_key=%2046c8ecc03e52de97010eb0abe25203fa%09`;
            const options = {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                ingredients: [
                    {
                        quantity: foodResponse.quantity,
                        measureURI: foodResponse.measure.uri,
                        qualifiers: [],
                        foodId: foodResponse.food.foodId
                    }
                ]
            })
            };
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
                setNutrientsResponse(result);
            } catch (error) {
                console.error(error);
            }
        }
            }

            useEffect(()=>{
                NutrientsFetch();
            }, [foodResponse])

    const addFood = ()=>{
        let tempObj = {
            quantity: foodResponse.quantity,
            measure: foodResponse.measure.label,
            image: foodResponse.food.image,
            label: foodResponse.food.label,
            calories: nutrientsResponse.calories,
            fat: nutrientsResponse.totalNutrients.FAT.quantity,
            fiber: nutrientsResponse.totalNutrients.FIBTG.quantity,
            protein: nutrientsResponse.totalNutrients.PROCNT.quantity,
            sugar: nutrientsResponse.totalNutrients.SUGAR.quantity
        }
        let tempArr = foodList;
        tempArr.push(tempObj);
        setFoodList(tempArr);
        //console.log(foodList)
        saveFoodList()
        foodOutputRender();
    }

    const saveFoodList = ()=>{
        localStorage.setItem("foodList", JSON.stringify(foodList))
    }

    const getFoodList = ()=>{
        setFoodList(JSON.parse(localStorage.getItem("foodList")));
    }

    useEffect(()=>{
        getFoodList();
    }, [])

    
    const foodOutputRender = ()=>{
        let tempArr = [];
        const storedList = JSON.parse(localStorage.getItem("foodList"))
        //console.log(foodList)
        if (storedList){
        tempArr = storedList.map((item)=>{
            return (
        <div className="CardDisplay">
        <img src={item.image}/>
        <p>{item.quantity} {item.measure} {item.label}</p>
        <p>Calories: {item.calories} Cal</p>
        <p>Fat: {Math.round(item.fat * 100) / 100} g</p>
        <p>Fiber: {Math.round(item.fiber * 100) / 100} g</p>
        <p>Protein: {Math.round(item.protein * 100) / 100} g</p>
        <p>Sugar: {Math.round(item.sugar * 100) / 100} g</p>
        </div>
        )});
        }
        setFoodListOutput(tempArr);

    }

    useEffect(()=>{
        foodOutputRender();
    }, [])

    const handleChange = (event)=>{
        setUserInput(event.target.value);
    }

    const submitFoodSearch = ()=>{
        setFoodSearch(userInput);
        //console.log(userInput);
        setStart(true);
    }
    useEffect(()=>{
        FoodFetch(foodSearch);
    }, [foodSearch])

    const renderFoodResponse = ()=>{
        let tempArr = [];
        if (nutrientsResponse){
            // tempArr = foodResponse.map((data)=>{
            tempArr.push(<div className="SearchDisplay">
                <img src={foodResponse.food.image}/>
                <p>{foodResponse.quantity} {foodResponse.measure.label} {foodResponse.food.label}</p>
                <p>Calories: {nutrientsResponse.calories} Cal</p>
                <p>Fat: {Math.round(nutrientsResponse.totalNutrients.FAT.quantity * 100) / 100} g</p>
                <p>Fiber: {Math.round(nutrientsResponse.totalNutrients.FIBTG.quantity * 100) / 100} g</p>
                <p>Protein: {Math.round(nutrientsResponse.totalNutrients.PROCNT.quantity * 100) / 100} g</p>
                <p>sugar: {Math.round(nutrientsResponse.totalNutrients.SUGAR.quantity * 100) / 100} g</p>
                <button type="button" className="Btn" onClick={addFood}>Add to List</button>
                </div>)
            //     console.log(data)
            // })
        }
        setFoodDisplay(tempArr);
    }

    useEffect(()=>{
        renderFoodResponse()
    }, [nutrientsResponse])

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