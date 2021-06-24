const schemes = {
  'solid-green': {
    default: {
      blur: {
        bg: 'seagreen', // bg-seagreen
        border: 'seagreen', // border-seagreen
        text: 'white', // text-white
      },
      hover: {
        bg: 'limegreen', // hover:bg-limegreen
        border: 'limegreen', // hover:border-limegreen
        text: 'white', // hover:text-white
      },
    },
  },
  'outline-red': {
    default: {
      blur: {
        bg: 'transparent', // bg-transparent
        border: 'indianred', // border-indianred
        text: 'indianred', // text-indianred
      },
      hover: {
        bg: 'indianred', // hover:bg-indianred
        border: 'indianred', // hover:border-indianred
        text: 'white', // hover:text-white
      },
    },
  },
};

export default schemes;
