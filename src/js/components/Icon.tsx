type Props = {
  onClick: () => void;
};

export function PlayIcon({ onClick }: Props) {
  return (
    <svg
      onClick={onClick}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="163.861px"
      height="163.861px"
      viewBox="0 0 163.861 163.861"
      className="play icon"
    >
      <g>
        <path
          d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275
		c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z"
        />
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
}

export function PauseIcon({ onClick }: Props) {
  return (
    <svg
      onClick={onClick}
      height="512"
      className="pause icon"
      viewBox="0 0 32 32"
      width="512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Layer_33" data-name="Layer 33">
        <path d="m14 5v22a3 3 0 0 1 -3 3h-3a3 3 0 0 1 -3-3v-22a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3zm10-3h-3a3 3 0 0 0 -3 3v22a3 3 0 0 0 3 3h3a3 3 0 0 0 3-3v-22a3 3 0 0 0 -3-3z" />
      </g>
    </svg>
  );
}

export function SoundOnIcon({ onClick }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className="sound-on icon"
      onClick={onClick}
    >
      <g>
        <polygon
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeMiterlimit="10"
          points="3,32 3,20 15,20 33,2 33,32 33,62 15,44
          3,44    "
        />
        <path
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeMiterlimit="10"
          d="M41,42c5.522,0,10-4.478,10-10s-4.478-10-10-10"
        />
        <path
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeMiterlimit="10"
          d="M41,12c11.046,0,20,8.954,20,20s-8.954,20-20,20"
        />
      </g>
    </svg>
  );
}

export function SoundOffIcon({ onClick }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className="sound-off icon"
      onClick={onClick}
    >
      <g>
        <polygon
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeMiterlimit="10"
          points="4,32 4,20 16,20 34,2 34,32 34,62 16,44
          4,44    "
        />
        <line
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeMiterlimit="10"
          x1="42"
          y1="23"
          x2="60"
          y2="41"
        />
        <line
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeMiterlimit="10"
          x1="42"
          y1="41"
          x2="60"
          y2="23"
        />
      </g>
    </svg>
  );
}

export function RefreshIcon({ onClick }: Props) {
  return (
    <svg
      onClick={onClick}
      className="refresh icon"
      x="0px"
      y="0px"
      width="438.542px"
      height="438.542px"
      viewBox="0 0 438.542 438.542"
    >
      <g>
        <path
          d="M427.408,19.697c-7.803-3.23-14.463-1.902-19.986,3.999l-37.116,36.834C349.94,41.305,326.672,26.412,300.5,15.848
		    C274.328,5.285,247.251,0.003,219.271,0.003c-29.692,0-58.052,5.808-85.08,17.417c-27.03,11.61-50.347,27.215-69.951,46.82
		    c-19.605,19.607-35.214,42.921-46.824,69.949C5.807,161.219,0,189.575,0,219.271c0,29.687,5.807,58.05,17.417,85.079
		    c11.613,27.031,27.218,50.347,46.824,69.952c19.604,19.599,42.921,35.207,69.951,46.818c27.028,11.611,55.388,17.419,85.08,17.419
		    c32.736,0,63.865-6.899,93.363-20.7c29.5-13.795,54.625-33.26,75.377-58.386c1.52-1.903,2.234-4.045,2.136-6.424
		    c-0.089-2.378-0.999-4.329-2.711-5.852l-39.108-39.399c-2.101-1.711-4.473-2.566-7.139-2.566c-3.045,0.38-5.232,1.526-6.566,3.429
		    c-13.895,18.086-30.93,32.072-51.107,41.977c-20.173,9.894-41.586,14.839-64.237,14.839c-19.792,0-38.684-3.854-56.671-11.564
		    c-17.989-7.706-33.551-18.127-46.682-31.261c-13.13-13.135-23.551-28.691-31.261-46.682c-7.708-17.987-11.563-36.874-11.563-56.671
		    c0-19.795,3.858-38.691,11.563-56.674c7.707-17.985,18.127-33.547,31.261-46.678c13.135-13.134,28.693-23.555,46.682-31.265
		    c17.983-7.707,36.879-11.563,56.671-11.563c38.259,0,71.475,13.039,99.646,39.116l-39.409,39.394
		    c-5.903,5.711-7.231,12.279-4.001,19.701c3.241,7.614,8.856,11.42,16.854,11.42h127.906c4.949,0,9.23-1.807,12.848-5.424
		    c3.613-3.616,5.42-7.898,5.42-12.847V36.55C438.542,28.558,434.84,22.943,427.408,19.697z"
        />
      </g>
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </svg>
  );
}

export function StalledIcon() {
  return (
    <div className="stalled icon flex justify-end w-10">
      <div />
      <div />
      <div />
    </div>
  );
}

export function Arrow({ direction }: { direction: string }) {
  return (
    <svg
      className={classNames(`${direction}-arrow`, "icon")}
      viewBox="0 0 512.171 512.171"
    >
      <g>
        <g>
          <path
            d="M509.035,248.212l-213.504-212.8c-3.051-3.029-7.595-3.904-11.627-2.304c-3.989,1.664-6.571,5.547-6.571,9.856v117.333
			    H10.667C4.779,160.298,0,165.076,0,170.964v170.667c0,5.888,4.779,10.667,10.667,10.667h266.667v116.885
			    c0,4.309,2.603,8.192,6.592,9.856c1.323,0.555,2.709,0.811,4.075,0.811c2.773,0,5.504-1.088,7.552-3.115l213.504-213.419
			    c2.005-2.005,3.115-4.715,3.115-7.552C512.171,252.927,511.04,250.218,509.035,248.212z"
          />
        </g>
      </g>
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </svg>
  );
}
