const polyfill = (event) => {
  let element = event.target || null;
  const pathArr = [element];

  if (!element || !element.parentElement) {
    return [];
  }
  while (element.parentElement) {
    element = element.parentElement;
    pathArr.unshift(element);
  }

  return pathArr;
};

export default function getPropagationPath(event) {
  if (!event) {
    return null;
  }

  return event.path || (event.composedPath && event.composedPath()) || polyfill(event);
}
