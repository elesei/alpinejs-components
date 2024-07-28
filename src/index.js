import {initCss} from './initCss'
import {init} from './init'


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
            } = this.attributes

            const urlName = `/components/${componentTemplate.value}.html`;
            init(Alpine, urlName, shadowDom, componentTemplate.value);
            initCss(shadowDom)
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