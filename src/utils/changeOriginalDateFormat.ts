const changeOriginalDateFormat = (date: string): string[] => {
  date = date.replace(/[년월]/g, '-');
  date = date.replace(/[일]/g, '');
  return date.split(' ~ ');
};

export default changeOriginalDateFormat;
