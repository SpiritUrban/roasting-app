import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  // Эффект для отслеживания монтирования компонента
  useEffect(() => {
    console.log('Компонент Counter был монтирован.');

    // Опционально, функция очистки при демонтировании компонента
    return () => {
      console.log('Компонент Counter будет размонтирован.');
    };
  }, []);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div>
      <h2>Счетчик: {count}</h2>
      <button onClick={handleIncrement}>Увеличить</button>
      <button onClick={handleDecrement}>Уменьшить</button>
    </div>
  );
};

export default Counter;
