// Just put all this in the home page, we can worry about moving stuff around once it all works
export default async function FoodFetch(input){
let finalResult;
const url = `https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${input}`;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'ceb6181e97msha7525d0e7f9f296p1511d5jsna51407a657b5',
    'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
  }
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
    finalResult = result;
    return finalResult;
} catch (error) {
	console.error(error);
}
}