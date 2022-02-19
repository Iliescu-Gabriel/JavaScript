function getElement(element) {
  const el = document.querySelector(element);
  if (el) return el;
  throw new Error(`Element with selector ${element} not found`);
}

export default getElement;
