export class CssInjector {
    cssInjected: boolean


    constructor(){
        this.cssInjected = false;
    }

  injectHidingCSS() {
    if (this.cssInjected) return;
    const style = document.createElement("style");
    style.id = "transcript-hider-css";
    style.textContent = `
            /* Hide transcript panel */
            ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-transcript"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }
            
            /* Hide the entire engagement panel when transcript is active */
            ytd-watch-flexy[engagement-panel-visible] #secondary.ytd-watch-flexy {
                display: none !important;
            }
            
            /* Alternative: Hide any engagement panel */
            ytd-engagement-panel-section-list-renderer {
                display: none !important;
                visibility: hidden !important;
            }
            
            /* Hide transcript button highlight when active */
            #transcript-button.style-scope.ytd-menu-service-item-renderer[aria-pressed="true"] {
                background: transparent !important;
            }
            
            /* Prevent layout shifts */
            ytd-watch-flexy[engagement-panel-visible] {
                --ytd-watch-flexy-panel-max-width: 0px !important;
            }
        `;

    document.head.appendChild(style);
    this.cssInjected = true;
    console.log("✅ Transcript hiding CSS injected");
  }

  reset(){
    this.cssInjected = false
  }
}
