// Snowflakes.js
import React, { useEffect } from 'react';
import './Snowflakes.css';

const Snowflakes = () => {
  useEffect(() => {
    const intervalId = setInterval(createSnowflake, 180);
    
    return () => clearInterval(intervalId);
  }, []);

  const createSnowflake = () => {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';

    document.body.appendChild(snowflake);

    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 20 + 10 + 'px';

    setTimeout(() => {
      snowflake.remove();
    }, 5000);
  };

  return null;
};

export default Snowflakes;
