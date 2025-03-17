import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useEventsList from "./useEventsList";
import axios from "axios";


export default function Home() {

    const [eventsList,setEventsList] = useState(null)
    const [filteredList, setFilteredList] = useState(null)

    function playHello() {
        var audio = document.getElementById("audioHello");
        audio.play();
    }

    function GetAllEvent() {
        const baseURL = `http://localhost:3000/api/events/`
        const [singleEvent, setSingleEvent] = useState({});
        
        useEffect(() => {
            axios.get(baseURL).then((response) => {
                setEventsList(response.data);
                setFilteredList(response.data)
        });
        }, []);
    
        return singleEvent
    }
    GetAllEvent()
   

    let researchInput = ""
    function UpdateResearchInput(value){
        researchInput = value
        let forfilteredList = []
        let flag = true
        console.log(eventsList)

        if(researchInput !== ""){
            for(let i = 0; i < eventsList.length; i++){
                for(let j = 0; j <researchInput.length; j++ ){
                    console.log(researchInput[j].toLowerCase() + eventsList[i].name[j].toLowerCase())
                    if(researchInput[j].toLowerCase() !== eventsList[i].name[j].toLowerCase() ){
                        flag = false
                    }
                }
                if(flag == true){
                    forfilteredList.push(eventsList[i])
                    console.log(forfilteredList)
                }
                flag = true
            }
            setFilteredList(forfilteredList)
        }else{
            setFilteredList(eventsList)
        }
    }

    console.log("filteredList " +  filteredList)
    function DisplayList(){
        if(filteredList == null){
            return(

                <p>loading</p>
            )
        }
        return(
            <ul className="EventsList">
                            {filteredList.map((events) => (
                                <div className="event" key={events.id}>
                                <li>
                                    <Link to={`${events.id}`}>{events.name}</Link>
                                </li>
                                </div>
                            ))}
                        </ul>
        )
    }






    // function LoadList(){
    //     console.log("sallut" )
    //     setFilteredList(eventsList)
        
    // }

    
    if(eventsList == null){

        return(
            <p>loading</p>
        )
    }


    return (
        <>
        <div className="container">
            <div className="Intro">
                <h2>What do you want to Cthuludoo?</h2>
                <img src="./src/assets/turtle.png" alt="Mine turtle" onClick={playHello} className="Turtle" title="Click me!"/>
                <audio id="audioHello" src="./src/assets/hello.mp3"></audio>
                <p>The most merciful thing in the world, I think, is the inability of the human mind 
                    to correlate all its contents. We live on a placid island of ignorance in the midst 
                    of black seas of infinity, and it was not meant that we should voyage far. 
                    The sciences, each straining in its own direction, have hitherto harmed us little; 
                    but some day the piecing together of dissociated knowledge will open up such terrifying 
                    vistas of reality, and of our frightful position therein, that we shall either go mad from 
                    the revelation or flee from the light into the peace and safety of a new dark age.</p>
            </div>

            <div className="DisplayEvents">
                <h2>
                    All Events            
                </h2>

                <input type="search" id="site-search"  name="q" placeholder="research events" onChange={(e) => UpdateResearchInput(e.target.value)}/>
                <DisplayList/>
            </div>
        </div>
        </>
    )
}

// alternate mine turtle: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShpTBeE-3xPYIxjSfY0P6nPzgBGMMmDFKqXA&s