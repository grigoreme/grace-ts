// tslint:disable-next-line: function-name
export function SafePath(path) {
  const option = (option) => {
    const result = path.split(option)[1];
    return (result ? `${option}/${result}` : '').replace(/(\/\\)|(\/\/)/g, '/');
  };
  return option('dist') || option('src') || path || '';
}
