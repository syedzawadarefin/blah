// Add event listeners to all "Add to Wishlist" buttons
document.addEventListener("DOMContentLoaded", () => {
    const addButtons = document.querySelectorAll(".add-btn");
    // const container = document.getElementById('watchlist-container')
  
    addButtons.forEach(button => {
      button.addEventListener("click", addGame);
    });
  });
  
  function addGame(event) {
    console.log("Button clicked")
    const gameCard = event.target.closest(".gameCard");
    const gameId = gameCard.getAttribute('data-id')
    const gameTitles = [
        'VALORANT', 'Fortnite', 'Marvel Rivals', 'Hades'
    ]

    if (!gameCard) return; 

    const game_title = gameTitles[gameId - 1];
    const rating = "0"; 
  
    const existingGame = games.find((game) => game.game_name === game_name);
    // Send POST request to backend
  // Check if the game already exists in the wishlist
  fetch(`http://localhost:3001/api/games?title=${game_title}`)
    .then(response => response.json())
    .then(data => {
      if (existingGame) {
        alert(`${game_title} is already in your wishlist!`);
      } else {
        // Game doesn't exist, add it to the database
        fetch('http://localhost:3001/api/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ game_title, rating })
        })
          .then(response => response.json())
          .then(data => {
            alert(`${game_title} has been added to your wishlist!`);
          })
          .catch(error => {
            console.error("Error adding game:", error);
            alert("An error occurred while adding the game. Please try again.");
          });
      }
    });
}
// Function to load study sessions from the backend
function loadGames() {
    fetch('http://localhost:3001/api/games')
        .then(response => response.json())
        .then(data => {
            gamesList.innerHTML = ''; // Clear the existing list
            data.forEach(session => {
                const gameItem = document.createElement('div');
                gameItem.className = 'gameTitle';
                gameItem.innerHTML = `
                    <h3>${session.game_title}</h3><br>
                    <p>Rating: ${session.rating}</p>
                    <button onclick="editGame(${session.id})">Edit</button>
                    <button onclick="deleteGame(${session.id})">Delete</button>
                `;
                watchlist-container.appendChild(gameItem);
            });
        })
        .catch(error => {
            console.error('Error fetching game items:', error);
        });
}
