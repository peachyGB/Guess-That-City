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
    let cityIndexNS = cityIndex.replace(" ", "-");
    // cityIndex.forEach((letter) => {
    //   letter = " " ? letter.replace(" ", "-") : console.log(cityIndex);
    // });
    let i = cityIndexNS.toLowerCase();

    //collects the statistics for each city
    fetch(`https://api.teleport.org/api/urban_areas/slug:${[i]}/scores/`)
      .then((response) => response.json())
      .then((cityStats) => getStats(cityStats));

    function getStats(cityStats) {
      let statsCategories = cityStats.categories;
      statsCategories.forEach((element) => {
        let statsCard = document.getElementById("statsCard");
        let newStat = document.createElement("div");
        statsCard.appendChild(newStat);
        newStat.textContent = `${element.name}:  ${parseInt(
          element.score_out_of_10
        )}`;
      });
      //removes certain stats
      let statsList = document.querySelectorAll("#statsCard div");
      console.log(statsList);
      statsList[0].remove();
      statsList[2].remove();
      statsList[3].remove();
      statsList[5].remove();
      statsList[6].remove();
      statsList[10].remove();
      statsList[13].remove();
      statsList[15].remove();
      statsList[16].remove();
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

      //reveals hint when clicked
      let country = document.getElementById("country");
      fetch(`https://api.teleport.org/api/urban_areas/slug:${[i]}/`)
        .then((response) => response.json())
        .then((cntry) => insertCountry(cntry));
      let hint = document.getElementById("hint");
      hint.addEventListener("click", (eventt) => {
        country.style.visibility = "visible";
      });
      function insertCountry(cntry) {
        console.log(cntry._links["ua:countries"][0].name);
        country.textContent = `This city is located in ${cntry._links["ua:countries"][0].name}`;
      }

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
