document.addEventListener("DOMContentLoaded", () => {
  fetch(`https://api.teleport.org/api/urban_areas/`)
    .then((response) => response.json())
    .then((cityList) => listOptions(cityList));

  //creates a random number
  function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  // the random number is the index of the next city
  let x = randomInt(0, 250);
  function listOptions(list) {
    let cityIndex = list._links["ua:item"][x].name;
    let i = cityIndex.toLowerCase();
    console.log(cityIndex);

    //collects the statistics for each city
    fetch(`https://api.teleport.org/api/urban_areas/slug:${[i]}/scores/`)
      .then((response) => response.json())
      .then((cityStats) => getStats(cityStats));

    function getStats(cityStats) {
      let statsCategories = cityStats.categories;
      statsCategories.forEach((element) => {
        let statsCard = document.getElementById("statsCard");
        let newStat = document.createElement("div");
        console.log(element.score_out_of_10);
        statsCard.appendChild(newStat);
        newStat.textContent = `${element.name}:  ${parseInt(
          element.score_out_of_10
        )}`;
      });
    }

    fetch(`https://api.teleport.org/api/urban_areas/slug:${[i]}/images/`)
      .then((response) => response.json())
      .then((cityFile) => handleImg(cityFile));

    function handleImg(data) {
      let photoBin = document.getElementById("cityPhoto");
      photoBin.src = data.photos[0].image.mobile;
      let answerBtn = document.getElementById("getAnswerBtn");
      let guessForm = document.getElementById("guessForm");
      let answer = document.getElementById("cityName");
      let submissionResponse = document.getElementById("submissionResponse");

      //shows stats when hovering over photo
      let container = document.getElementById("container");
      answer.textContent = cityIndex;
      container.addEventListener("mouseover", (eve) => {
        statsCard.style.visibility = "visible";
      });
      container.addEventListener("mouseout", (eve) => {
        statsCard.style.visibility = "hidden";
      });

      //reveals answer when clicked
      answerBtn.addEventListener("click", (event) => {
        answer.style.visibility = "visible";
      });

      //makes the submit form work
      guessForm.addEventListener("submit", (e) => {
        e.preventDefault();
        checkAnswer(e);
      });

      //compares the guess and the answer
      function checkAnswer(e) {
        cityGuess.value == answer.textContent
          ? (submissionResponse.textContent = "Correct!")
          : (submissionResponse.textContent = "Sorry, try again!");
      }
    }
  }
  //lets the Next button work
  document
    .getElementById("nextCity")
    .addEventListener("submit", () => console.log(""));
});
//fix issue with city names that have spaces. turn ' ' into '-'
//add hover event to photo -> add hover event to "container" or "statsCard" so it persists
//select a few stats, not all(must still inclue iteration)
//add a header to stats section

//style the buttons
