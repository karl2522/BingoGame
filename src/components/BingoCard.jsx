import PropTypes from 'prop-types';
import { useState } from 'react';
import './styles.css';

// BingoCard component
const BingoCard = ({ cardData, onCheckWin, gameCode, playcardToken, status }) => {
  return (
    <div className="bingo-card-container">
      <div className="bingo-card">
        <div className="bingo-header">
          {['B', 'I', 'N', 'G', 'O'].map((letter) => (
            <div key={letter} className="bingo-header-letter">
              {letter}
            </div>
          ))}
        </div>
        <div className="bingo-grid">
          {['B', 'I', 'N', 'G', 'O'].map((column) =>
            cardData[column].map((value, rowIndex) => (
              <div key={`${column}-${rowIndex}`} className="bingo-cell">
                {value}
              </div>
            ))
          )}
        </div>
        <div className="info-section">
          <div>Player Token: <span className="token">{playcardToken}</span></div>
          <div>Game Code: <span className="code">{gameCode}</span></div>
          <div>Card Status: <span className="status">{status}</span></div>
        </div>
        <button onClick={onCheckWin} className="check-win-btn">
          Check Win
        </button>
      </div>
    </div>
  );
};

// PropTypes for BingoCard
BingoCard.propTypes = {
  cardData: PropTypes.shape({
    B: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    I: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    N: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    G: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    O: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  }).isRequired,
  onCheckWin: PropTypes.func.isRequired,
  gameCode: PropTypes.string.isRequired,
  playcardToken: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

// Main BingoApp component
const BingoApp = () => {
  const [gameCode, setGameCode] = useState('');
  const [cards, setCards] = useState([]);

  // Fetch Bingo Card data
  const fetchCard = async () => {
    try {
      const response = await fetch(`http://www.hyeumine.com/getcard.php?bcode=${gameCode}`);
      const data = await response.json();

      if (data === 0) {
        alert('Game code not found');
      } else {
        setCards((prevCards) => [
          ...prevCards,
          {
            card: data.card,
            playcard_token: data.playcard_token,
            game_code: gameCode,
            status: '',
          },
        ]);
        alert('Card Key Successfully Added!');
      }
    } catch (error) {
      console.error('Error fetching card:', error);
      alert('Error fetching card');
    }
  };

  // Check if the Bingo card is a winning card
  const checkWin = async (playcardToken) => {
    try {
      const response = await fetch(`http://www.hyeumine.com/checkwin.php?playcard_token=${playcardToken}`);
      const data = await response.text();

      if (data === '0') {
        alert('Not a winning card');
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.playcard_token === playcardToken ? { ...card, status: 'Not a winning card' } : card
          )
        );
      } else if (data === '1') {
        alert('Winning card!');
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.playcard_token === playcardToken ? { ...card, status: 'Winning Card!' } : card
          )
        );
      } else {
        alert('Error checking win');
      }
    } catch (error) {
      console.error('Error checking win:', error);
      alert('Error checking win');
    }
  };

  return (
    <div className="bingo-app">
      <h1 className="title">Bingo Plus</h1>
      <div className="game-input">
        <input
          type="text"
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value)}
          placeholder="Enter game code"
        />
        <button onClick={fetchCard} className="join-game-btn">
          Join Game
        </button>
      </div>
      <div className="cards-container">
        {cards.map((card, index) => (
          <BingoCard
            key={index}
            cardData={card.card}
            gameCode={card.game_code}
            playcardToken={card.playcard_token}
            status={card.status}
            onCheckWin={() => checkWin(card.playcard_token)}
          />
        ))}
      </div>
    </div>
  );
};

export default BingoApp;
