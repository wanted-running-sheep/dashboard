import mixins from './mixins';
import media from './media';

const color = {
  background: {
    primary: '#F6F7F8',
    white: '#FFFFFF',
    lightgray: '#ECEFF1',
    navy: '#39474E',
  },
  graph: {
    blue: '#4FADF7',
    green: '#85DA47',
    purple: '#AC89F8',
  },
  font: {
    primary: '#39474E',
    white: '#ffffff',
    lightblue: '#7282F3',
    darkblue: '#2338d8',
    lightgray: '#AEB8C1',
  },
  border: {
    lightgray: '#e8e8e8',
    lightblue: '#7282F3',
  },
  button: {
    black: '#000000',
    lightblue: '#7282F3',
    red: '#F55859',
    blue: '#1B91EA',
  },
};

export const theme = {
  color,
  media,
  mixins,
};
export type Theme = typeof theme;
