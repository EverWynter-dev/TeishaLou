// FORM SCRIPT

window.onload = function() {
  // Reset the form fields when the page loads
  document.getElementById("form").reset();
};

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});

// 

let scrollContainer = document.querySelector(".gallery-images")
let backBtn = document.getElementById("BackBTN")
let ForwardBtn = document.getElementById("ForwardBTN")

scrollContainer.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollContainer.scrollLeft += evt.deltaY;
  
});

ForwardBtn.addEventListener("click", ()=> {
  scrollContainer.style.scrollBehavior = "smooth";
  scrollContainer.scrollLeft += 400;
})


backBtn.addEventListener("click", ()=> {
  scrollContainer.style.scrollBehavior = "smooth";
  scrollContainer.scrollLeft -= 400;
})

// AUDIOS 

function initializeAudioPlayer(audioId, ctrlId, progBarId, playSvgId, pauseSvgId) {
  const audio = document.getElementById(audioId);
  const ctrl = document.getElementById(ctrlId);
  const progressBar = document.getElementById(progBarId);
  const playSvg = document.getElementById(playSvgId);
  const pauseSvg = document.getElementById(pauseSvgId);

  audio.addEventListener("loadeddata", () => {
    progressBar.value = 0;
  });

  audio.addEventListener("timeupdate", () => {
    progressBar.value = audio.currentTime / audio.duration * 100;
  });

  ctrl.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    togglePlayPause(ctrl, playSvg, pauseSvg);
  });

  progressBar.addEventListener("change", () => {
    const pct = progressBar.value / 100;
    audio.currentTime = (audio.duration || 0) * pct;
  });

  audio.addEventListener("pause", () => {
    if (!ctrl.classList.contains("play")) {
      togglePlayPause(ctrl, playSvg, pauseSvg);
    }
  });

  function togglePlayPause(ctrl, playSvg, pauseSvg) {
    if (ctrl.classList.contains("pause")) {
      ctrl.classList.remove("pause");
      ctrl.classList.add("play");
      playSvg.classList.remove("hidden");
      pauseSvg.classList.add("hidden");
    } else {
      ctrl.classList.add("pause");
      ctrl.classList.remove("play");
      playSvg.classList.add("hidden");
      pauseSvg.classList.remove("hidden");
    }
  }
}

// Initialize All Audio Players
initializeAudioPlayer('audOne', 'ctrlOne', 'progOne', 'play', 'pause');
initializeAudioPlayer('audTwo', 'ctrlTwo', 'progTwo', 'playTwo', 'pauseTwo');
initializeAudioPlayer('audThree', 'ctrlThree', 'progThree', 'playThree', 'pauseThree');

// Ensure Only One Audio Plays at a Time
const audios = document.querySelectorAll('audio');
audios.forEach(audio => {
  audio.addEventListener('play', () => {
    audios.forEach(otherAudio => {
      if (otherAudio !== audio) {
        otherAudio.pause();
        otherAudio.currentTime = 0;
      }
    });
  });
});

// SCROLLING HEADER TABS

let menu = document.querySelector('#hide-btn');
let navbar = document.querySelector('.responsive-header');

menu.onclick = () => {
  menu.classList.toggle('bx-x')
  navbar.classList.toggle('open');
}

function scrollHome() {
  window.scrollTo(0, 0);
}

function scrollStudio() {
  window.scrollTo(0, 500);
}

function scrollResume() {
  window.scrollTo(0, 1000);
}

function scrollContact() {
  window.scrollTo(0, document.body.scrollHeight);
}

