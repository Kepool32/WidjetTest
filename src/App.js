import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [meetingRecords, setMeetingRecords] = useState([]);

    useEffect(() => {
        if (modalIsOpen) {
            fetchMeetingRecords();
        }
    }, [modalIsOpen]); // Теперь запрос на записи встреч отправляется только при открытии модального окна

    const fetchMeetingRecords = async () => {
        try {
            const response = await fetch('https://slmaxzoom.outer.cnvl.io/api/zoom/records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: JSON.stringify({ domain: 'testdomain' })
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setMeetingRecords(data.data); // Устанавливаем записи встреч в состояние
            } else {
                console.error('Ошибка при получении записей встреч:', response.status);
            }
        } catch (error) {
            console.error('Ошибка при получении записей встреч:', error);
        }
    };

    return (
        <div className="App">
            <button className="open-modal-button" onClick={() => setModalIsOpen(true)}>Открыть модальное окно</button>
            {modalIsOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h1>Список встреч</h1>
                        <ul>
                            {meetingRecords.map((record, index) => (
                                <li key={index}>
                                    <strong>ID:</strong> {record.id}<br />
                                    <strong>Домен:</strong> {record.domain}<br />
                                    <strong>Ссылка на запись:</strong> {record.record_link}<br />
                                    <strong>Дата создания:</strong> {record.created_at}
                                </li>
                            ))}
                        </ul>
                        <button className="close-modal-button" onClick={() => setModalIsOpen(false)}>Закрыть модальное окно</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
