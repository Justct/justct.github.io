 const roomList = document.getElementById("room-list");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  // Function to create HTML elements for room display
  function createRoomElement(room) {
    const roomContainer = document.createElement("div");
    roomContainer.classList.add("room");
    roomContainer.classList.add("room-box");

    const roomName = document.createElement("h2");
    roomName.textContent = room.name;

    const roomDescription = document.createElement("p");
    roomDescription.textContent = room.description;

    const roomAPIUrl = document.createElement("a");
    roomAPIUrl.href = "https://chat.justchatorg.repl.co/"+room.name;
    roomAPIUrl.textContent = "Join the Room";
    roomAPIUrl.classList.add("join-button")
    roomContainer.appendChild(roomName);
    roomContainer.appendChild(roomDescription);
    roomContainer.appendChild(roomAPIUrl);

    return roomContainer;
  }
 // Function to fetch and display rooms from the API
  function displayRooms(page, resultsPerPage) {
    const url = `https://backendjustchat.darkmash.repl.co/get/${page}/${resultsPerPage}`;

    fetch(url, { mode: "cors" })
      .then(response => response.json())
      .then(data => {
        roomList.innerHTML = "";

        if (data.length === 0) {
          const noResults = document.createElement("p");
          noResults.textContent = "No rooms found.";
          roomList.appendChild(noResults);
        } else {
          data.forEach(room => {
            const roomElement = createRoomElement(room);
            roomList.appendChild(roomElement);
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }

document.addEventListener("DOMContentLoaded", function() {
  displayRooms(1, 10);

});

  // Event listener for search button click
  searchButton.addEventListener("click", function() {
    const searchQuery = searchInput.value.trim();

    if (searchQuery !== "") {
      const url = `https://backendjustchat.darkmash.repl.co/search/${searchQuery}`;

      fetch(url, { mode: "cors" })
        .then(response => response.json())
        .then(data => {
          roomList.innerHTML = "";

          if (data.length === 0) {
            const noResults = document.createElement("p");
            noResults.textContent = "No rooms found.";
            roomList.appendChild(noResults);
          } else {
            data.forEach(room => {
              const roomElement = createRoomElement(room);
              roomList.appendChild(roomElement);
            });
          }
        })
        .catch(error => {
          console.log("Error:", error);
        });
    }
  });
