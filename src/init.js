const templateFetchPromises = Object.create(null);
const templateCache = Object.create(null);

export async function init(Alpine, urlName, shadowDom, templateName = urlName) {
    let htmlTemplate = templateCache[urlName];

    if (!htmlTemplate) {
        if (!templateFetchPromises[urlName]) {
            templateFetchPromises[urlName] = fetch(urlName)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch template "${templateName}" from "${urlName}" (${response.status} ${response.statusText})`);
                    }

                    return response.text();
                })
                .then(text => {
                    htmlTemplate = text.trim();
                    templateCache[urlName] = htmlTemplate;
                    delete templateFetchPromises[urlName];
                    return htmlTemplate;
                })
                .catch(err => {
                    delete templateFetchPromises[urlName];
                    throw err;
                });
        }

        htmlTemplate = await templateFetchPromises[urlName];
    }

    if (!htmlTemplate) {
        throw new Error(`Failed to load template: ${templateName}`);
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

    if (!newComponent) {
        throw new Error(`Template "${templateName}" did not produce a root element`);
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
