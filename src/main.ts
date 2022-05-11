import "./style.css";
import Typewriter from "./Typewriter";

const typewriter = new Typewriter(document.body, { loop: true, typingSpeed: 10, eraseSpeed: 10 });

typewriter
  .typeString("Hello World!")
  .pauseFor(100)
  .typeString("\n\nfunction")
  .deleteChars(5)
  .typeString("butts")
  .deleteAll()
  .typeString("something fun")
  .start();
