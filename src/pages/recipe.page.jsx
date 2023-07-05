import { useState, useEffect } from "react";

export default function RecipePage() {
  const [recipeResponse, setRecipeResponse] = useState("");
  const [recipeDisplay, setRecipeDisplay] = useState();
  const [calSearch, setCalSearch] = useState();
  const [mealTypeSearch, setMealTypeSearch] = useState();
  const [recipeSearch, setRecipeSearch] = useState("");
  const [userInput, setUserInput] = useState();
  const [start, setStart] = useState(false);
  const [calGoal, setCalGoal] = useState();
  const [proGoal, setProGoal] = useState();
  const [fibGoal, setFibGoal] = useState();
  const [sugGoal, setSugGoal] = useState();
  const [fatGoal, setFatGoal] = useState();

  const getGoals = () => {
    setCalGoal(localStorage.getItem("calGoal"));
    setProGoal(localStorage.getItem("proGoal"));
    setFibGoal(localStorage.getItem("fibGoal"));
    setSugGoal(localStorage.getItem("sugGoal"));
    setFatGoal(localStorage.getItem("fatGoal"));
  };

  useEffect(() => {
    getGoals();
  }, []);

  const recipeRender = () => {
    if (start) {
      console.log(recipeResponse[0].recipe.label);
      setRecipeDisplay(
        <div>
          <p>Recipe: {recipeResponse[0].recipe.label}</p>
        </div>
      );
    }
  };

  useEffect(() => {
    recipeRender();
  }, [recipeResponse]);

  const formSubmit = () => {
    searchBuilder();
    setStart(true);
  };

  const calGoalMath = ()=>{
    const storedList = JSON.parse(localStorage.getItem("foodList"));
    let totalCals = 0;
    let calDiff = 0;
    storedList.map((item)=>{
        totalCals += item.calories;
    })
    calDiff = calGoal - totalCals;
    if (calDiff <= 0){
        return 0;
    }
    else {
        return calDiff;
    }
  };

  const goalSubmit = () => {
    setCalSearch(calGoalMath());
    setMealTypeSearch();
    setStart(true);
  };

  const handleMealTypeChange = (event) => {
    setMealTypeSearch(event.target.value);
  };

  const searchBuilder = () => {
    let finalSearch = "";
    if (calSearch) {
      finalSearch = finalSearch + "&calories=" + calSearch;
    }
    if (mealTypeSearch) {
      finalSearch = finalSearch + "&mealType=" + mealTypeSearch;
    }
    setRecipeSearch(finalSearch);
  };

  useEffect(() => {
    searchBuilder();
  }, [calSearch, mealTypeSearch]);

  useEffect(() => {
    recipeFetch();
  }, [recipeSearch]);

  const handleChange = (event) => {
    setCalSearch(event.target.value);
  };

  async function recipeFetch(input) {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=2330f2ef&app_key=537d2c1129aba4ab2234a239be1ebdc1&health=alcohol-free${recipeSearch}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(recipeSearch);
      console.log(result.hits);
      setRecipeResponse(result.hits);
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
        <div className="FormCard">
          <div className="DropdownDiv">
            <select
              multiple="multiple"
              className="DropdownList"
              onChange={handleMealTypeChange}
            >
              <option value=""></option>
              <option value="Breakfast"> Breakfast </option>
              <option value="Dinner"> Dinner </option>
              <option value="Lunch"> Lunch </option>
              <option value="Snack"> Snack </option>
              <option value="Teatime"> Teatime </option>
            </select>
            <select 
            multiple="multiple" 
            className="DropdownList"
            >
              <option selected="" value=""></option>
              <option value="Biscuits and cookies"> Biscuits and cookies </option>
              <option value="Bread"> Bread </option>
              <option value="Cereals"> Cereals </option>
              <option value="Condiments and sauces"> Condiments and sauces </option>
              <option value="Desserts"> Desserts </option>
              <option value="Drinks"> Drinks </option>
              <option value="Main course"> Main course </option>
              <option value="Pancake"> Pancake </option>
              <option value="Preps"> Preps </option>
              <option value="Preserve"> Preserve </option>
              <option value="Salad"> Salad </option>
              <option value="Sandwiches"> Sandwiches </option>
              <option value="Side dish"> Side dish </option>
              <option value="Soup"> Soup </option>
              <option value="Starter"> Starter </option>
              <option value="Sweets"> Sweets </option>
            </select>
          </div>
          <div className="InputField">
            <input type="number" onChange={handleChange} value={userInput} />
          </div>
          <button onClick={formSubmit}>Get Recipes Based on Form</button>
          <button onClick={goalSubmit}>
            Get Recommended Recipes Based on Goals
          </button>
        </div>
        <div>{recipeDisplay}</div>
      </div>
    </div>
  );
}
