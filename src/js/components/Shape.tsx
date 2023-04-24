import React from 'react';

interface Props {
  onClick: () => void
}

export function PlayShape({ onClick }: Props) {
  return (
    <div className="shape" onClick={onClick}>
      <div className="play-shape" />
    </div>
  );
}

export function PauseShape({ onClick }: Props) {
  return (
    <div className="shape" onClick={onClick}>
      <div className="pause-shape" />
      <div className="pause-shape" />
    </div>
  );
}

export function SoundOnShape({ onClick }: Props) {
  return (
    <svg viewBox="0 0 100 100" className="svg sound-on" onClick={onClick}>
      <g>
        <polygon fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" points="3,32 3,20 15,20 33,2 33,32 33,62 15,44
        3,44    "/>
        <path fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" d="M41,42c5.522,0,10-4.478,10-10s-4.478-10-10-10"/>
        <path fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" d="M41,12c11.046,0,20,8.954,20,20s-8.954,20-20,20"/>
      </g>
    </svg>
  );
}

export function SoundOffShape({ onClick }: Props) {
  return (
    <svg viewBox="0 0 100 100" className="svg sound-off" onClick={onClick}>
      <g>
        <polygon fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" points="4,32 4,20 16,20 34,2 34,32 34,62 16,44
          4,44    "/>
        <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="42" y1="23" x2="60" y2="41"/>
        <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="42" y1="41" x2="60" y2="23"/>
      </g>
    </svg>
  );
}
