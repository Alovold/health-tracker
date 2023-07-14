//import FoodFetch from "../components/foodFetch"
import { useEffect, useState } from "react"
//import config from "../config/index.js";

export default function HomePage(){
    const [userInput, setUserInput] = useState("");
    const [foodSearch, setFoodSearch] = useState();
    const [foodResponse, setFoodResponse] = useState();
    const [nutrientsResponse, setNutrientsResponse] = useState();
    const [start, setStart] = useState(false);
    const [foodDisplay, setFoodDisplay] = useState("");
    const [foodList, setFoodList] = useState([]);
    const [foodListOutput, setFoodListOutput] = useState();
    const [measureURI, setMeasureURI] = useState("");
    const [foodQuantity, setFoodQuantity] = useState();
    const [measureLabel, setMeasureLabel] = useState("");


    async function FoodFetch(input){
        const url = `https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?ingr=${input}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY_FOOD_SEARCH,
            'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
          }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            if (result.parsed.length != 0){
                setFoodResponse(result.parsed[0]);
                setMeasureURI(result.parsed[0].measure.uri);
                setFoodQuantity(result.parsed[0].quantity);
                setMeasureLabel(result.parsed[0].measure.label);
            }
            else{
                setFoodResponse(result.hints[0]);
                if(result.hints[0].measures){
                setMeasureURI(result.hints[0].measures[0].uri);
                }
                else {
                    setMeasureURI("");
                }
                setFoodQuantity(1);
                if(result.hints[0].measures){
                setMeasureLabel(result.hints[0].measures[0].label);
                }
                else {
                    setMeasureLabel("");
                }
            }
        } catch (error) {
            console.error(error);
        }
        }

        async function NutrientsFetch(){
            if (foodResponse){
            const url = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${process.env.REACT_APP_NUTRITION_ID}&app_key=${process.env.REACT_APP_NUTRITION_KEY}`;
            const options = {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                ingredients: [
                    {
                        quantity: foodQuantity,
                        measureURI: measureURI,
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
            quantity: foodQuantity,
            measure: measureLabel,
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
        let temp = localStorage.getItem("foodList");
        if(temp){
        setFoodList(JSON.parse(localStorage.getItem("foodList")));
        }
    }

    useEffect(()=>{
        getFoodList();
    }, [])

    const resetList = ()=>{
        localStorage.setItem("foodList", []);
        setFoodList([]);
        
    }

    
    const foodOutputRender = ()=>{
        let tempArr = [];
        
        if(localStorage.getItem("foodList")){
        const storedList = JSON.parse(localStorage.getItem("foodList"))
        
        //console.log(foodList)
        if (storedList){
        tempArr = storedList.map((item)=>{
            return (
                <div className="CardDiv">
        <div className="RecipeCard">
        <img className="CardImg"src={item.image}/>
        <div className="CardText">
        <p>{item.quantity} {item.measure} {item.label}</p>
        <p>Calories: {item.calories} Cal</p>
        <p>Fat: {Math.round(item.fat * 100) / 100} g</p>
        <p>Fiber: {Math.round(item.fiber * 100) / 100} g</p>
        <p>Protein: {Math.round(item.protein * 100) / 100} g</p>
        <p>Sugar: {Math.round(item.sugar * 100) / 100} g</p>
        </div>
        </div>
        </div>
        )});
        }
    }
    setFoodListOutput(tempArr);
    }

    useEffect(()=>{
        foodOutputRender();
    }, [foodList])

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
                <img className="CardImg" src={foodResponse.food.image}/>
                <p>{foodQuantity} {measureLabel} {foodResponse.food.label}</p>
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
            <h3>Your Food List</h3>
                {foodListOutput}
                <button onClick={resetList}>Reset List</button>
            </div>
        </div>
    )

}