const getElement = (element) => {
  let el = document.querySelector(element);
  if (el) return el;
  throw new Error(`No HTML element ${element} was found!`);
};

export default getElement;
