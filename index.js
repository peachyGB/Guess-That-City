document.addEventListener("DOMContentLoaded", () => {
  fetch(`https://api.teleport.org/api/urban_areas/`)
    .then((response) => response.json())
    .then((cityList) => listOptions(cityList));

  //RNG
  function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  // selects the next city based on the index determined by the RNG
  let x = randomInt(0, 250);
  function listOptions(list) {
    let cityIndex = list._links["ua:item"][x].name;
    //removes spaces for urls
    let cityIndexNS = cityIndex.replace(" ", "-");
    console.log(cityIndex);
    let i = cityIndexNS.toLowerCase();

    //collects the statistics for each city
    fetch(`https://api.teleport.org/api/urban_areas/slug:${[i]}/scores/`)
      .then((response) => response.json())
      .then((cityStats) => getStats(cityStats));

    function getStats(cityStats) {
      let statsCategories = cityStats.categories;
      statsCategories.forEach((element) => {
        let statsInfo = document.getElementById("statsInfo");
        let newStat = document.createElement("div");
        statsInfo.appendChild(newStat);
        newStat.textContent = `${element.name}:  ${parseInt(
          element.score_out_of_10
        )}`;
      });

      //removes unwanted stats
      let statsList = document.querySelectorAll("#statsInfo div");
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

    // finds the image for the selected city
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
      answer.textContent = cityIndex;

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
        country.textContent = `This city is located in ${cntry._links["ua:countries"][0].name}`;
      }

      //reveals answer when clicked
      answerBtn.addEventListener("click", (event) => {
        answer.style.visibility = "visible";
      });

      //checks the users guess for correctness
      guessForm.addEventListener("submit", (e) => {
        e.preventDefault();
        checkAnswer(e);
        submissionResponse.style.visibility = "visible";
      });

      function checkAnswer(e) {
        cityGuess.value == answer.textContent
          ? (submissionResponse.textContent = "Correct!")
          : (submissionResponse.textContent = "Sorry, try again!");
      }
    }
  }

  //refreshes page to generate new number and select new city
  document
    .getElementById("nextCity")
    .addEventListener("submit", () => console.log(""));
  document.getElementById("myVideo").playbackRate = 0.75;
});
