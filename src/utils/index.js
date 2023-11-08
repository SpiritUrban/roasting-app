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


export function playSound(path, volume = 1) {
  let audio = new Audio(path);
  audio.volume = volume;
  audio
    .play()
    .then(() => {
      console.log("Audio played successfully");
    })
    .catch((error) => {
      console.error("Audio play failed:", error);
      // Здесь можно добавить логику восстановления или информировать пользователя
    });
}

export function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  // Здесь вы можете настроить параметры, такие как скорость, высота и т. д.
  // Например:
  utterance.rate = 0.8; // скорость озвучивания (1 - нормальная скорость)
  // utterance.pitch = 1; // высота звука (1 - нормальная высота)
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function speakText2(text, clb) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.onend = function (event) {
    console.log("Озвучивание закончилось");
    clb();
  };
  // Здесь вы можете настроить параметры, такие как скорость, высота и т. д.
  // Например:
  utterance.rate = 0.8; // скорость озвучивания (1 - нормальная скорость)
  // utterance.pitch = 1; // высота звука (1 - нормальная высота)
  var voices = window.speechSynthesis.getVoices();

  // Google UK English Female (en-GB) [remote]
  //   utterance.voice = voices.filter(function (voice) {
  //     return voice.name == "Google UK English Female";
  //   })[0];

  var englishVoices = speechSynthesis.getVoices().filter(function (voice) {
    return voice.lang.indexOf("en") === 0; // фильтруем голоса, язык которых начинается на 'en'
  });

  //   console.log("Available English voices:");
  englishVoices.forEach(function (voice, index) {
    // console.log(
    //   index +
    //     1 +
    //     ": " +
    //     voice.name +
    //     " (" +
    //     voice.lang +
    //     ") [" +
    //     (voice.localService ? "local" : "remote") +
    //     "]"
    // );
  });

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export const scrollDown = () => window.scrollTo(0, document.body.scrollHeight);
