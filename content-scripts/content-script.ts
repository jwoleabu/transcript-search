(async() => {
    const src = browser.runtime.getURL('assets/content-main.js');
    await import(src);
})()