import React from 'react'
import './index.css'
import Header from './Header'
import Home from './Home'
import Event from './Event'
import CreateEvent from './CreateEvent'
import NoPage from './NoPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header/>}>
            <Route index element={<Home />} />
            <Route path='createevent' element={<CreateEvent/>} />
            <Route path='404' element={<NoPage />} />
            <Route path='/:id' element={<Event />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}