
const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -40%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

// const track = document.getElementById("image-track");

// let mouseDownAt = 0;
// let prevPercentage = 0;

// track.addEventListener("mousedown", (e) => {
//   mouseDownAt = e.clientX;
//   prevPercentage = parseFloat(track.dataset.percentage) || 0;
// });

// track.addEventListener("mouseup", () => {
//   mouseDownAt = 0;
//   track.dataset.prevPercentage = track.dataset.percentage || 0;
// });

// track.addEventListener("mousemove", (e) => {
//   if (mouseDownAt === 0) return;

//   const mouseDelta = mouseDownAt - e.clientX;
//   const maxDelta = window.innerWidth / 2;

//   const percentage = (mouseDelta / maxDelta) * -100;
//   const nextPercentageUnconstrained = prevPercentage + percentage;
//   const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

//   track.dataset.percentage = nextPercentage;

//   track.style.transform = `translate(${nextPercentage}%, -40%)`;

//   const images = track.getElementsByClassName("image");
//   for (const image of images) {
//     image.style.objectPosition = `${100 + nextPercentage}% center`;
//   }
// });


/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);



// document.addEventListener("DOMContentLoaded", function () {
//   // Check if the popup has been closed before
//   if (!localStorage.getItem("popupClosed")) {
//     // Show the popup if it hasn't been closed
//     document.getElementById("popup").style.display = "block";
//   }

//   // Handle click on the close icon
//   document.getElementById("closePopup").addEventListener("click", function () {
//     // Hide the popup
//     document.getElementById("popup").style.display = "none";

//     // Set a flag in localStorage to indicate that the popup has been closed
//     localStorage.setItem("popupClosed", "true");
//   });
// });



