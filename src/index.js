import {initCss} from './initCss'
import {initStyles} from './initStyles'
import {init} from './init'

const htmlTemplatePathPattern = /\.html(?:[?#].*)?$/i

function resolveTemplateUrl(templateValue = '') {
    const templateName = templateValue.trim()

    if (!templateName) {
        throw new Error('The "template" attribute is required for a-component')
    }

    return htmlTemplatePathPattern.test(templateName)
        ? templateName
        : `/components/${templateName}.html`
}

export default function (Alpine) {
    class ComponentWrapper extends HTMLElement {
        connectedCallback() {
            if (this._hasInit) {
                return
            }

            const shadowDom = this.attachShadow({mode: 'open'})

            Alpine.initTree(this)

            const {
                template: componentTemplate = {value: ''},
                styles: componentStyles = {value: ''}
            } = this.attributes

            const templateName = componentTemplate.value.trim()
            const urlName = resolveTemplateUrl(templateName)

            init(Alpine, urlName, shadowDom, templateName)
            initCss(shadowDom)
            initStyles(shadowDom, componentStyles.value)
            this._hasInit = true
        }
    }

    const {name: componentName} = window?.aComponent || {name: 'a-component'}

    if (window.customElements.get(componentName)) {
        return
    }
    document.customElements = document.customElements || {};

    customElements.define(componentName, ComponentWrapper)

    new ComponentWrapper()
}
