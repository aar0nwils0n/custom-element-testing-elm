window.customElements.define('tiny-mce', class extends HTMLElement {
    emitChange(e) {
        const event = new CustomEvent('change', e);
        this.dispatchEvent(event)
    }

    constructor() {
        super();
        const div = document.createElement('textarea');
        div.id = 'editor'
        this.appendChild(div);

        tinymce.init({
            selector:'#editor',
            setup: (ed) => {
                ed.on('change', this.emitChange.bind(this))
            }
        });
    }    

    static get observedAttributes() {return ['value']; }
    


    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log('change',newVal)
        if(attrName === 'value' && tinymce.activeEditor) {
            tinymce.activeEditor.setContent(newVal);
        }
    }
});
