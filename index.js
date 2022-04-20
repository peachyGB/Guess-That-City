document.addEventListener("DOMContentLoaded", () => {
  let moscowImgSrc = fetch(
    "https://api.teleport.org/api/urban_areas/slug:moscow/images/"
  )
    .then((response) => response.json())
    .then((moscowImage) => handleImg(moscowImage));
  // let mexicoCityImgSrc = fetch(​​'https://api.teleport.org/api/urban_areas/slug:mexico-city/images/')
  //   .then((response) => response.json())
  //   .then((mexicoCityImage) => handleImg(mexicoCityImage));
  // let tokyoImgSrc = fetch(​​'https://api.teleport.org/api/urban_areas/slug:tokyo/images/')
  //   .then((response) => response.json())
  //   .then((tokyoImage) => handleImg(tokyoImage));
  //     let barcelonaImgSrc = fetch(​​'https://api.teleport.org/api/urban_areas/slug:barcelona/images/')
  //   .then((response) => response.json())
  //   .then((barcelonaImage) => handleImg(barcelonaImage));
  //     let sanFranciscoImgSrc = fetch(​​'https://api.teleport.org/api/urban_areas/slug:san-francisco-bay-area/images/')
  //   .then((response) => response.json())
  //   .then((sanFranciscoImage) => handleImg(sanFranciscoImage));

  function handleImg(data) {
    let photoBin = document.getElementById("cityPhoto");
    photoBin.src = data.photos[0].image.mobile;
    console.log(photoBin);
    /* brain tasks
insert photos from api*/
  }
});
//_links -> ua:item -> [index] -> _links -> ua:images -> photos -> image -> moble

//add functionality to submit forms
////confirm tru or false city name
//pull images from api
//pull city info from api
//add hover event to display city info
//
