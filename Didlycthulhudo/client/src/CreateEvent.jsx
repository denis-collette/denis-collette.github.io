import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useParams, useNavigate, Navigate } from "react-router";


export default function CreateEvent() {

    let navigate = useNavigate()
    const[dateList, setdateList] = useState([])

    const[selectedDates, setSelectedDate] = useState([]) //selected date in form

    const baseURL = "http://localhost:3000/api/events"
    
    const postEvent = (eventObjet) =>{
        axios.post(baseURL, 
            eventObjet
        )
        .then(function (response) {
            console.log(response.data.id);
            navigate("/"+response.data.id);
        })
        .catch(function (error) {
            console.log(error);
        });

    }

 

    const addDateSelection = (e) => {
        if(e.target.value.length > 0){
            setSelectedDate( e.target.value)
        }
    }

    const deleteDate = (key) => {
        const newDatesList = dateList.filter(date => date.key !== key)
        setdateList(newDatesList)
    }

    const addDateToList = () => {
        if (checkForDuplicateDate() === false){
            if (selectedDates.length > 0) {
                let dateListObj = { value : selectedDates, key : uuidv4()}
                // check that date is not already entered
                setdateList([...dateList, dateListObj]);
            } else {
                alert("please, select a date")
            }
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        // key name created from input
        const formData = new FormData(e.target); // big object with form data in it
        let payload = Object.fromEntries(formData); // get data from object
        createEventObjectForDB(payload);
    }

    const createEventObjectForDB = (payload) => {        
        // remove id of every dates
        let formatedDate = []
        // Handle check if unique date was selected without a click on add date button
        if(dateList.length !== 0){
            payload.dates = dateList;
            for(let i in payload.dates){
                formatedDate.push(payload.dates[i].value)
            }
            payload.dates = formatedDate
        }
        let eventObject = {}
        eventObject.name = payload.name;
        eventObject.dates = payload.dates;
        eventObject.author = payload.author;
        eventObject.description = payload.description;
        // eventObject = JSON.stringify(eventObject)
        postEvent(eventObject) 
    }

    // input  = string YYYY-MM-DD
    // output = string DD-MM-YYYY
    const displayDateFormat = (date) => {
        if(typeof date === "string"){
            date = date.split("-")
            date = [date[2] ,"-", date[1] ,"-", date[0]]
            return date
        } else {
            return "no date entered"
        }
    }

    const DateListHandler = () => {        
        if(dateList.length > 0){
            return (
                dateList.map((date) => (
                    <div className="container" key={date.key}>
                        <h2>{displayDateFormat(date.value)} <button type="button" onClick={() => deleteDate(date.key)}> delete </button></h2>
                    </div>
                ))
            )
        }
    }

    const checkForDuplicateDate = () => {
        for (let i = 0; i < dateList.length; i++) {
            if (selectedDates == dateList[i].value) {
                return true
            }
        }
        return false
    }

    return (
        <>
        <div className="container">
            <form className="FormNewEvent" onSubmit={submitForm}>
                <label htmlFor="name">Event name : </label>
                <br/>
                <input type="text" id="eventNameForm" name="name" placeholder="Your event Name" required/>
                <br/>
                <label htmlFor="name">Event description : </label>
                <br/>
                <input type="text" id="descriptionForm" name="description" placeholder="Your event description" required/> 
                <br/>
                <label htmlFor="name">Your name : </label>
                <br/>
                <input type="text" id="authorForm" name="author" placeholder="Author's name" required/> 
                <br/>
                <input type="Date" id="datesForm" name="dates" value={selectedDates} onChange={addDateSelection} placeholder="Enter the desired dates here" required/> 
                <button type="button" onClick={addDateToList}> Add Date </button> 
                <br></br>
                <DateListHandler/>
                <button variant="primary "type="submit"> Submit Event </button>
            </form>
        </div>
        </>
    )
}