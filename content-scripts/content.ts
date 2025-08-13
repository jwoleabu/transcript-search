import { CssInjector } from "./injector";
import { TranscriptParser } from "./parser"
console.log("Main executed")
const injector = new CssInjector()
const parser = new TranscriptParser(injector)
parser.initiate();

function logTab(){
    console.log(`changed video to ${location.search}`)
    parser.reset()
    parser.startObserving()
}

document.addEventListener('yt-navigate-start', logTab)