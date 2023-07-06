import { useState, useEffect } from "react";

export default function RecipePage() {
  const [recipeResponse, setRecipeResponse] = useState("");
  const [recipeDisplay, setRecipeDisplay] = useState();
  const [calSearch, setCalSearch] = useState();
  const [proSearch, setProSearch] = useState();
  const [fibSearch, setFibSearch] = useState();
  const [sugSearch, setSugSearch] = useState();
  const [fatSearch, setFatSearch] = useState();
  const [mealTypeSearch, setMealTypeSearch] = useState();
  const [mealTypeInput, setMealTypeInput] = useState();
  const [dishTypeSearch, setDishTypeSearch] = useState();
  const [dishTypeInput, setDishTypeInput] = useState();
  const [recipeSearch, setRecipeSearch] = useState("");
  const [userInput, setUserInput] = useState();
  const [start, setStart] = useState(false);
  const [searchNum, setSearchNum] = useState(0);
  const [calGoal, setCalGoal] = useState(0);
  const [proGoal, setProGoal] = useState(0);
  const [fibGoal, setFibGoal] = useState(0);
  const [sugGoal, setSugGoal] = useState(0);
  const [fatGoal, setFatGoal] = useState(0);
  const [calCurrent, setCalCurrent] = useState(0);
  const [proCurrent, setProCurrent] = useState(0);
  const [fibCurrent, setFibCurrent] = useState(0);
  const [sugCurrent, setSugCurrent] = useState(0);
  const [fatCurrent, setFatCurrent] = useState(0);

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
      let tempArr = [];

      tempArr = recipeResponse.map((item) => {
        return (
            <div className="CardDiv">
            <p>Recipe: {item.recipe.label}</p>
          <div className="RecipeCard">
            <img className="CardImg" src={item.recipe.image}/>
            <div className="CardText">
            <p>Total Calories: {Math.round(item.recipe.calories * 100) / 100}</p>
            <p>Total Protein: {Math.round(item.recipe.totalNutrients.PROCNT.quantity * 100) / 100} {item.recipe.totalNutrients.PROCNT.unit}</p>
            <p>Total Fiber: {Math.round(item.recipe.totalNutrients.FIBTG.quantity * 100) / 100} {item.recipe.totalNutrients.FIBTG.unit}</p>
            <p>Total Sugar: {Math.round(item.recipe.totalNutrients.SUGAR.quantity * 100) / 100} {item.recipe.totalNutrients.SUGAR.unit}</p>
            <p>Total Fat: {Math.round(item.recipe.totalNutrients.FAT.quantity * 100) / 100} {item.recipe.totalNutrients.FAT.unit}</p>
            <p>Servings made: {item.recipe.yield}</p>
            <a href={item.recipe.url} target="_blank">Link to Recipe</a>
            </div>
          </div>
          </div>
        );
      });
      setRecipeDisplay(tempArr);
    }
  };

  useEffect(() => {
    recipeRender();
  }, [recipeResponse]);

  const calGoalMath = () => {
    if(localStorage.getItem("foodList")){
    const storedList = JSON.parse(localStorage.getItem("foodList"));
    let total = 0;
    let diff = 0;
    storedList.map((item) => {
      total += item.calories;
    });
    setCalCurrent(total);
    diff = calGoal - total;
    if (diff <= 0) {
      return 0;
    } else {
      return diff;
    }
} else {return 0;}
  };

  const proGoalMath = () => {
    if(localStorage.getItem("foodList")){
    const storedList = JSON.parse(localStorage.getItem("foodList"));
    let total = 0;
    let diff = 0;
    storedList.map((item) => {
      total += item.protein;
    });
    setProCurrent(total);
    diff = proGoal - total;
    if (diff <= 0) {
      return 0;
    } else {
      return diff;
    }
} else {return 0;}
  };

  const fibGoalMath = () => {
    if(localStorage.getItem("foodList")){
    const storedList = JSON.parse(localStorage.getItem("foodList"));
    let total = 0;
    let diff = 0;
    storedList.map((item) => {
      total += item.fiber;
    });
    setFibCurrent(total);
    diff = fibGoal - total;
    if (diff <= 0) {
      return 0;
    } else {
      return diff;
    }
} else {return 0;}
  };

  const sugGoalMath = () => {
    if(localStorage.getItem("foodList")){
    const storedList = JSON.parse(localStorage.getItem("foodList"));
    let total = 0;
    let diff = 0;
    storedList.map((item) => {
      total += item.sugar;
    });
    setSugCurrent(total);
    diff = sugGoal - total;
    if (diff <= 0) {
      return 0;
    } else {
      return diff;
    }
} else {return 0;}
  };

  const fatGoalMath = () => {
    if(localStorage.getItem("foodList")){
    const storedList = JSON.parse(localStorage.getItem("foodList"));
    let total = 0;
    let diff = 0;
    storedList.map((item) => {
      total += item.fat;
    });
    setFatCurrent(total);
    diff = fatGoal - total;
    if (diff <= 0) {
      return 0;
    } else {
      return diff;
    }
} else {return 0;}
  };

  const formSubmit = () => {
    setProSearch(0);
    setFibSearch(0);
    setSugSearch(0);
    setFatSearch(0);
    setCalSearch(userInput);
    setMealTypeSearch(mealTypeInput);
    setDishTypeSearch(dishTypeInput);
    setStart(true);
    setSearchNum(searchNum + 1);
  };

  const goalSubmit = () => {
    setProSearch(proGoalMath());
    setFibSearch(fibGoalMath());
    setSugSearch(sugGoalMath());
    setFatSearch(fatGoalMath());
    setCalSearch(calGoalMath());
    setMealTypeSearch(mealTypeInput);
    setDishTypeSearch(dishTypeInput);
    setStart(true);
    setSearchNum(searchNum + 1);
  };

  useEffect(()=>{
    proGoalMath();
    fibGoalMath();
    sugGoalMath();
    fatGoalMath();
    calGoalMath();
  }, [])

  const handleMealTypeChange = (event) => {
    setMealTypeInput(event.target.value);
  };

  const handleDishTypeChange = (event) => {
    setDishTypeInput(event.target.value);
  };

  const searchBuilder = () => {
    let finalSearch = "";
    if (calSearch) {
      finalSearch = finalSearch + "&calories=" + calSearch;
    }
    if (proSearch > 0) {
      finalSearch = finalSearch + "&nutrients%5BPROCNT%5D=" + Math.round(proSearch) + "%2B";
    }
    if (fibSearch > 0) {
      finalSearch = finalSearch + "&nutrients%5BFIBTG%5D=" + Math.round(fibSearch) + "%2B";
    }
    if (sugSearch > 0) {
      finalSearch = finalSearch + "&nutrients%5BSUGAR%5D=" + Math.round(sugSearch);
    }
    if (fatSearch > 0) {
      finalSearch = finalSearch + "&nutrients%5BFAT%5D=" + Math.round(fatSearch);
    }
    if (mealTypeSearch) {
      finalSearch = finalSearch + "&mealType=" + mealTypeSearch;
    }
    if (dishTypeSearch) {
      finalSearch = finalSearch + "&dishType=" + dishTypeSearch;
    }
    setRecipeSearch(finalSearch);
  };

  useEffect(() => {
    searchBuilder();
  }, [
    mealTypeSearch,
    dishTypeSearch,
    proSearch,
    fibSearch,
    sugSearch,
    fatSearch,
    searchNum,
  ]);

  useEffect(() => {
    recipeFetch();
  }, [recipeSearch]);

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  async function recipeFetch() {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_RECIPE_ID}&app_key=${process.env.REACT_APP_RECIPE_KEY}&health=alcohol-free&random=true${recipeSearch}`;
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
        <p>Current Calorie Goal: {Math.round(calCurrent * 100) / 100} / {localStorage.getItem("calGoal")}</p>
        <p>Current Protein Goal: {Math.round(proCurrent * 100) / 100} / {localStorage.getItem("proGoal")}</p>
        <p>Current Fiber Goal: {Math.round(fibCurrent * 100) / 100} / {localStorage.getItem("fibGoal")}</p>
        <p>Current Sugar Limit: {Math.round(sugCurrent * 100) / 100} / {localStorage.getItem("sugGoal")}</p>
        <p>Current Fat Limit: {Math.round(fatCurrent * 100) / 100} / {localStorage.getItem("fatGoal")}</p>
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
              onChange={handleDishTypeChange}
            >
              <option selected="" value=""></option>
              <option value="Biscuits and cookies">
                {" "}
                Biscuits and cookies{" "}
              </option>
              <option value="Bread"> Bread </option>
              <option value="Cereals"> Cereals </option>
              <option value="Condiments and sauces">
                {" "}
                Condiments and sauces{" "}
              </option>
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
            <label>Calories to Search</label>
            <input type="number" onChange={handleChange} value={userInput} />
          </div>
          <button onClick={formSubmit}>Get Recipes Based on Calorie Input</button>
          <button onClick={goalSubmit}>
            Get Recommended Recipes Based on Goals
          </button>
        </div>
        <div>{recipeDisplay}</div>
      </div>
    </div>
  );
}
