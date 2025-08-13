import type { CssInjector } from "./injector";

export class TranscriptParser {
  selectors: string[];
  observer: MutationObserver | null;
  buttonFound: boolean;
  observerCreated: boolean;
  userCallback: any;
  injector: CssInjector;
  constructor(injector: CssInjector) {
    this.selectors = [
      '[aria-label*="transcript" i]',
      '[aria-label*="Show transcript" i]',
      "#transcript-button",
      'ytd-menu-service-item-renderer:has([aria-label*="transcript" i])',
    ];
    this.observer = null;
    this.buttonFound = false;
    this.observerCreated = false;
    this.injector = injector;
  }

  // Create observer only once, ever
  createObserver() {
    if (this.observerCreated) {
      return;
    }

    this.observer = new MutationObserver(() => {
      if (!this.injector.cssInjected && document.head) {
        this.injector.injectHidingCSS();
      }

      if (!this.buttonFound) {
        const btn = this.findTranscriptButton();
        if (btn) {
          this.buttonFound = true;
          console.log("Button found!");
          this.onButtonFound(btn);
        }
      }

      if (this.injector.cssInjected && this.buttonFound && this.observer){
        this.observer.disconnect()
      }
    });

    this.observerCreated = true;
  }

  onButtonFound(button: Element) {
    console.log(button);
    console.log("Ready to interact with transcript button");
    if (button instanceof HTMLElement) {
      button.click();
    }
  }

  startObserving() {
    const existingButton = this.findTranscriptButton();
    if (existingButton) {
      this.buttonFound = true;
      console.log("Button found immediately!");
      this.onButtonFound(existingButton);
      return;
    }

    if (this.buttonFound) {
      return;
    }

    if (!document.body) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
          this.startObserving();
        });
      } else {
        setTimeout(() => {
          this.startObserving();
        }, 100);
      }
      return;
    }

    this.createObserver();

    if (this.observer && !this.buttonFound) {
      this.observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  }

  findTranscriptButton() {
    for (const selector of this.selectors) {
      const el = document.querySelector(selector);
      if (el) return el;
    }
    return null;
  }

  initiate() {
    this.startObserving();
  }

  observeTranscriptButton(callback: any) {
    this.userCallback = callback;
    this.startObserving();
  }

  reset() {
    this.buttonFound = false;
  }
}
