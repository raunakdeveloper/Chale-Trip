(function () {
    emailjs.init("R8lfZUbECoUDhtkp7");
})();

const contactForm = document.querySelector('#contactForm');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.querySelector("#name");
    const number = document.querySelector("#phonenumber");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");

    const params = {
        name: name.value,
        number: number.value,
        email: email.value,
        message: message.value
    };

    const serviceID = "service_dt5cqld";
    const templateID = "template_gjwmp6i";

    emailjs.send(serviceID, templateID, params)
        .then((res) => {
            console.log('Email successfully sent:', res.status);

            // Show the thank you modal
            const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
            thankYouModal.show();

            // Reset the form
            contactForm.reset();
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            alert('Oops! Something went wrong. Please try again later.');
        });
});
