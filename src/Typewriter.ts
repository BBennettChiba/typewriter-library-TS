export default class Typewriter {
  element: HTMLElement;
  loop: boolean;
  typingSpeed: number;
  eraseSpeed: number;

  constructor(element: HTMLElement, { loop = true, typingSpeed = 100, eraseSpeed = 100 }) {
    this.element = element;
    this.loop = loop;
    this.typingSpeed = typingSpeed;
    this.eraseSpeed = eraseSpeed;
  }
  typeString(string: string) {
  }
  pauseFor(ms: number) {}
  eraseString(charCount: number) {}
  start() {}
}
