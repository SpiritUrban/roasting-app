import React, { useState, useEffect } from "react";
import { loadYaml } from 'utils';
import Teacher from 'features/Teacher';

const globals = {
  base: '/roasting-app'
};

const StringMethods = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const yamlData = await loadYaml(globals.base + '/data/js/StringMethods.yaml');
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
          <h2>JavaScript String Methods</h2>
          <Teacher data={data} />
        </div>
      ) : (
        <p>Loading...</p>
      )
      }
    </div >
  );
};

export default StringMethods;
