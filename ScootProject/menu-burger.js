const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const sidenav = document.getElementById("mySidenav");

openBtn.addEventListener("click", function(event) {
    event.preventDefault(); 
    sidenav.classList.add("active"); 
    openBtn.style.display = "none";  
    closeBtn.style.display = "block";  
});

closeBtn.addEventListener("click", function(event) {
    event.preventDefault();  
    sidenav.classList.remove("active"); 
    openBtn.style.display = "block"; 
    closeBtn.style.display = "none"; 
});
