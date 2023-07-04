import { useState } from "react";

export default function GoalsPage() {
    const [calInput, setCalInput] = useState();
    const [proInput, setProInput] = useState();
    const [fibInput, setFibInput] = useState();
    const [sugInput, setSugInput] = useState();
    const [fatInput, setFatInput] = useState();

    const handleCalChange = (event)=>{
        setCalInput(event.target.value);
    }

    const handleProChange = (event)=>{
        setProInput(event.target.value);
    }

    const handleFibChange = (event)=>{
        setFibInput(event.target.value);
    }

    const handleSugChange = (event)=>{
        setSugInput(event.target.value);
    }

    const handleFatChange = (event)=>{
        setFatInput(event.target.value);
    }

    const saveGoals = ()=>{
        if(calInput){
            localStorage.setItem("calGoal", calInput);
        }
        if(proInput){
            localStorage.setItem("proGoal", proInput);
        }
        if(fibInput){
            localStorage.setItem("fibGoal", fibInput);
        }
        if(sugInput){
            localStorage.setItem("sugGoal", sugInput);
        }
        if(fatInput){
            localStorage.setItem("fatGoal", fatInput);
        }
    }

    return (
        <div>
            <div className="InputField">
                <label htmlFor="calInput">Calorie Goal</label>
                <input  id="calInput" type="number" onChange={handleCalChange} value={calInput}/>
                <p>Current Calorie Goal: {localStorage.getItem("calGoal")}</p>
            </div>
            <div className="InputField">
                <label htmlFor="proInput">Protein Goal</label>
                <input id="proInput" type="number" onChange={handleProChange} value={proInput}/>
                <p>Current Protein Goal: {localStorage.getItem("proGoal")}</p>
            </div>
            <div className="InputField">
                <label htmlFor="fibInput">Fiber Goal</label>
                <input id="fibInput" type="number" onChange={handleFibChange} value={fibInput}/>
                <p>Current Fiber Goal: {localStorage.getItem("fibGoal")}</p>
            </div>
            <div className="InputField">
                <label htmlFor="sugInput">Sugar Limit</label>
                <input id="sugInput" type="number" onChange={handleSugChange} value={sugInput}/>
                <p>Current Sugar Limit: {localStorage.getItem("sugGoal")}</p>
            </div>
            <div className="InputField">
                <label htmlFor="fatInput">Fat Limit</label>
                <input id="fatInput" type="number" onChange={handleFatChange} value={fatInput}/>
                <p>Current Fat Limit: {localStorage.getItem("fatGoal")}</p>
            </div>
            <button className="Btn" onClick={saveGoals}>Submit</button>
            
        </div>
    )
}