import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #ff4081;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f50057;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const StyledTitle = styled.h1`
  color: #1e1e1e;
  font-weight: bold;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 20px;
  font-family: "Roboto", sans-serif;
`;

const StyledP = styled.p`
  font-weight: bold;
  margin-bottom: 20px;
  font-family: "Roboto", serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #4a90e2;
  font-size: 2rem;
  text-align: center;
`;

const Timer = React.memo(() => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimeRef = useRef(0);
  const savedTimeRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    startTimeRef.current = Date.now() - savedTimeRef.current;
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 10);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  }, [time]);

  const startStop = useCallback(() => {
    setIsRunning((prev) => {
      if (!prev) {
        startTimeRef.current = Date.now() - savedTimeRef.current;
      } else {
        clearInterval(intervalRef.current);
        savedTimeRef.current = time;
      }
      return !prev;
    });
  }, [time]);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setTime(0);
    savedTimeRef.current = 0;
    setIsRunning(false);
  }, []);

  return (
    <div>
      <StyledTitle>Таймер</StyledTitle>
      <StyledP>{formattedTime}</StyledP>
      <StyledButton onClick={startStop}>
        {isRunning ? "Пауза" : "Старт"}
      </StyledButton>
      <StyledButton onClick={reset}>Сброс</StyledButton>
    </div>
  );
});

export default Timer;

Timer.displayName = "Timer";
