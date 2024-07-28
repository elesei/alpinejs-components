export function initCss(shadowDom) {
    try {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = CSS_PUBLIC_PATH;
        shadowDom.appendChild(link);
    } catch (e) {
    }
}
