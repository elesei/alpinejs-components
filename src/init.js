const templateFetchPromises = {};

export async function init(Alpine, urlName, shadowDom, template) {
    let htmlTemplate = '';

    if (!templateFetchPromises[template]) {
        if (!document.customElements[template]) {
            templateFetchPromises[template] = fetch(urlName)
                .then(response => response.text())
                .then(text => {
                    htmlTemplate = text.trim();
                    document.customElements[template] = htmlTemplate;
                    delete templateFetchPromises[template];
                    return htmlTemplate;
                })
                .catch(err => {
                    delete templateFetchPromises[template];
                    throw err;
                });
        } else {
            htmlTemplate = document.customElements[template];
        }
    }

    htmlTemplate = await templateFetchPromises[template] || document.customElements[template];

    if (!htmlTemplate) {
        throw new Error(`Failed to load template: ${template}`);
    }

    let newComponent = new DOMParser().parseFromString(
        htmlTemplate,
        'text/html'
    );

    if (htmlTemplate.startsWith('<template')) {
        newComponent = newComponent.head.firstChild;
    } else {

        if (htmlTemplate.startsWith('<script')) {
            const scriptElement = document.createElement('script');
            scriptElement.textContent = newComponent.head.firstChild.textContent;
            shadowDom.appendChild(scriptElement);
            if (newComponent.head.children[1] !== undefined) {
                if (newComponent.head.children[1].nodeName === 'STYLE') {
                    const styleElement = document.createElement('style');
                    styleElement.textContent = newComponent.head.children[1].textContent;
                    shadowDom.appendChild(styleElement);
                    newComponent = newComponent.body.firstChild;
                } else {
                    newComponent = newComponent.head.children[1];
                }
            } else {
                newComponent = newComponent.body.firstChild;
            }
        } else {
            newComponent = newComponent.body.firstChild;
        }
    }

    const aComponents = Array.from(newComponent.querySelectorAll('a-component')).map(component => {
        return {
            element: component,
            parent: component.parentNode,
            nextSibling: component.nextSibling
        };
    });

    aComponents.forEach(({element}) => element.remove());
    shadowDom.appendChild(newComponent);
    Alpine.initTree(shadowDom);

    aComponents.forEach(({element, parent, nextSibling}) => {
        parent.insertBefore(element, nextSibling);
    });
}
