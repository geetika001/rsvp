document.addEventListener("DOMContentLoaded", function () {
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");
    const rsvpMessage = document.getElementById("rsvpMessage");
    const rsvpCountElement = document.getElementById("rsvpCount");
    const emailForm = document.getElementById("emailForm");
    const emailInput = document.getElementById("email");

    // Get RSVP count from localStorage (or set to 0 if not present)
    let rsvpCount = localStorage.getItem("rsvpCount") ? parseInt(localStorage.getItem("rsvpCount")) : 0;
    let userRSVP = localStorage.getItem("userRSVP");

    // Update RSVP count display
    updateRSVPCount();

    // Check if user already RSVP'd
    if (userRSVP) {
        disableButtons();
        rsvpMessage.innerHTML = `You have already RSVP'd ${userRSVP}`;
    }

    yesButton.addEventListener("click", function () {
        emailForm.style.display = 'block';
    });

    noButton.addEventListener("click", function () {
        disableButtons();
        rsvpMessage.innerHTML = "You have chosen not to attend.";
        localStorage.setItem("userRSVP", "no");
    });

    // Handle email form submission
    emailForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = emailInput.value;
        if (email && !hasUserRSVP(email)) {
            incrementRSVPCount();
            disableButtons();
            rsvpMessage.innerHTML = "Thank you for your RSVP!";
            localStorage.setItem("userRSVP", "yes");
            storeEmailRSVP(email);
        } else {
            alert("This email has already RSVP'd or is invalid.");
        }
    });

    function incrementRSVPCount() {
        rsvpCount++;
        localStorage.setItem("rsvpCount", rsvpCount);
        updateRSVPCount();
    }

    function updateRSVPCount() {
        rsvpCountElement.innerHTML = `${rsvpCount} people have RSVP'd yes`;
    }

    function disableButtons() {
        yesButton.disabled = true;
        noButton.disabled = true;
    }

    function hasUserRSVP(email) {
        const existingEmails = JSON.parse(localStorage.getItem("rsvpEmails")) || [];
        return existingEmails.includes(email);
    }

    function storeEmailRSVP(email) {
        let emails = JSON.parse(localStorage.getItem("rsvpEmails")) || [];
        emails.push(email);
        localStorage.setItem("rsvpEmails", JSON.stringify(emails));
    }
});
