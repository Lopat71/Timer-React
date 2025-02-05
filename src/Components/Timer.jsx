import React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #ff4081; // Розовый
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f50057; // Темный розовый
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #e0e0e0; // Светло-серый
    cursor: not-allowed;
  }
`;

const StyledTitle = styled("h1")`
  color: #1e1e1e; // Очень темный серый
  font-weight: bold;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 20px;
  font-family: "Roboto", sans-serif;
`;

const StyledP = styled("p")`
  font-weight: bold; // Жирный текст

  margin-bottom: 20px; // Отступ снизу
  font-family: "Roboto", serif;
  font-optical-sizing: auto;

  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #4a90e2; // Светло-голубой
  font-size: 2rem;
  text-align: center;
`;

const Timer = React.memo(() => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatedTime = useMemo(() => {
    const minutes = Math.floor(time / 10000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  }, [time]);

  const startStop = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning]);

  const pause = useCallback(() => {
    setIsRunning(false);
    setTime(0);
  }, []);

  return (
    <div>
      <StyledTitle>Таймер</StyledTitle>
      <StyledP>{formatedTime}</StyledP>
      <StyledButton onClick={startStop}>
        {isRunning ? "Пауза" : "Старт"}
      </StyledButton>
      <StyledButton onClick={pause}>Сброс</StyledButton>
    </div>
  );
});
export default Timer;

Timer.displayName = "Timer";
