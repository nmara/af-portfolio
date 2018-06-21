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
function correctNavScroll(el) {
    var sectionName = el.getAttribute("data-nav");
    var section = document.getElementById(sectionName);
    var position = section.offsetTop;
    var scrollDestination = position - 50;
    window.scrollTo({
        top: scrollDestination,
        left: 0,
        behavior: 'smooth'
    });
    // if(window.innerWidth < 1215) {
    //     navIcon1.classList.remove("open");
    //     navMenuBar.classList.toggle("nav_menu_bar_visible");
    //     var mobileNavBg = document.getElementById('nav-menu-bar-bg');
    //     mobileNavBg.classList.toggle("show-mobile-nav");
    // }
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
