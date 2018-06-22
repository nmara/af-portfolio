//scroll animation
AOS.init();

// stop audio if other is playing
document.addEventListener('play', function(e){
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] != e.target){
            audios[i].pause();
        }
    }
}, true);

//nav
function changePage(el) {
    var sectionName = el.getAttribute("data-nav");
    var location = sectionName + ".html";
    window.open(location, "_self");
}

// Gallery
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("description");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  var textContainer = document.querySelector('.caption_container');
  var photo = document.getElementsByClassName('modal__photo');
  var slideModal = document.getElementsByClassName('mySlides');
  if (slideIndex-1 === 0 || slideIndex-1 === 1) {
    textContainer.style.display = "none";
    for (var i = 0; i < 2; i++) {
      slideModal[i].classList.add("photo-no-desc");
      photo[i].classList.add("photo-no-desc");
    }
  } else {
    textContainer.style.display = "flex";
    for (var i = 2; i < slideModal.length; i++) {
      slideModal[i].classList.add("photo-with-desc");
      photo[i].classList.add("photo-with-desc");
    }
  }
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].innerHTML;

  document.onkeydown = function(event) {
      var e = event || window.event;
      if(e.keyCode == '37') {
          plusSlides(-1);
      }
      else if (e.keyCode == '39') {
          plusSlides(1);
      }
      else if (e.keyCode == '27') {
          closeModal();
      }
  }
}
