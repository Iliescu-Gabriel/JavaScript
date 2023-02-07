const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(`No HTML element ${selection} was found!`);
};

export default getElement;