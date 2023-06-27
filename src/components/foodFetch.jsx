
export default async function FoodFetch(){
const url = 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=1lb%20brisket%20with%20fries';
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
} catch (error) {
	console.error(error);
}
}