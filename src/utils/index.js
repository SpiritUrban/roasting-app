import axios from 'axios';
import yaml from 'js-yaml';


// Функция для задержки выполнения (используется для имитации асинхронности)
export const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const log = console.log;

export const loadYaml = async (path) =>{
    const result = await axios.get(path);
    return yaml.load(result.data);
};

// Функция для форматирования даты в удобочитаемый формат
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Функция для получения параметров запроса из URL
export const getQueryParams = (url) => {
    return new URLSearchParams(url);
};

// Функция для выполнения глубокого клонирования объектов
export const deepClone = (object) => {
    return JSON.parse(JSON.stringify(object));
};

// Функция для проверки, является ли строка валидным JSON
export const isValidJSON = (string) => {
    try {
        JSON.parse(string);
        return true;
    } catch (e) {
        return false;
    }
};


// Функция для генерации уникального ID
export const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

// Экспорт всех утилит в объекте, если нужен именованный экспорт
// export default {
//     formatDate,
//     getQueryParams,
//     deepClone,
//     isValidJSON,
//     delay,
//     generateUniqueId,
// };
