// Modal.js
import React, { useState } from 'react';
import './Modal.css'; // Optional: for styling the modal

const Modal = ({ game, onClose, onUpdate, onDelete }) => {
    const [updatedGame, setUpdatedGame] = useState({ ...game });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedGame(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUpdate = () => {
        onUpdate(updatedGame);
        onClose();
    };

    const handleDelete = () => {
        onDelete(game.name); // Using the game's name to identify it
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Update Game Information</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={updatedGame.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Number of Players:
                    <input
                        type="number"
                        name="number_of_players"
                        value={updatedGame.number_of_players}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Minimum Age:
                    <input
                        type="number"
                        name="minimum_age"
                        value={updatedGame.minimum_age}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Type/Theme:
                    <input
                        type="text"
                        name="type_main_theme"
                        value={updatedGame.type_main_theme}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Language:
                    <input
                        type="text"
                        name="language"
                        value={updatedGame.language}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="short_description"
                        value={updatedGame.short_description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Image Path:
                    <input
                        type="text"
                        name="image"
                        value={updatedGame.image}
                        onChange={handleChange}
                    />
                </label>
                <button onClick={handleUpdate}>Update Game</button>
                <button onClick={handleDelete} style={{ backgroundColor: '#CC484C', color: 'white' }}>Delete Game</button>
            </div>
        </div>
    );
};

export default Modal;
