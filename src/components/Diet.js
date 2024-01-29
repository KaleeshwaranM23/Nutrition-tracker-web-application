import React, { useEffect, useState } from "react";
import userContext from "../contexts/UserContext";
import { useContext } from "react";
import Header from "./Header";

function Diet()
{

    let loggedData = useContext(userContext);

    const [items, setItems] = useState([]);

    const [date, setDate] = useState(new Date())

    let [total, setTotal] = useState({
        totalCalories : 0,
        totalProtein: 0,
        totalCarbohydrates:0,
        totalFat:0,
        totalFiber:0
    })

    useEffect(()=>{

        fetch(`http://localhost:8000/track/${loggedData.loggedUser.userid}/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${loggedData.loggedUser.token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setItems(data)
        })
        .catch((err)=>{
            console.log(err)
        })

    },[date]) 

    useEffect(()=>{
        calculateTotal()
    },[items])

    function calculateTotal()
    {
        let totalCopy = {
            totalCalories : 0,
            totalProtein: 0,
            totalCarbohydrates:0,
            totalFat:0,
            totalFiber:0
        }

        items.forEach((item)=>{
            totalCopy.totalCalories += item.details.calories;
            totalCopy.totalProtein += item.details.protein;
            totalCopy.totalCarbohydrates += item.details.carbohydrates;
            totalCopy.totalFat += item.details.fat;
            totalCopy.totalFiber += item.details.fiber;
        })

        setTotal(totalCopy);
    }

    return (

        <>
        <section className="diet-container">

            

            <input type="date" onChange={(event)=>{
                setDate(new Date(event.target.value))
            }}/>
            
            {items.map((item)=>{

                return (
                    <div className="item" key={item._id}>
                            
                        <h2>{item.foodId.name} ({item.quantity}g)</h2>

                        <p>Calories {item.details.calories}cal <br/>
                           Protein {item.details.protein}g <br/> 
                           Carbohydrates {item.details.carbohydrates}g <br/>
                           Fat {item.details.fat}g <br/>
                           Fiber {item.details.fiber}g <br/>
                        </p>
                            
                    </div>
                )
            })}

            <div className="item">
                            
            <h2>Today&apos;s Total</h2>
    
                <p>
                    Calories {total.totalCalories}cal <br/>
                    Protein {total.totalProtein}g <br/> 
                    Carbohydrates {total.totalCarbohydrates}g <br/>
                    Fat {total.totalFat}g <br/>
                    Fiber {total.totalFiber}g <br/>
                </p>
                                
            </div>

            <Header />
        
        </section>

        </>
    )
}

export default Diet;