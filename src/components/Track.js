import React, { useState } from "react";
import userContext from "../contexts/UserContext";
import { useContext } from "react";
import Food from "./Food";
import Header from "./Header";


function Track()
{
    
    const loggedData = useContext(userContext);

    const [foodItems,setFoodItems] = useState([]);

    const [food, setFood] = useState(null);

    function SearchFood(event){

        if(event.target.value!==""){

            fetch(`http://localhost:8000/foods/${event.target.value}`,{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+loggedData.loggedUser.token
            }

            })
            .then((response)=>response.json())
            .then((data)=>{
                if(data.message===undefined)
                {
                    setFoodItems(data);
                }
                else
                {
                    setFoodItems([]);
                }
            })
            .catch((err)=>{
                console.log(err)
            })

        }
        else
        {
            setFoodItems([]);
        }
    }

    function disappear(){
        document.getElementById("disappear").style.display="none";
    }



    return (
        <>
        
            <section className="container tracking">

                <div className="contain-track">

                    <div className="user-name">

                        <p>
                            Welcome {loggedData.loggedUser.name} !!!
                        </p>

                    </div>

                    <div className="search">

                        <input className="search-inp" onChange={SearchFood} type="search" placeholder="Search Food"/>


                            {foodItems.length===0?(
                                <div id="disappear" className="message">
                                    <h1>Search your Food here</h1>
                                </div>
                                
                                ):null

                            }
                        
                            {foodItems.length!==0?(
                                <div className="search-result" id="disappear" onClick={disappear}>

                                    {
                                        foodItems.map((item)=>{
                                            return (
                                                <p className="item" onClick={()=>{
                                                    setFood(item)
                                                }} key={item._id}>{item.name}</p>
                                            )
                                        })
                                    }

                                </div>
                            ):null
                        }
                        
                    </div>

                    {
                        food !== null?(
                            <Food food = {food}/>
                        ):null
                    }

                </div>

                <Header />

            </section>

        </>
    )
}

export default Track;