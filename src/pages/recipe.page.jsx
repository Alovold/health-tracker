import { useState, useEffect } from "react"

export default function RecipePage(){
    const [recipeResponse, setRecipeResponse] = useState()
    const [calGoal, setCalGoal] = useState();
    const [proGoal, setProGoal] = useState();
    const [fibGoal, setFibGoal] = useState();
    const [sugGoal, setSugGoal] = useState();
    const [fatGoal, setFatGoal] = useState();

    const getGoals = ()=>{
        setCalGoal(localStorage.getItem("calGoal"))
        setProGoal(localStorage.getItem("proGoal"))
        setFibGoal(localStorage.getItem("fibGoal"))
        setSugGoal(localStorage.getItem("sugGoal"))
        setFatGoal(localStorage.getItem("fatGoal"))
    }

    useEffect(()=>{
        getGoals();
    }, [])

    async function recipeFetch(input){
        const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=2330f2ef&app_key=537d2c1129aba4ab2234a239be1ebdc1&calories=300`;
        const options = {
          method: 'GET',
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setRecipeResponse(result);
        } catch (error) {
            console.error(error);
        }
        }

    return (
        <div>
            <div>
                <p>Current Calorie Goal: {localStorage.getItem("calGoal")}</p>

                <p>Current Protein Goal: {localStorage.getItem("proGoal")}</p>

                <p>Current Fiber Goal: {localStorage.getItem("fibGoal")}</p>

                <p>Current Sugar Limit: {localStorage.getItem("sugGoal")}</p>

                <p>Current Fat Limit: {localStorage.getItem("fatGoal")}</p>
                <button>Get Recipes Based on Form</button>
                <button>Get Recommended Recipes Based on Goals</button>
            </div>
        </div>
    )
}