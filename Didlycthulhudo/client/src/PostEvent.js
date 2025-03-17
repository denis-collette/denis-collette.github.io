import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function PostEvent(event) {
  console.log("sent event :" + event)
  const baseURL = "/http://localhost:3000//api/events"
    axios.post(baseURL,
        event
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}