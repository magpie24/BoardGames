import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faPeopleArrows, faBabyCarriage, faEarthAmericas, faDice, faPlus } from '@fortawesome/free-solid-svg-icons';
import gamesData from './gamesData.json';
import './App.css'; // Import the CSS file

const App = () => {
    const [games, setGames] = useState(gamesData);
    const [activeButton, setActiveButton] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newGame, setNewGame] = useState({
        name: '',
        number_of_players: '',
        minimum_age: '',
        type_main_theme: '',
        language: '',
        short_description: '',
        image: ''
    });

    const showAllGames = () => {
        setGames(gamesData);
        setActiveButton('all');
    };

    const filterByAge = () => {
        const filteredGames = gamesData.filter(game => game.minimum_age >= 12);
        setGames(filteredGames);
        setActiveButton('age');
    };

    const filterByPlayers = () => {
        const filteredGames = gamesData.filter(game => game.number_of_players === 2);
        setGames(filteredGames);
        setActiveButton('players');
    };

    const filterByLanguage = () => {
        const filteredGames = gamesData.filter(game => game.language === 'English');
        setGames(filteredGames);
        setActiveButton('language');
    };

    const filterByType = () => {
        const filteredGames = gamesData.filter(game => game.type_main_theme.includes('Strategy'));
        setGames(filteredGames);
        setActiveButton('type');
    };

    const filterByTypes = () => {
        const filteredGames = gamesData.filter(game => game.type_main_theme.includes('Abstract'));
        setGames(filteredGames);
        setActiveButton('types');
    };

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter games based on the search query
        const filteredGames = gamesData.filter(game => 
            game.name.toLowerCase().includes(query) ||
            game.short_description.toLowerCase().includes(query)
        );
        setGames(filteredGames);
    };

    const handleInputChange = (e) => {
        setNewGame({ ...newGame, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setGames([...games, newGame]);
        setShowModal(false);
        setNewGame({
            name: '',
            number_of_players: '',
            minimum_age: '',
            type_main_theme: '',
            language: '',
            short_description: '',
            image: ''
        });
    };

    const getButtonStyle = (buttonName) => {
        return activeButton === buttonName
            ? { backgroundColor: '#EAB2B4', color: '#930004', borderColor: '#930004' }
            : {};
    };

    return (
        <div>
            <img src="img/logoo.png" width="80em" alt="BordSpilCafe Logo"></img>
            <h1>Explore the Fun!</h1>
            <div className="search-add-container">
    <input
        type="text"
        placeholder="Search games..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
    />
    <FontAwesomeIcon icon={faPlus} className="add-game-icon" onClick={() => setShowModal(true)} />
</div>

            <div className="button-container">
                <button
                    onClick={showAllGames}
                    style={getButtonStyle('all')}
                >
                    Show All Games
                </button>
                <button
                    onClick={filterByAge}
                    style={getButtonStyle('age')}
                >
                    Games for Age 12+
                </button>
                <button
                    onClick={filterByPlayers}
                    style={getButtonStyle('players')}
                >
                    Games for 2 Players
                </button>
                <button
                    onClick={filterByLanguage}
                    style={getButtonStyle('language')}
                >
                    Games in English
                </button>
                <button
                    onClick={filterByType}
                    style={getButtonStyle('type')}
                >
                    Strategy Games
                </button>
                <button
                    onClick={filterByTypes}
                    style={getButtonStyle('types')}
                >
                    Abstract Games
                </button>
            </div>
            <div className="games-container">
                {games.map((game, index) => (
                    <div className="game-item" key={index}>
                        <h2>{game.name}</h2>
                        <img src={game.image} alt={game.name} />
                        <p><FontAwesomeIcon icon={faPeopleArrows} /> Players: {game.number_of_players}</p>
                        <p><FontAwesomeIcon icon={faBabyCarriage} /> Age: {game.minimum_age}+</p>
                        <p><FontAwesomeIcon icon={faDice} /> Type: {game.type_main_theme}</p>
                        <p><FontAwesomeIcon icon={faEarthAmericas} /> Language: {game.language}</p>
                        <p>Description: {game.short_description}</p>
                    </div>
                ))}
            </div>

            {/* Add Game Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add New Game</h2>
                        <form onSubmit={handleSubmit}>
                            <input name="name" value={newGame.name} onChange={handleInputChange} placeholder="Name" required />
                            <input name="number_of_players" value={newGame.number_of_players} onChange={handleInputChange} placeholder="Number of Players" required />
                            <input name="minimum_age" value={newGame.minimum_age} onChange={handleInputChange} placeholder="Minimum Age" required />
                            <input name="type_main_theme" value={newGame.type_main_theme} onChange={handleInputChange} placeholder="Type/Main Theme" required />
                            <input name="language" value={newGame.language} onChange={handleInputChange} placeholder="Language" required />
                            <textarea name="short_description" value={newGame.short_description} onChange={handleInputChange} placeholder="Short Description" required />
                            <input name="image" value={newGame.image} onChange={handleInputChange} placeholder="Image Path" required />
                            <button type="submit">Add Game</button>
                            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
