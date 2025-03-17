import React from "react";

export default function NoPage() {

    function play404() {
        var audio = document.getElementById("audio404");
        audio.play();
    }    

    return (
        <>
        <div className="container">
            <div className="error404">
                <img src="./src/assets/404.png" alt="" style={{height:'250px'}} onClick={play404}/>
                <audio id="audio404" src="./src/assets/404.mp3"></audio>
                <h1>Cthulhu ate this page... Run!</h1>
            </div>
        </div>
        </>
    )
};