import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [meetingRecords, setMeetingRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMeetingRecords = async () => {
            setIsLoading(true);
            try {
                const response = await axios.post(
                    'https://slmaxzoom.outer.cnvl.io/api/zoom/records',
                    { domain: domain, page: currentPage, perPage: 2 }
                );
                setMeetingRecords(response.data.data);
                setTotalPages(response.data.last_page);
            } catch (error) {
                console.error('Error fetching meeting records:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (currentPage > 0) {
            fetchMeetingRecords();
        }
    }, [currentPage]); // Добавлен currentPage в массив зависимостей

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
    };

    let id=window.AMOCRM.data.current_card.id || 0
    let entity=window.AMOCRM.data.current_entity || ""
    let domain = window.AMOCRM.widgets.system.domain || "";
    let name=window.AMOCRM.data.current_card.user.name || "";


    const createMeeting = async () => {
        try {
            await axios.post('https://slmaxzoom.outer.cnvl.io/api/zoom/meetings', {
                domain: domain,
                first_name: name,
                entity: entity,
                entity_id: id
            });

            setCurrentPage(1);
        } catch (error) {
            console.error('Error creating meeting:', error);
        }
    };
    return (
        <div className="App">
            <button className="open-modal-button" onClick={() => setModalIsOpen(true)}>Открыть модальное окно</button>
            {modalIsOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="create-meeting-button" onClick={createMeeting}>Создать встречу</button>
                        <h1>Список встреч</h1>
                        <ul>
                            {isLoading ? (
                                <p>Загрузка...</p>
                            ) : (
                                meetingRecords.map((record, index) => (
                                    <li key={index}>
                                        <div className="record-item">
                                            <div>{formatDateString(record.created_at)}</div>
                                            <a href={record.record_link} target="_blank" rel="noopener noreferrer">Ссылка на запись</a>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                        <div className="pagination-buttons">
                            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                        </div>
                        <button className="close-modal-button" onClick={() => setModalIsOpen(false)}>Закрыть модальное окно</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
