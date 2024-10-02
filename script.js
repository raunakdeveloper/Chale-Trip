const addReviewBtn = document.getElementById('addReviewBtn');
const ticketFormContainer = document.getElementById('ticketFormContainer');
const reviewFormContainer = document.getElementById('reviewFormContainer');
const overlay = document.getElementById('overlay');
const cancelTicketBtn = document.getElementById('cancelTicketBtn');
const cancelReviewBtn = document.getElementById('cancelReviewBtn');
const carouselInner = document.getElementById('carousel-inner');
const alertMessage = document.getElementById('alertMessage');

function showAlert(message, type) {
    alertMessage.textContent = message;
    alertMessage.className = `alert alert-${type}`;
    alertMessage.classList.remove('d-none');
    setTimeout(() => {
        alertMessage.classList.add('d-none');
    }, 3000);
}

addReviewBtn.addEventListener('click', () => {
    ticketFormContainer.style.display = 'block';
    overlay.style.display = 'block';
});

cancelTicketBtn.addEventListener('click', (e) => {
    e.preventDefault();
    ticketFormContainer.style.display = 'none';
    overlay.style.display = 'none';
});
document.getElementById('ticketForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const ticketNumber = document.getElementById('ticketNumber').value;

    const ticketRegex = /^CTT(100[1-9]|10[1-4][0-9]|1050)$/;

    if (ticketRegex.test(ticketNumber)) {
        showAlert(`Ticket number ${ticketNumber} validated successfully!`, 'success');
        ticketFormContainer.style.display = 'none';
        reviewFormContainer.style.display = 'block';
    } else {
        showAlert('Invalid ticket number. Please enter a valid ticket number (CTT1001 to CTT1050).', 'danger');
    }
});

// Hide Review Form Popup
cancelReviewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    reviewFormContainer.style.display = 'none';
    overlay.style.display = 'none';
});

// Handle Review Form Submission
document.getElementById('reviewForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const destination = document.getElementById('destination').value;
    const reviewText = document.getElementById('reviewText').value;
    const rating = document.getElementById('rating').value;

    const genderImage = gender === 'male' ? 'images/male.png' : 'images/female.png';

    // Create a new carousel item
    const newItem = document.createElement('div');
    newItem.classList.add('carousel-item');
    newItem.innerHTML = `
                <div class="container">
                    <img class="rounded-circle shadow-1-strong mb-2" src="${genderImage}" alt="avatar" style="width: 80px;" />
                    <h2 class="custName mb-1">${name}</h2>
                    <p class="destName" >Trip to ${destination}</p>
                    <p class="text-muted"><i class="fas fa-quote-left pe-2"></i>${reviewText}</p>
                    <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
                        ${'<li><i class="fas fa-star fa-sm"></i></li>'.repeat(rating)}
                    </ul>
                </div>
            `;

    carouselInner.appendChild(newItem);
    showAlert('Review added successfully!', 'success');

   
    reviewFormContainer.style.display = 'none';
    overlay.style.display = 'none';

    // Reset the form
    document.getElementById('reviewForm').reset();
});