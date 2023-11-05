export default class Modal {
    constructor(btnOpen, btnClose, container) {
        this.btnOpen = btnOpen;
        this.btnClose = btnClose;
        this.container = container;
        this.toggleModal = this.toggleModal.bind(this);
        this.cliqueForaModal = this.cliqueForaModal.bind(this);
        this.createModal = this.createModal.bind(this);
    }
    toggleModal(event) {
        event.preventDefault();
        this.container.classList.toggle('active');
    }
    cliqueForaModal(event) {
        if (event.target === this) {
            toggleModal(event);
        }
    }
    createModal() {
        if (this.btnOpen) {
            this.btnOpen.addEventListener('click', this.toggleModal);
        }
        if (this.btnClose && this.container) {
            this.btnClose.addEventListener('click', this.toggleModal);
            this.container.addEventListener('click', this.cliqueForaModal);
        }
    }
}
