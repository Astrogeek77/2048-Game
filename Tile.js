export default class Tile {
  #tileElement;
  #x;
  #y;
  #value;

  constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {
    this.#tileElement = document.createElement('div');
    this.#tileElement.classList.add('tile');
    tileContainer.append(this.#tileElement);
    this.value = value;
  }
  // get value of a cell
  get value() {
    return this.#value;
  }

  // chnage lightness and numbers as the game progresses
  set value(v) {
    this.#value = v;
    this.#tileElement.textContent = v;
    const power = Math.log2(v); // gives the power of two (inc on combining tiles in game)
    const backgroundLightness = 100 - power * 9; // based on deduction
    this.#tileElement.style.setProperty(
      '--background-lightness',
      `${backgroundLightness}%`
    );
    this.#tileElement.style.setProperty(
      '--text-lightness',
      `${backgroundLightness <= 50 ? 90 : 10}%` // in contrast with the color
    );
  }

  set x(value) {
    this.#x = value;
    this.#tileElement.style.setProperty('--x', value);
  }

  set y(value) {
    this.#y = value;
    this.#tileElement.style.setProperty('--y', value);
  }

  remove() {
    this.#tileElement.remove();
  }

  // transition during gameplay...
  waitForTransition(animation = false) {
    return new Promise((resolve) => {
      this.#tileElement.addEventListener(
        animation ? 'animationend' : 'transitionend',
        resolve,
        {
          once: true,
        }
      );
    });
  }
}
