document.addEventListener("DOMContentLoaded", () => {

fetch("https://api.teleport.org/api/cities/")
  .then((response) => response.json())
  .then((data) => handleData(data));


  
}