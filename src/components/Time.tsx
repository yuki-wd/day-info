import React, { useState, useEffect } from 'react';
import moment from 'moment';

interface TimeProps {
  format?: string;
  interval?: number;
  style?: React.CSSProperties;
  className?: string;
}

const Time: React.FC<TimeProps> = ({ format, interval, style, className }) => {
  const [time, setTime] = useState(
    moment()
      .locale('ja')
      .format(format)
  );
  useEffect(() => {
    function update() {
      setTime(
        moment()
          .locale('ja')
          .format(format)
      );
    }
    if (interval) {
      const intervalId = setInterval(() => {
        update();
      }, interval);
      return () => {
        clearInterval(intervalId);
      };
    } else {
      update();
    }
  }, [time, format, interval]);
  return (
    <span className={className} style={{ ...style }}>
      {time}
    </span>
  );
};

export default Time;
