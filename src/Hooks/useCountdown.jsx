import { useState, useEffect } from 'react';

const useCountdown = (departureDate, departureTime) => {
  const [countdown, setCountdown] = useState(null);
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    if (!departureDate || !departureTime) {
      setCountdown(null);
      setIsPassed(false);
      return;
    }

    const departureDateTimeString = `${departureDate}T${departureTime}`;
    const departureTimeMs = new Date(departureDateTimeString).getTime();

    if (isNaN(departureTimeMs)) {
      setCountdown(null);
      setIsPassed(true); 
      return;
    }

    const calculateCountdown = () => {
      const nowMs = new Date().getTime();
      const differenceMs = departureTimeMs - nowMs;

      if (differenceMs <= 0) {
        setIsPassed(true);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return true; 
      }

      setIsPassed(false);

      const totalSeconds = Math.floor(differenceMs / 1000);
      const seconds = totalSeconds % 60;

      const totalMinutes = Math.floor(totalSeconds / 60);
      const minutes = totalMinutes % 60;

      const totalHours = Math.floor(totalMinutes / 60);
      const hours = totalHours % 24;

      const days = Math.floor(totalHours / 24);

      setCountdown({ days, hours, minutes, seconds });
      return false; 
    };

    const finished = calculateCountdown();

    let interval;
    if (!finished) {
      interval = setInterval(() => {
        calculateCountdown();
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [departureDate, departureTime]);

  return { countdown, isPassed };
};

export default useCountdown;