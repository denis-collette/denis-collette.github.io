import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Header() {
  return (
    <>
    <div className="container">
    <header>
        <a href='/'>
          <img src="./src/assets/logo.png" alt="Cthulhu logo" />
        </a>

        <a href='/'>
          <h1>Didlycthulhudoo</h1>
        </a>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/createevent">Create Event</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <Outlet />
    </>
  )
};