document.querySelectorAll('.add-btn').forEach(button => {
  button.addEventListener('click', function () {
      const gameTitle = this.parentElement.querySelector('p').innerText;

      fetch('/add-to-watchlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: gameTitle }),
      })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('Game added to your watchlist!');
              } else {
                  alert('Failed to add game to your watchlist.');
              }
          })
          .catch(error => {
              console.error('Error:', error);
              alert('An error occurred while adding the game.');
          });
  });
});