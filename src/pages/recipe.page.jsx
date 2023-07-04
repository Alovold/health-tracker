import { useState, useEffect } from "react"

export default function RecipePage(){
    const [recipeResponse, setRecipeResponse] = useState()

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
            <div className="attribution">
            <div id="edamam-badge" data-color="badge"></div>
            </div>
            <div>

            </div>
        </div>
    )
}