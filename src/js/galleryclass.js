import Image from './imageclass.js';

export default class Gallery {
  constructor() {
    this.galleryForm = 0;
    this.link = 0;
    this.preview = null;
    this.dropDiv = null;
  }

  galleryCreate() {
    this.galleryForm = document.createElement('form');
    this.link = document.createElement('input');
    this.link.setAttribute('type', 'file');
    document.body.appendChild(this.galleryForm);

    this.galleryForm.classList.add('galleryForm');
    this.link.classList.add('input');
    this.dropDiv = document.createElement('div');
    this.galleryForm.appendChild(this.dropDiv);
    this.dropDiv.classList.add('dropDiv');
    this.dropDiv.innerHTML = 'Drag and Drop files here or Click to select';
    this.galleryForm.appendChild(this.link);
    this.dispatchListener();
    this.inputListener();
    this.dropListener();
  }

  dispatchListener() {
    this.dropDiv.addEventListener('click', (event) => {
      event.preventDefault();
      try {
        this.removeMesage(this.dropDiv);
      } catch (e) {}
      const clickEvent = new MouseEvent('click');
	    this.link.dispatchEvent(clickEvent);
    });
  }

  dropListener() {
    this.dropDiv.addEventListener('dragover', () => {
      event.preventDefault();
      try {
        this.removeMesage(this.dropDiv);
      } catch (e) {}
    });

    this.dropDiv.addEventListener('drop', (event) => {
      event.preventDefault();
      const files = Array.from(event.dataTransfer.files);
      this.file = files[0];
      this.startLoad();
    });
  }

  inputListener() {
    this.link.addEventListener('change', (evt) => {
      const files = Array.from(evt.currentTarget.files);
      this.file = files[0];
      this.startLoad();
    });
  }

  startLoad() {
    const img = new Image('', this.file, this.galleryForm);
    img.addImg();
  }

  static insertMesage(div, mes) {
    const mesage = document.createElement('p');
    mesage.innerHTML = mes;
    mesage.setAttribute('id', 'mesage');
    div.appendChild(mesage);
  }

  removeMesage(parent) {
    const mes = document.querySelector('#mesage');
    if (mes != null) {
      parent.removeChild(mes);
    }
  }
}
