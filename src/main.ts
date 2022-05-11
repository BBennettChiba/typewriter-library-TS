import './style.css'
import Typewriter from './Typewriter';

const typewriter = new Typewriter(document.body, {loop: true});

typewriter.typeString('Hello World!')
.pauseFor(100)
.typeString("\n\nfunction")
.deleteAll(10)
.start()
