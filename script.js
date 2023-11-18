let counting = false;
let counter = 0;
let isDown = true;
const speechSynthesis = window.speechSynthesis;

document.getElementById("startButton").addEventListener('click', startCounting);
document.getElementById("stopButton").addEventListener('click', stopCounting);
document.getElementById("speedSlider").addEventListener('input', updateSpeedDisplay);

function startCounting() {
    if (!counting) {
        let countdownDuration = document.getElementById("countdownSelect").value;
        counting = true;
        console.log(`Starting countdown for ${countdownDuration} seconds`);
        document.body.style.backgroundColor = "darkgrey";
        countdown(parseInt(countdownDuration));
    }
}

function countdown(seconds) {
    document.getElementById("counter").textContent = seconds;
    if (seconds > 0) {
        setTimeout(function() { countdown(seconds - 1); }, 1000);
    } else {
        setTimeout(function() {
            document.body.style.backgroundColor = "purple"; // Change back to purple
            updateCounter();
        }, 1000); // Wait for 1 second at 0 before starting regular counting
    }
}

document.querySelectorAll('.speedButton').forEach(button => {
    button.addEventListener('click', function() {
        setSpeed(this.getAttribute('data-speed'));
        highlightButton(this);
    });
});

function stopCounting() {
    if (counting) {
        counting = false;
        document.getElementById("counter").style.display = "none"; // Hide the counter
        document.getElementById("motivatingImage").style.display = "block"; // Show the image

        setTimeout(function() {
            document.getElementById("motivatingImage").style.display = "none"; // Hide the image after 3 seconds
            document.getElementById("counter").style.display = "block"; // Show the counter again
        }, 3000);
        
        console.log("Timer stopped");
    }
}



function highlightButton(selectedButton) {
    document.querySelectorAll('.speedButton').forEach(button => {
        button.classList.remove('selected');
    });
    selectedButton.classList.add('selected');
}

function speakPhrase() {
    if (isDown) {
        document.getElementById("downSound").play();
    } else {
        document.getElementById("upSound").play();
    }
    if (!isDown) {
        counter++;
        document.getElementById("counter").textContent = counter;
    }
    isDown = !isDown;
}


function updateCounter() {
    if (counting) {
        document.body.style.backgroundColor = "purple"; // Change back to purple
        speakPhrase();
        let timeInterval = (11 - document.getElementById("speedSlider").value) * 500;
        setTimeout(updateCounter, timeInterval);
    }

}

function setSpeed(speed) {
    // Your existing logic to set the speed
    // For example, updating a global variable or directly adjusting the timer interval
function updateSpeedDisplay() {
    let sliderValue = document.getElementById("speedSlider").value;
    // Convert the slider value to the corresponding time interval
    let interval = (10 - sliderValue) * 0.5;
    document.getElementById("speedDisplay").textContent = `Interval: ${interval} seconds`;
    console.log(`Speed adjusted to: ${interval} seconds`);
}
}


document.getElementById("resetButton").addEventListener('click', resetCounter);

function resetCounter() {
    counting = false;
    counter = 0;
    document.getElementById("counter").textContent = counter;
    document.body.style.backgroundColor = "purple"; // Change back to purple
    console.log("Counter reset");
}



console.log("Script loaded. Ready to start.");
