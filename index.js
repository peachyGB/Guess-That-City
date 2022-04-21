document.addEventListener("DOMContentLoaded", () => {
  fetch(`https://api.teleport.org/api/urban_areas/`)
    .then((response) => response.json())
    .then((cityList) => listOptions(cityList));

  let x = randomInt(0, 250);
  function listOptions(list) {
    let cityIndex = list._links["ua:item"][x].name;
    let i = cityIndex.toLowerCase();
    console.log(cityIndex);

    fetch(`https://api.teleport.org/api/urban_areas/slug:${i}/images/`)
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
});
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
//pull city info from api
//add hover event to display city info
//

//css ideas - make submit button bigger and answer button smaller,
