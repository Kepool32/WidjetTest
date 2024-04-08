import React, { useState } from 'react';
import './App.css';

function App() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className="App">
            <button className="open-modal-button" onClick={() => setModalIsOpen(true)}>Открыть модальное окно</button>
            {modalIsOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h1>Простое модальное окно</h1>
                        <p>Содержимое вашего модального окна...</p>
                        <button className="close-modal-button" onClick={() => setModalIsOpen(false)}>Закрыть модальное окно</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
