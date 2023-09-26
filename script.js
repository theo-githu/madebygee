
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
  }, { duration: 5000, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 5000, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);



document.addEventListener("DOMContentLoaded", function () {
  // Check if the user has closed the pop-up before
  if (localStorage.getItem("popupClosed") !== "true") {
      // Display the pop-up
      document.getElementById("popup").style.display = "flex";

      // Add event listener to the close button
      document.getElementById("closePopup").addEventListener("click", function () {
          // Close the pop-up
          document.getElementById("popup").style.display = "none";
          
          // Set a flag in localStorage to indicate that the pop-up has been closed
          localStorage.setItem("popupClosed", "true");
      });
  }
});


// document.addEventListener("DOMContentLoaded", function () {
//   const images = document.querySelectorAll(".image");
//   const popup = document.getElementById("popup");
//   const popupImage = document.getElementById("popup-image");
//   const popupClose = document.getElementById("popup-close");
//   const popupPrev = document.getElementById("popup-prev");
//   const popupNext = document.getElementById("popup-next");
//   let currentIndex = 0;

//   function openPopup(index) {
//       currentIndex = index;
//       popup.style.display = "block";
//       popupImage.src = images[index].src;
//   }

//   function closePopup() {
//       popup.style.display = "none";
//   }

//   function navigate(direction) {
//       currentIndex += direction;
//       if (currentIndex < 0) {
//           currentIndex = images.length - 1;
//       }
//       if (currentIndex >= images.length) {
//           currentIndex = 0;
//       }
//       popupImage.src = images[currentIndex].src;
//   }

//   images.forEach((image, index) => {
//       image.addEventListener("click", () => openPopup(index));
//   });

//   popupClose.addEventListener("click", closePopup);
//   popupPrev.addEventListener("click", () => navigate(-1));
//   popupNext.addEventListener("click", () => navigate(1));

//   popupImage.addEventListener("click", () => closePopup());

//   // Close popup when the user clicks outside the image
//   popup.addEventListener("click", (e) => {
//       if (e.target === popup) {
//           closePopup();
//       }
//   });

//   // Keyboard navigation
//   document.addEventListener("keydown", (e) => {
//       if (popup.style.display === "block") {
//           if (e.key === "ArrowLeft") {
//               navigate(-1);
//           } else if (e.key === "ArrowRight") {
//               navigate(1);
//           } else if (e.key === "Escape") {
//               closePopup();
//           }
//       }
//   });
// });

