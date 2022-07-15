import mixins from './mixins';

const color = {
  background: {
    primary: '#F6F7F8',
    white: '#FFFFFF',
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
    lightgray: '#AEB8C1',
  },
  border: {
    lightblue: '#7282F3',
  },
  button: {
    lightblue: '#7282F3',
  },
};

export const theme = {
  color,
  mixins,
};
export type Theme = typeof theme;
