import mixins from './mixins';
import media from './media';

const color = {
  background: {
    primary: '#F6F7F8',
    white: '#FFFFFF',
    lightgray: '#ECEFF1',
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
    lightgray: '#F6F7F8',
    lightblue: '#7282F3',
  },
  button: {
    lightblue: '#7282F3',
    red: '#EA8F99',
    blue: '#BBC8F3',
  },
};

export const theme = {
  color,
  media,
  mixins,
};
export type Theme = typeof theme;
