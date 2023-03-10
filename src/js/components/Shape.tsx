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
