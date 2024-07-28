export function initCss(shadowDom) {
    if (CSS_PUBLIC_PATH !== undefined) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = CSS_PUBLIC_PATH;
        shadowDom.appendChild(link);
    }
}