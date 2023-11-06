import React, { useState, useEffect } from "react";
import axios from 'axios';
import yaml from 'js-yaml';

const log = console.log;

const StringMethods = () => {
  const [data, setData] = useState(null);

  // Эффект для отслеживания монтирования компонента
  useEffect(() => {

    const loadData = async () => {
      const result = await axios.get('/data/js/StringMethods.yaml');
      const jsonData = yaml.load(result.data);
      log(jsonData)
      setData(jsonData);
    };

    loadData();

    return () => {
      console.log("Компонент Counter будет размонтирован.");
    };
  }, []);

  return (
    <div>
      {data ? (
         <div>
         <h2>Пользователи:</h2>
         <ul>
           {data.map((item, i) => (
             <li key={'js-data-str-teth-'+i}>
               header: {item.header}
             </li>
           ))}
         </ul>
       </div>
      ) : (
        <p>Loading...</p>
      )
      }
    </div >
  );
};

export default StringMethods;
