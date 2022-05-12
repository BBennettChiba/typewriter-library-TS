export default class Typewriter {
  element: HTMLDivElement;
  loop: boolean;
  typingSpeed: number;
  eraseSpeed: number;
  #buffer: Array<any> = [];

  #addToBuffer(func: (resolve: () => void) => void) {
    this.#buffer.push(() => {
      return new Promise<void>(func);
    });
  }
  constructor(parent: HTMLElement, { loop = true, typingSpeed = 100, eraseSpeed = 100 } = {}) {
    this.element = document.createElement("div");
    parent.append(this.element);
    this.loop = loop;
    this.typingSpeed = typingSpeed;
    this.eraseSpeed = eraseSpeed;
  }

  typeString(string: string) {
    this.#addToBuffer((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        this.element.innerText += string[i];
        i++;
        if (i === string.length) {
          clearInterval(interval);
          resolve();
        }
      }, this.typingSpeed);
    });
    return this;
  }

  pauseFor(ms: number) {
    this.#addToBuffer((resolve) => {
      setTimeout(() => {}, ms);
      resolve();
    });
    return this;
  }

  deleteChars(charCount: number) {
    this.#addToBuffer((resolve) => {
      let i = charCount;
      const interval = setInterval(() => {
        this.element.innerText = this.element.innerText.slice(0, -1);
        i--;
        if (i === 0) {
          clearInterval(interval);
          resolve();
        }
      }, this.eraseSpeed);
    });
    return this;
  }

  deleteAll(speed = this.eraseSpeed) {
    this.#addToBuffer((resolve) => {
      let i = this.element.innerText.length;
      const interval = setInterval(() => {
        this.element.innerText = this.element.innerText.slice(0, -1);
        i--;
        if (i === 0) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
    return this;
  }
  async start() {
    let cb = this.#buffer.shift();
    while (cb) {
      if (this.loop) this.#buffer.push(cb);
      await cb();
      cb = this.#buffer.shift();
    }
  }
}
