// Get the review data from data.js
const reviewData = window.reviewData;

// Generate the review cards
const reviewsContainer = document.getElementById('reviews-container');
const reviewCards = reviewData.map(review => createReviewCard(review));
reviewsContainer.innerHTML = '';
reviewCards.forEach(card => reviewsContainer.appendChild(card));

// Add event listener for the review form submission
const reviewForm = document.getElementById('review-form');
reviewForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(reviewForm);
    const newReview = {
        name: formData.get('name'),
        date: getCurrentDate(),
        rating: parseInt(formData.get('rating')),
        review: formData.get('review')
    };
    reviewData.push(newReview);
    reviewForm.reset();
    reviewsContainer.innerHTML = '';
    const newReviewCards = reviewData.map(review => createReviewCard(review));
    newReviewCards.forEach(card => reviewsContainer.appendChild(card));
});

// Create a review card for a given review object
function createReviewCard(review) {
    const card = document.createElement('div');
    card.classList.add('review-card');
    const name = document.createElement('h4');
    name.textContent = review.name;
    const date = document.createElement('p');
    date.textContent = formatDate(review.date);
    const rating = document.createElement('div');
    rating.classList.add('rating');
    rating.innerHTML = getRatingStars(review.rating);
    const reviewText = document.createElement('p');
    reviewText.textContent = review.review;
    card.appendChild(name);
    card.appendChild(date);
    card.appendChild(rating);
    card.appendChild(reviewText);
    return card;
}

// Get the HTML for the rating stars based on a rating value
function getRatingStars(rating) {
    const maxRating = 5;
    const fullStar = '<span>★</span>';
    const emptyStar = '<span>☆</span>';
    let stars = '';
    for (let i = 1; i <= maxRating; i++) {
        if (i <= rating) {
            stars += fullStar;
        } else {
            stars += emptyStar;
        }
    }
    return stars;
}

// Format a date string in the format YYYY-MM-DD to a more readable format
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Get the current date in the format YYYY-MM-DD
function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const form = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Validate the email address
  if (!emailInput.checkValidity()) {
    alert('Please enter a valid email address.');
    return;
  }

  // Submit the form data
  const formData = new FormData(form);
  fetch('https://httpbin.org/post', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      alert('Thanks for joining our newsletter!');
    } else {
      alert('There was an error submitting the form. Please try again later.');
    }
  })
  .catch(error => {
    console.error(error);
    alert('There was an error submitting the form. Please try again later.');
  });
});