// Get references to the form and its input fields
const form = document.getElementById('creation-form');
const apiUrlInput = document.getElementById('api-url-input');
const nameInput = document.getElementById('name-input');
const descriptionInput = document.getElementById('description-input');

// Event listener for form submission
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the form data
  const apiUrl = apiUrlInput.value;
  const name = nameInput.value;
  const description = descriptionInput.value;

  // Prepare the data to be sent as JSON
  const data = {
    apiUrl: apiUrl,
    name: name,
    description: description
  };

  // Make a POST request to the Flask API
  fetch('https://justct.pythonanywhere.com/new', {
    method: 'POST',
	  mode: "cors",
    headers: {
	'url': apiUrl ,
	    'name': name ,
	    'description':description
    },

  })
    .then(response => response.text())
    .then(result => {
      // Display appropriate CSS popup based on the response
      if (result === 'x') {
        showPopup('Room already exists');
      } else if (result === 's') {
        showPopup('Room created successfully');
      } else if (result === 'n') {
        showPopup('API URL not working');
      } else {
        showPopup('Unknown response');
      }
    })
    .catch(error => console.error('Error:', error));
});

// Function to display a CSS popup
function showPopup(message) {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}
