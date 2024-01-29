import React, { useEffect, useState }from "react";
import userContext from "../contexts/UserContext";
import { useContext } from "react";
/* eslint-disable react/prop-types */

function Food(props)
{

    const [eatenQuantity, setEatenQuantity] = useState(100);
    const [food, setFood] = useState({});
    const [foodInitial, setFoodInitial] = useState({});
    let loggedData = useContext(userContext);

    useEffect(()=>{
        setFood(props.food);
        setFoodInitial(props.food);
    },[props.food])

    
    function calculate(event)
    {

        let quantity = Number(event.target.value);
        setEatenQuantity(quantity);

        let copyFood = {...food}

            copyFood.protein = (foodInitial.protein*quantity)/100;
            copyFood.carbohydrates = (foodInitial.carbohydrates*quantity)/100;
            copyFood.fat = (foodInitial.fat*quantity)/100;
            copyFood.fiber = (foodInitial.fiber*quantity)/100;
            copyFood.calories = (foodInitial.calories*quantity)/100;

        setFood (copyFood);   
    }

    function trackFoodItem()
    {
        let trackedItem = {
            userId:loggedData.loggedUser.userid,
            foodId:food._id,
            details:{
                calories: food.calories,
                protein: food.protein,
                carbohydrates: food.carbohydrates,
                fat: food.fat,
                fiber: food.fiber 
            },
            quantity:eatenQuantity
        }

        console.log(trackedItem);

        fetch("http://localhost:8000/track",{
            method:"POST",
            body:JSON.stringify(trackedItem),
            headers:{
                "Authorization": `Bearer ${loggedData.loggedUser.token}`,
                "content-Type": "application/json"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    return (

        <div className="food">

            <div className="food-img-div">
                <div className="food-img">
                    <img className="food-image" src={food.image}/>
                </div>
                <h1> {food.name} / {eatenQuantity}g <br/> ({food.calories}Kcal)</h1>
            </div>

            <div className="nutrient-div">
                <div className="nutrient">
                    <p className="n-title">Protein</p>
                    <p className="n-value">{food.protein}g</p>
                </div>

                <div className="nutrient">
                    <p className="n-title">Carbohydrates</p>
                    <p className="n-value">{food.carbohydrates}g</p>
                </div>

                <div className="nutrient">
                    <p className="n-title">Fat</p>
                    <p className="n-value">{food.fat}g</p>
                </div>

                <div className="nutrient">
                    <p className="n-title">Fiber</p>
                    <p className="n-value">{food.fiber}g</p>
                </div>
            </div>

            <div className="q-inp">
                <input className="inp" type="number" onChange={calculate} placeholder="How many grams you ate? " min={1}/>
                <button className="btn" onClick={trackFoodItem}>Track</button>
            </div>

        </div>
    )

}

export default Food;