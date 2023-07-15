const musicPlayers = document.querySelectorAll(".music-player");
const audio = document.querySelectorAll("audio");
const playPauseStatus = ["paused", "paused", "paused"]; /*status for paused and playing cases*/
const musicLoadingStatus = ["waiting", "waiting", "waiting"]; 
const interval_ID_container = []; /*contains the setInterval() function's ID*/




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
      
      if (musicLoadingStatus[musicOrder] === "waiting") {
        audio[musicOrder].load();
        musicLoadingStatus[musicOrder] = "loaded"
      }

      audio[musicOrder].play();
      timerBar.classList.add("timer-bar-animation");
      timerBar.style.animationPlayState = "running";
      interval_ID_container[musicOrder] = setInterval(function() { stopWatch(musicOrder); }, 100);
      playPauseStatus[musicOrder] = "playing";

      break;

    case "playing":
      audio[musicOrder].pause();
      playPauseButton.classList.remove("playing");
      timerBar.style.animationPlayState = "paused";
      playPauseStatus[musicOrder] = "paused";
      clearInterval(interval_ID_container[musicOrder]);
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
      clearInterval(interval_ID_container[musicOrder]);
    }
  
    milliseconds[musicOrder] = 0;
    second[musicOrder] = 0;
    minute[musicOrder] = 0;
    second_HTML[musicOrder].innerHTML = "0" + second[musicOrder];
    minute_HTML[musicOrder].innerHTML = minute[musicOrder];
  
    if (playPauseStatus[musicOrder] === "playing") {
      interval_ID_container[musicOrder] = setInterval(function() { stopWatch(musicOrder); }, 100);
    }
  
    timerBar.classList.remove("timer-bar-animation");
    void timerBar.offsetWidth;
    if (playPauseStatus[musicOrder] === "playing") {
      timerBar.classList.add("timer-bar-animation");
    }
}


//Q: Can i send argument to stopWatch() function with setInterval() function? Explain how it works.
//A: Yes, you can. You can send argument to stopWatch() function with setInterval() function. You can send argument to a function with setInterval() function by using anonymous function. For example, setInterval(function() { stopWatch(0); }, 100);. In this example, we send 0 to stopWatch() function.
