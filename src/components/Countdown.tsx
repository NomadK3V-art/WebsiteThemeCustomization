import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [label, setLabel] = useState('Open Enrollment opens in');
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const start = new Date(2026, 10, 1, 0, 0, 0); // Nov 1, 2026
    const end = new Date(2026, 11, 16, 0, 0, 0); // Dec 15, 2026

    const timer = setInterval(() => {
      const now = new Date();
      let target;

      if (now < start) {
        target = start;
        setLabel('Open Enrollment opens in');
      } else if (now < end) {
        target = end;
        setLabel('Open Enrollment ends in — enroll now');
      } else {
        setIsClosed(true);
        setLabel('Open Enrollment for 2027 has closed');
        clearInterval(timer);
        return;
      }

      const diff = Math.max(0, target.getTime() - now.getTime());
      setTimeLeft({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff % 864e5) / 36e5),
        m: Math.floor((diff % 36e5) / 6e4),
        s: Math.floor((diff % 6e4) / 1e3)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => (n < 10 ? '0' + n : n);

  return (
    <>
      <div className="oe-label" id="oeLabel">{label}</div>
      <div className="oe-clock" id="oeClock">
        {isClosed ? (
          <div className="oe-closed">Missed it? You may still qualify to enroll through a Special Enrollment Period — let's talk.</div>
        ) : (
          <>
            <div className="oe-unit"><span className="oe-num">{pad(timeLeft.d)}</span><span className="oe-u">days</span></div>
            <div className="oe-unit"><span className="oe-num">{pad(timeLeft.h)}</span><span className="oe-u">hrs</span></div>
            <div className="oe-unit"><span className="oe-num">{pad(timeLeft.m)}</span><span className="oe-u">min</span></div>
            <div className="oe-unit"><span className="oe-num">{pad(timeLeft.s)}</span><span className="oe-u">sec</span></div>
          </>
        )}
      </div>
    </>
  );
}
