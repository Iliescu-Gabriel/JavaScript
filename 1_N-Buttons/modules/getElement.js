const getElement = (element) => {
  let el = document.querySelector(element);
  if (el) return el;
  throw new Error(`Element with selector ${element} was not found!`);
};

export default getElement;
