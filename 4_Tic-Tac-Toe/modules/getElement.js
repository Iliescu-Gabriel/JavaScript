const getElement = (element) => {
  const el = document.querySelector(element);
  if (el) return el;
  throw new Error(`No element with selector ${element} found!`);
};

export default getElement;
