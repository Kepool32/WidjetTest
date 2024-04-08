import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
      <div className="App">
        <button className="open-modal-button" onClick={() => setModalIsOpen(true)}>Открыть модальное окно</button>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            className="modal-content"
            overlayClassName="modal-overlay"
            contentLabel="Простое модальное окно"
        >
            <h1>hello world</h1>
            <h2>manera hahah</h2>
            <h3>krytit mir</h3>
          <button className="close-modal-button" onClick={() => setModalIsOpen(false)}>Закрыть модальное окно</button>
        </Modal>
      </div>
  );
}

export default App;
