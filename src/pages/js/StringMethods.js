import React, { useState, useEffect } from "react";
import axios from 'axios';
import yaml from 'js-yaml';
import { log, loadYaml } from 'utils';
import Teacher from 'features/Teacher';



const StringMethods = () => {
  const [data, setData] = useState(null);

  // Эффект для отслеживания монтирования компонента
  useEffect(() => {
    // Немедленно вызываемая асинхронная функция (IIFE)
    (async () => {
      try {
        const yamlData = await loadYaml('/data/js/StringMethods.yaml');
        setData(yamlData);
      } catch (error) {
        console.error('Ошибка при загрузке YAML данных:', error);
      }
    })();
    return () => {
      console.log("Компонент Counter будет размонтирован.");
    };
  }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз после первого рендера.


  return (
    <div>
      {data ? (
        <div>
          <h2>Пользователи:</h2>
          
          <Teacher data={data}/>
        </div>
      ) : (
        <p>Loading...</p>
      )
      }
    </div >
  );
};

export default StringMethods;
