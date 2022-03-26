type StarIconType = {
  isFavorited: boolean
  onClick?: () => void
}

const StarIcon = ({ isFavorited, onClick }: StarIconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="35"
      viewBox="0 0 40 35"
      onClick={onClick}
    >
      <g
        id="Polygon_7"
        data-name="Polygon 7"
        fill={isFavorited ? "#F3DD13" : "#fff"}
      >
        <path
          d="M 29.23735237121582 33.66830062866211 L 20.32925033569336 25.87371063232422 L 20 25.58562088012695 L 19.67074966430664 25.87371063232422 L 10.7626485824585 33.66830062866211 L 12.99116992950439 21.96855926513672 L 13.07176971435547 21.54537963867188 L 12.66518020629883 21.4030704498291 L 1.513551473617554 17.5 L 12.66518020629883 13.5969295501709 L 13.07176971435547 13.45462036132812 L 12.99116992950439 13.03143978118896 L 10.76263904571533 1.331709861755371 L 19.67074966430664 9.126290321350098 L 20 9.414380073547363 L 20.32925033569336 9.126290321350098 L 29.23735237121582 1.331701040267944 L 27.00882911682129 13.03143978118896 L 26.92823028564453 13.45462036132812 L 27.33481979370117 13.5969295501709 L 38.4864501953125 17.5 L 27.33481979370117 21.4030704498291 L 26.92823028564453 21.54537963867188 L 27.00882911682129 21.96855926513672 L 29.23735237121582 33.66830062866211 Z"
          stroke="none"
        />
        <path
          d="M 11.5252857208252 2.663398742675781 L 13.64355087280273 13.78424072265625 L 3.027091979980469 17.5 L 13.64355087280273 21.21575927734375 L 11.52529335021973 32.33660125732422 L 20 24.92123031616211 L 28.47470474243164 32.33660125732422 L 26.35644912719727 21.21575927734375 L 36.97290802001953 17.5 L 26.35644912719727 13.78424072265625 L 28.47470474243164 2.663398742675781 L 20 10.07876968383789 L 11.5252857208252 2.663398742675781 M 9.999990463256836 0 L 20 8.75 L 30 0 L 27.5 13.125 L 40 17.5 L 27.5 21.875 L 30 35 L 20 26.25 L 10 35 L 12.5 21.875 L 0 17.5 L 12.5 13.125 L 9.999990463256836 0 Z"
          stroke="none"
          fill={isFavorited ? "#C9B602" : "#707070"}
        />
      </g>
    </svg>
  )
}

export default StarIcon
