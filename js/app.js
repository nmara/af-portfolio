//scroll animation
AOS.init();

// AUDIO
// stop audio if other is playing
document.addEventListener('play', function(e){
    var audios = document.getElementsByTagName('audio');
    var customAudios = document.getElementsByClassName('audioplayer');
    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] != e.target){
            audios[i].pause();
            customAudios[i].getElementsByClassName('pButton')[0].classList.remove("pause");
            customAudios[i].getElementsByClassName('pButton')[0].classList.add("play");
        }
    }
}, true);

// Custom audio
function customAudioPlayer(audioEl, customAudioEl) {
  // var music = document.getElementById('music'); // id for audio element
  var duration = audioEl.duration; // Duration of audio clip, calculated here for embedding purposes

  var pButton = customAudioEl.getElementsByClassName('pButton')[0]; // play button
  var playhead = customAudioEl.getElementsByClassName('playhead')[0]; // playhead
  var timeline = customAudioEl.getElementsByClassName('timeline')[0]; // timeline

  // timeline width adjusted for playhead
  var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

  // play button event listenter
  pButton.addEventListener("click", play);

  // timeupdate event listener
  audioEl.addEventListener("timeupdate", timeUpdate, false);

  // makes timeline clickable
  timeline.addEventListener("click", function(event) {
      moveplayhead(event);
      audioEl.currentTime = duration * clickPercent(event);
  }, false);

  // returns click as decimal (.77) of the total timelineWidth
  function clickPercent(event) {
      return (event.clientX - getPosition(timeline)) / timelineWidth;
  }

  // makes playhead draggable
  playhead.addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);

  // Boolean value so that audio position is updated only when the playhead is released
  var onplayhead = false;

  // mouseDown EventListener
  function mouseDown() {
      onplayhead = true;
      window.addEventListener('mousemove', moveplayhead, true);
      audioEl.removeEventListener('timeupdate', timeUpdate, false);
  }

  // mouseUp EventListener
  // getting input from all mouse clicks
  function mouseUp(event) {
      if (onplayhead == true) {
          moveplayhead(event);
          window.removeEventListener('mousemove', moveplayhead, true);
          // change current time
          audioEl.currentTime = duration * clickPercent(event);
          audioEl.addEventListener('timeupdate', timeUpdate, false);
      }
      onplayhead = false;
  }
  // mousemove EventListener
  // Moves playhead as user drags
  function moveplayhead(event) {
      var newMargLeft = event.clientX - getPosition(timeline);

      if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
          playhead.style.marginLeft = newMargLeft + "px";
      }
      if (newMargLeft < 0) {
          playhead.style.marginLeft = "0px";
      }
      if (newMargLeft > timelineWidth) {
          playhead.style.marginLeft = timelineWidth + "px";
      }
  }
  var songTime = customAudioEl.getElementsByClassName("showCurrentTime")[0];
  songTime.innerHTML = "00:00";
  // timeUpdate
  // Synchronizes playhead position with current point in audio
  function formatTime(el) {
    var minutes = Math.floor(el / 60);
    var seconds = Math.floor(el % 60);
    if(minutes < 10) {
      minutes = '0' + minutes;
    }
    if(seconds < 10) {
      seconds = '0' + seconds;
    }
    var outcome = minutes + ":" + seconds;
    return outcome;
  }

  function timeUpdate() {
      var playPercent = timelineWidth * (audioEl.currentTime / duration);
      playhead.style.marginLeft = playPercent + "px";
      if (audioEl.currentTime == duration) {
        pButton.classList.remove("pause");
        pButton.classList.add("play");
      }
      var showTime = Math.round(audioEl.currentTime);
      songTime.innerHTML = formatTime(audioEl.currentTime);
  }
  //Play and Pause
  function play() {
      // start music
      if (audioEl.paused) {
          audioEl.play();
          // remove play, add pause
          pButton.classList.remove("play");
          pButton.classList.add("pause");
      } else { // pause music
          audioEl.pause();
          // remove pause, add play
          pButton.classList.remove("pause");
          pButton.classList.add("play");
      }
  }

  // Gets audio file duration
  audioEl.addEventListener("canplaythrough", function() {
      duration = audioEl.duration;
      console.log(duration);
      var songDuration = customAudioEl.getElementsByClassName("showDuration")[0];
      songDuration.innerHTML = formatTime(duration);
  }, false);
  // getPosition
  // Returns elements left position relative to top-left of viewport
  function getPosition(el) {
      return el.getBoundingClientRect().left;
  }
}

var allAudios = document.getElementsByTagName('audio');
var allCustomAudios = document.getElementsByClassName('audioplayer');

for (var i = 0; i < allAudios.length; i++) {
  customAudioPlayer(allAudios[i], allCustomAudios[i]);
}

//nav
var navItems = document.getElementsByClassName('nav__item__link');
var navHeight = 50;

function removeActiveNav() {
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].classList.remove("active");
  }
}

window.addEventListener("scroll", function() {
  var sections = document.getElementsByTagName('section');
  var breakPoints = [];
  for (var i = 0; i < sections.length; i++) {
    breakPoints.push((sections[i].offsetTop)-navHeight);
  }
  for (var i = 0; i < sections.length; i++) {
    if (window.pageYOffset >= breakPoints[i] && window.pageYOffset < breakPoints[i+1]) {
      removeActiveNav();
      navItems[i].classList.add("active");
    } else if (i === (sections.length-1) && window.pageYOffset >= breakPoints[i]) {
      removeActiveNav();
      navItems[i].classList.add("active");
    }
  }
})

function scrollToSection(el) {
  var sectionName = el.getAttribute("data-nav");
  var section = document.getElementById(sectionName);
  var position = section.offsetTop;
  var scrollDestination;
  if(section == document.getElementById("recordings")) {
    scrollDestination = position - navHeight + (window.innerHeight*0.08);
  } else {
    scrollDestination = position - navHeight;
  }

  window.scrollTo({
    top: scrollDestination,
    left: 0,
    behavior: 'smooth'
  });
}

// Gallery
function openModal() {
    document.getElementById('myModal').style.display = "flex";
    document.querySelector('.header__content').style.position = "static";
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
    document.querySelector('.header__content').style.position = "fixed";
}

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
