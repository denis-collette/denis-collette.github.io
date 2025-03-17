import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function useEventsList() {
    const baseURL = "http://localhost:3000/api/events"
    const [eventsList, setEventsList] = useState([]);
    
    useEffect(() => {
        axios.get(baseURL).then((response) => {
        setEventsList(response.data);
    });
    }, []);

    return eventsList
}