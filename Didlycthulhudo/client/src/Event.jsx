import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Navigate } from "react-router";

import useEventsList from "./useEventsList";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export default function Event() {

    const eventID = useParams().id;
    let navigate = useNavigate()
    // Retrieve events list and the current event.
    const eventsList = useEventsList()
    const [currentEvent, setCurrentEvent] = useState(null)

    // setCurrentEvent(fetchedEvent)
    function useSingleEvent(eventID) {
        const baseURL = `http://localhost:3000/api/events/${eventID}`
        const [singleEvent, setSingleEvent] = useState({});
        
        useEffect(() => {
            axios.get(baseURL).then((response) => {
                setCurrentEvent(response.data);
        });
        }, [eventID]);
    
        return singleEvent
    }
    useSingleEvent(eventID)
    
    // Navigate to 404 if currentEvent doesn't exist in eventsList.
    useEffect(() => {
        if (eventsList.length > 0) { 
            const existingEvent = eventsList.some(event => event.id === eventID);
            if (!existingEvent) {
                navigate("/404");
            }
        }
    }, [eventsList, eventID, navigate]);



    // TABLE
    let headerDatesList = []
    
    const renderTableHeader = () => {
        //crée list avec juste date dedans
        console.log(currentEvent.dates)
        for(let i = 0; i < currentEvent.dates.length; i++ ){
            headerDatesList.push(currentEvent.dates[i].date)
        }
        return(
            headerDatesList.map((date) => (
                //ajouter system d'ID
                        <th scope="col" key={uuidv4()}>{displayDateFormat(date)}</th>
            ))
        )
    }

    const displayDateFormat = (date) => {
        if(typeof date === "string"){
            date = date.split("-")
            date = [date[2] ,"-", date[1] ,"-", date[0]]
            return date
        }
    }
            
    const renderRowTable = (indexAtendee) => {
        
        function getAttendeeChoiceForDate(date) {
            if(currentEvent.dates[date].attendees[indexAtendee].available == true){
                return("✅")
            }
            if(currentEvent.dates[date].attendees[indexAtendee].available == false){
                return( "❌" )
            }
            if(currentEvent.dates[date].attendees[indexAtendee].available == null){
                return("❓")
            }
            
        }

        function getName(indexAntendee) {
            let attendeeName = currentEvent.dates[0].attendees[indexAntendee].name
            return (attendeeName)
        }

        return(
            <tr key={uuidv4()}>
                
            <td>{getName(indexAtendee)}</td>
            {
            headerDatesList.map((date, index) => (
            <td key={uuidv4()}>
                {getAttendeeChoiceForDate(index,indexAtendee)}
            </td>
            ))}
        </tr>)
    }
    
    const renderAllRowTable = () =>{
        let numberOfAttendees = currentEvent.dates[0].attendees.length
        
        return(
            (() => {
                const result = [];
                for (let i = 0; i < numberOfAttendees; i++) {
                    result.push(
                    <>
                    {renderRowTable(i)}
                    </>
                );
            }
            return result;
            })()
        )
    }



    // FORM INPUT ATTENDEES
    const [addDateList, setAddDateList] = useState([])
    const [selectedDates, setSelectedDate] = useState([]) //selected date in form
    const dateList = []
    

    const DateListDisplay = () => {
        //create list of currentEvent.dates
        if (dateList.length === 0) {
            for(let i = 0; i < currentEvent.dates.length; i++ ){
                dateList.push(currentEvent.dates[i].date)
            }
        }
        return(
            dateList.map((date) => (
                <>
                <p>{displayDateFormat(date)}
                <label><input type="radio" name={date} key={uuidv4()} value="yes" /> Yes</label>
                <label><input type="radio" name={date} key={uuidv4()} value="no" /> No</label>
                </p>
                </>
            ))
        )
    }

    const addSelectedDate = () => {
        if (checkForDuplicateDate() === false){
            if (selectedDates.length > 0) {
                let addDateListObj = {value: selectedDates, key: uuidv4()}
                // check that date is not already entered
                setAddDateList([...addDateList, addDateListObj]);
            } else {
                alert("please, select a date")
            }
        }
    }

    const addDateSelection = (e) => {
        if(e.target.value.length > 0){
            setSelectedDate(e.target.value)
        }
    }

    const deleteDate = (key) => {
        const newDatesList = addDateList.filter(date => date.key !== key)
        setAddDateList(newDatesList)
    }

    const checkForDuplicateDate = () => {
        for (let i = 0; i < addDateList.length; i++) {
            if (selectedDates == addDateList[i].value) {
                return true
            }
        }
        return false
    }

    const NewDateListHandler = () => {        
        if(addDateList.length > 0){
            return (
                addDateList.map((date) => (
                    <div className="" key={date.key}>
                        <h2>{displayDateFormat(date.value)} <button type="button" onClick={() => deleteDate(date.key)}> Delete </button></h2>
                    </div>
                ))
            )
        }
    }

    const AddNewDate = () => {
        return (
            <>
            <p>Do you want to add another date?</p>
            <input type="Date" id="datesForm" name="dates" value={selectedDates} onChange={addDateSelection} placeholder="Enter the desired dates here" /> 
            <button type="button" onClick={addSelectedDate}> Add Date </button>
            <NewDateListHandler/>
            </>
        )
    }

    const submitAttendee = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target); // big object with form data in it
        let payload = Object.fromEntries(formData); // get data from object
        createAttendeeObjectForDB(payload);
    }

    const createAttendeeObjectForDB = (payload) => {
        // remove id of every dates
        let formatedDate = []
        // Handle check if unique date was selected without a click on add date button
        if(addDateList.length !== 0){
            payload.dates = addDateList;
            for(let i in payload.dates){
                formatedDate.push(payload.dates[i].value)
            }
            payload.dates = formatedDate
        }
        
        // Call API to add inputed new dates to event
        if (payload.dates.length > 0) {
                
                let dateOBJ = {}
                dateOBJ.dates = payload.dates
                console.log("dates obj  " + JSON.stringify(dateOBJ))


                    axios.post(`http://localhost:3000/api/events/${eventID}/add_dates`, 
                        dateOBJ
                    )
                    .then(response => console.log(response.data))
                    .catch(error => console.error(error));
            }

        let attendeeObj = {};
        let availableDates = [];
        let available
        for (let [key, value] of Object.entries(payload)) {
            if (key === "name") {
                attendeeObj.name = value;
            } else if (key === "dates"){
                for (let i of value) {
                    availableDates.push({"date": i, "available": true})
                }
            } else {
                value === "yes" ? available = true : available = false
                availableDates.push({"date": key, "available": available})
            }
            
        }

        attendeeObj.dates = availableDates;
        postAttendee(attendeeObj)
    }

    // const addDatesToCurrentEvent = (dates) =>{


    //     console.log("object send :" + JSON.stringify(dates))

    //     axios.post(`http://localhost:3000/api/events/${eventID}/add_dates`, 
    //         dates
    //     )
    //     .then(response => console.log(response.data))
    //     .catch(error => console.error(error));
    // }
  
    // Add attendee and availability to DB
    const postAttendee = (attendeeObject) =>{
        const baseURL = `http://localhost:3000/api/events/${eventID}/attend`
        axios.post(baseURL, 
            attendeeObject
        )
        .then(function (response) {
            console.log(response);
            window.location.reload(false);
        })
        .catch(function (error) {
            console.log(error);
        });
         
    }

    // Render form to create (or modify?) new attendee
    const InputAttendees = () => {
        return (
            <>
            <h3>Are you available?</h3>
            <form className="newAttendee" onSubmit={submitAttendee}>
                <input placeholder="Enter your name" id="newAttendeeName" name="name" required/>
                <div>
                    <DateListDisplay/>
                </div>
                <div>
                    <AddNewDate/>
                </div>
                <button variant="primary "type="submit" onClick={() => useSingleEvent(eventID)}> Submit attendance </button>
            </form>
            </>
        )
    }

    //quand form terminé, envoyer info à db attendre réponse accusé de réception de db puis seulment call useSingleEvent(eventID) pour refresh tableau
    const DeleteEvent = () => {
        if(confirm("Are you sure you want to delete this page ?")){
            axios.delete(`http://localhost:3000/api/events/${eventID}`)
            .then(response => {
                navigate("/")
                console.log(`Deleted post with ID ${postIdToDelete}`);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }

    const [editedName,setEditName] = useState()
    const [editedDescription,setDescription] = useState()
    const [editedAuthor,setAuthor] = useState()
   



    const EditEventPopUp = () => {
        if(openEditPopUp == true){
            setOpenEditPopUp(false)
        } else{
            setOpenEditPopUp(true)
        }
    }

    const [openEditPopUp,setOpenEditPopUp] = useState(false)



    const SendEditEvent = (e) => {
        EditEventPopUp()
    }

    if(currentEvent == null) {
        return(<p>Loading ...</p>)
    }



    const SendEditToApi = () => {

        let forEditObj = { }

        if(editedName !== undefined){
            forEditObj.name = editedName
        }
        
        if(editedDescription !== null){
            forEditObj.author= editedAuthor
        }
      

        if(editedAuthor !== null){
            forEditObj.description = editedDescription
        }
        

        console.log(forEditObj)

        if(Object.keys(forEditObj).length !== 0 )
            axios.patch(`http://localhost:3000/api/events/${eventID}`, 
                forEditObj
            )
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    }

  

    return (
        <>
        <div className="container">
            <div className="eventDescription">
                <h2>{currentEvent.name || "Loading..."}</h2>
                <p>{currentEvent.description || ""}</p>
                <cite>{currentEvent.author || ""}</cite>
                <br />
                <br />
                <button className="editEventPopUpButton" onClick={() => (EditEventPopUp())}>Edit event</button>
                {openEditPopUp &&
                    <div className="popUp">
                        <p>EDIT</p>
                        <form>
                            <p>Event Name</p>
                            <input type="text" value={editedName || currentEvent.name} name="name"  onChange={(e) => setEditName(e.target.value)}/>
                            <br></br>
                            <p>Event description</p>
                            <input  type="text" value={editedDescription || currentEvent.description } name="description"  onChange={(e) => setDescription(e.target.value)} />
                            <br></br>
                            <p>Event author</p>
                            <input  type="text" value={editedAuthor || currentEvent.author} name="author"  onChange={(e) => setAuthor(e.target.value)}/>
                            <br></br>
                            <br></br>
                            <button className="editEventButton" onClick={() => (SendEditToApi())}>Edit event</button>
                        </form>
                    </div>
                }
            </div>
            <br />
            <div className="inputAttendees">
                {InputAttendees()}
            </div>
            <br />
            <div className="results">
            <table>
                <thead>
                    <tr>
                        <th scope="col"> Name</th>
                        {currentEvent && currentEvent.dates && renderTableHeader()}
                    </tr>
                </thead>
                <tbody>
                        {currentEvent && currentEvent.dates && renderAllRowTable()}
                </tbody>
            </table>
            <button className="deleteEventButton" onClick={DeleteEvent}>Delete event</button>
            </div>
        </div>
        </>
    )
}