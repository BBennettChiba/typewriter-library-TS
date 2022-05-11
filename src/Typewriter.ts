export default class Typewriter {
  element: HTMLDivElement;
  parent: HTMLElement;
  loop: boolean;
  typingSpeed: number;
  eraseSpeed: number;
  #buffer: Array<Function> = [];

  constructor(
    parent: HTMLElement,
    { loop = true, typingSpeed = 100, eraseSpeed = 100 } = {}
  ) {
    this.parent = parent;
    this.element = document.createElement("div");
    parent.append(this.element);
    this.loop = loop;
    this.typingSpeed = typingSpeed;
    this.eraseSpeed = eraseSpeed;
  }
  typeString(string: string) {
    let i = 0;
    this.#buffer.push(() => {
      return new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          this.element.innerText += string[i];
          i++;
          if (i === string.length) {
            clearInterval(interval);
            resolve();
          }
        }, this.typingSpeed);
      });
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
  async start() {
    for (let fn of this.#buffer) {
      await fn();
    }
  }
}
