// Getting Started
var gettingStartedBtn = document.getElementById("gettingStartedBtn");
gettingStartedBtn.onclick = function () {
    Toast.create("Voila!", "How easy was that?", TOAST_STATUS.SUCCESS, 5000);
};

// Placement
var placementBtns = document.querySelectorAll(".placement-grid-btn");
placementBtns.forEach(function (btn) {
    btn.onclick = function () {
        var placement = btn.getAttribute("data-placement");
        Toast.setPlacement(parseInt(placement));
        Toast.create("Placement Updated", `Current placement: ${btn.innerText}`, TOAST_STATUS.SUCCESS, 5000);
    };
});