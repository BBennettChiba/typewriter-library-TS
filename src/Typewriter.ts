export default class Typewriter {
  element: HTMLElement;
  loop: boolean;
  typingSpeed: number;
  eraseSpeed: number;
  #buffer: Array<Function> = [];

  constructor(
    element: HTMLElement,
    { loop = true, typingSpeed = 100, eraseSpeed = 100 } = {}
  ) {
    this.element = element;
    this.loop = loop;
    this.typingSpeed = typingSpeed;
    this.eraseSpeed = eraseSpeed;
  }
  typeString(string: string) {
    this.#buffer.push(() => {
      this.element.innerText += string;
    });
    return this;
  }
  pauseFor(ms: number) {
    this.#buffer.push(() => {
      setTimeout(() => {}, ms);
    });
    return this;
  }
  deleteChars(charCount: number) {
    this.#buffer.push(() => {
      this.element.innerText = this.element.innerText.slice(0, -charCount);
    });
    return this;
  }

  deleteAll(speed = this.eraseSpeed) {
    this.#buffer.push(() => {
      this.element.innerText = "";
    });
    return this;
  }
  start() {
    this.#buffer.forEach((fn) => fn());
  }
}
