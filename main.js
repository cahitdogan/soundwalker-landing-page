const musicPlayers = document.querySelectorAll(".music-player");
const audio = document.querySelectorAll("audio");
const playPauseStatus = ["paused", "paused", "paused"];
let interval_ID_container; /*contains the setInterval() function's ID*/




function playPause(musicOrder) {

  const playPauseButton = musicPlayers[musicOrder].querySelector(".play-pause-button");
  const timerBar = musicPlayers[musicOrder].querySelector(".loading-bar");

  switch (playPauseStatus[musicOrder]) {
    case "paused":
      for (let index = 0; index < musicPlayers.length; index++) {
        if (playPauseStatus[index] === "playing") {
          playPause(index);
        }
      }
      playPauseButton.classList.add("playing");
      audio[musicOrder].play();
      timerBar.classList.add("timer-bar-animation");
      timerBar.style.animationPlayState = "running";
      interval_ID_container = setInterval(function() { stopWatch(musicOrder); }, 100);
      playPauseStatus[musicOrder] = "playing";

      break;

    case "playing":
      audio[musicOrder].pause();
      playPauseButton.classList.remove("playing");
      timerBar.style.animationPlayState = "paused";
      clearInterval(interval_ID_container);
      playPauseStatus[musicOrder] = "paused";
  }
}

/*-------------------------- STOPWATCH --------------------------*/


const milliseconds = [0, 0, 0];  /*100 milliseconds*/
const second = [0, 0, 0];
const minute = [0, 0, 0];
const second_HTML = document.querySelectorAll(".second");
const minute_HTML = document.querySelectorAll(".minute");

function stopWatch(musicOrder) { 
  if ( !(milliseconds[musicOrder] === 1000 && second[musicOrder] === 29) ) /*this condition for time limitations*/ {
    if (milliseconds[musicOrder] === 1000) {
        second[musicOrder]++;
        milliseconds[musicOrder] = 0;
    }

    if (second[musicOrder] === 60) {
        minute[musicOrder]++;
        second[musicOrder] = 0;
    }
} else {
  milliseconds[musicOrder] = 0;
  second[musicOrder] = 0;
  minute[musicOrder] = 0;
}

milliseconds[musicOrder] += 100;

if ( 0 <= second[musicOrder] && second[musicOrder] <= 9 )   {
    second_HTML[musicOrder].innerHTML = "0" + second[musicOrder];
} else if ( (10 <= second[musicOrder]) && (second[musicOrder] <= 60) ) {
    second_HTML[musicOrder].innerHTML = second[musicOrder];
}
  
minute_HTML[musicOrder].innerHTML = minute[musicOrder];
}



/*-------------------------- REWIND --------------------------*/

function rewind(musicOrder) {
    const timerBar = musicPlayers[musicOrder].querySelector(".loading-bar");

    audio[musicOrder].currentTime = 0;
  
    if (playPauseStatus[musicOrder] === "playing") {
      clearInterval(interval_ID_container);
    }
  
    milliseconds[musicOrder] = 0;
    second[musicOrder] = 0;
    minute[musicOrder] = 0;
    second_HTML[musicOrder].innerHTML = "0" + second[musicOrder];
    minute_HTML[musicOrder].innerHTML = minute[musicOrder];
  
    if (playPauseStatus[musicOrder] === "playing") {
      interval_ID_container = setInterval(function() { stopWatch(musicOrder); }, 100);
    }
  
    timerBar.classList.remove("timer-bar-animation");
    void timerBar.offsetWidth;
    if (playPauseStatus[musicOrder] === "playing") {
      timerBar.classList.add("timer-bar-animation");
    }
}


/*-------------------------- PODCASTS SCROLL EVENT FOR ANIMATION--------------------------*/


const podcasts = document.querySelectorAll(".podcast")

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      myFunction(0);
      observer.unobserve(entry.target);
    }
  });
});

observer.observe(podcasts[0]);

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      myFunction(1);
      observer2.unobserve(entry.target);
    }
  });
});

observer2.observe(podcasts[1]);

const observer3 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      myFunction(2);
      observer3.unobserve(entry.target);
    }
  });
});

observer3.observe(podcasts[2]);


function myFunction(element) {
    podcasts[element].classList.add("podcast-animation");
}






/*-------------------------- ARTISTS CONTAINER SLIDER FUNCTIONS --------------------------*/

const artistsContainer = document.querySelector("#artists #artists-container")

function scrollToNextArtist() {
    artistsContainer.scrollBy({
      left: 350,
      behavior: "smooth",
    });
}

function scrollToPrevArtist() {
    artistsContainer.scrollBy({
      left: -350,
      behavior: "smooth",
    });
}