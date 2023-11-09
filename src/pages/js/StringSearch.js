import React, { useState, useEffect } from "react";
import axios from 'axios';
import yaml from 'js-yaml';
import { log, loadYaml } from 'utils';
import Teacher from 'features/Teacher';

const StringMethods = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const yamlData = await loadYaml('/data/js/StringSearch.yaml');
        setData(yamlData);
      } catch (error) {
        console.error('Ошибка при загрузке YAML данных:', error);
      }
    })();
    return () => {
      console.log("Компонент Counter будет размонтирован.");
    };
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h2>JavaScript String Search</h2>
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
