document.addEventListener('DOMContentLoaded', () => {
    attachAddToWishlistListeners();
    updateWatchlist();
  });

function addToWishlist(gameId) {
    fetch(`/api/games/${gameId}`)
      .then(response => response.json())
      .then(watchlist => {
        fetch('/add-to-watchlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: watchlist.game_title }),
        }).then(res => res.json())
          .then(data => {
            if (data.success) {
              alert('Game added to your wishlist!');
              updateWatchlist();
            } else {
              alert('Failed to add game to your wishlist.');
            }
          });
      });
  }
  
  function updateWatchlist() {
    fetch('/get-watchlist')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const watchlist = document.querySelector('.watchlist');
          watchlist.innerHTML = '<h2>Your Watchlist</h2>';
          data.watchlist.slice(0, 3).forEach(item => {
            const div = document.createElement('div');
            div.className = 'watchlist-item';
            div.textContent = item.game_title;
            watchlist.appendChild(div);
          });
        }
      });
  }
  
