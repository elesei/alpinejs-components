export function initStyles(shadowDom, styles) {
    try {
        styles = styles.split(',');
        if (styles.length > 0){
            styles.forEach(style => {
                let link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = style.trim();
                shadowDom.appendChild(link);
            });
        }
    } catch (e) {
    }
}
