let counting = false;
let counter = 0;
let isDown = true;
let currentInterval = 2500; // Default interval


document.getElementById("startButton").addEventListener('click', startCounting);
document.getElementById("resetButton").addEventListener('click', resetCounter);
const intervalButtons = document.querySelectorAll('.intervalButton');

intervalButtons.forEach(button => {
    button.addEventListener('click', function() {
        currentInterval = this.dataset.interval;
        console.log(`Interval set to: ${currentInterval / 1000} seconds`);
    });
});


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
            document.body.style.backgroundColor = "rgba(246, 241, 209)"; // Change back to rgba(246, 241, 209)
            updateCounter();
        }, 1000); // Wait for 1 second at 0 before starting regular counting
    }
}

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
        document.body.style.backgroundColor = "rgba(246, 241, 209)";
        speakPhrase();
        setTimeout(updateCounter, currentInterval);
    }
}



document.getElementById("resetButton").addEventListener('click', resetCounter);

function resetCounter() {
    counting = false;
    counter = 0;
    document.getElementById("counter").textContent = counter;
    document.body.style.backgroundColor = "rgba(246, 241, 209)"; // Change back to rgba(246, 241, 209)
    console.log("Counter reset");
}

console.log("Script loaded. Ready to start.");
