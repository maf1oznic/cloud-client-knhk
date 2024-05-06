import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {API_URL} from "../../config";

const DiskSpaceInfo = () => {
    const [diskSpace, setDiskSpace] = useState({ usedSpace: 0, diskSpace: 0 });

    useEffect(() => {
        const fetchDiskSpace = async () => {
            try {
                const token = localStorage.getItem('token'); // Получаем токен из localStorage
                const response = await axios.get(`${API_URL}api/user/disk-space`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Добавляем токен в заголовок запроса
                    }
                });
                setDiskSpace(response.data);
            } catch (error) {
                console.error('Ошибка при получении информации о дисковом пространстве:', error);
            }
        };

        fetchDiskSpace();
    }, []);

    const calculateProgress = () => {
        if (diskSpace.diskSpace === 0) return 0;
        return (diskSpace.usedSpace / diskSpace.diskSpace) * 100; // Рассчет процента использованного места
    };

    // Функция для форматирования числа с двумя знаками после запятой
    const formatNumber = (number) => {
        return parseFloat(number).toFixed(2);
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', left: '20px', backgroundColor: 'white', padding: '10px', border: '2px solid #007BFF', borderRadius: '6px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            
            <div style={{ width: '100%', height: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${calculateProgress()}%`, height: '100%', backgroundColor: '#007bff' }}></div>
            </div>
            <div style={{ marginBottom: '10px' }}></div>
            <p>Свободно {formatNumber((diskSpace.diskSpace - diskSpace.usedSpace) / (1024 * 1024 * 1024))} ГБ из {(diskSpace.diskSpace / (1024 * 1024 * 1024))} ГБ</p>
        </div>
    );
};

export default DiskSpaceInfo;
