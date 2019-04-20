import Gallery from './galleryclass.js';

export default class Image {
  constructor(name, file, div) {
    this.div = div;
    this.name = name;
    this.file = file;
    this.imageCont = 0;
    this.imageName = 0;
    this.imageDel = 0;
  }

  addImg() {
    const img = document.createElement('img');
    img.setAttribute('src', URL.createObjectURL(this.file));
    this.imageCont = document.createElement('div');
    this.imageCont.appendChild(img);
    document.body.appendChild(this.imageCont);
    this.imageName = document.createElement('div');
    this.imageName.innerHTML = this.name;
    this.imageName.classList.add('name');
    this.imageCont.appendChild(this.imageName);
    this.imageCont.classList.add('imageCont');
    this.imageDel = document.createElement('div');
    this.imageDel.innerHTML = '<p>x</p>';
    this.imageCont.appendChild(this.imageDel);
    this.imageDel.classList.add('del');
    img.addEventListener('error', () => {
      document.body.removeChild(this.imageCont);
      Gallery.insertMesage(this.div.querySelector('.dropDiv'), 'Неверный URL изображения');
    });
    this.addListener();
    this.imageDel.style.cursor = 'pointer';
  }

  addListener() {
    this.imageDel.addEventListener('click', () => this.del());
  }

  del() {
    this.imageCont.setAttribute('data-id', 'del');
    const del = document.querySelector('[data-id = del]');
    document.body.removeChild(del);
    URL.revokeObjectURL(this.file);
  }
}
