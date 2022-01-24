import { galleryItems } from './gallery-items.js';
// Change code below this line
console.log(galleryItems)
const imgList = {
    galleryItems: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxModal: document.querySelector('.lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    lightboxOverlay:document.querySelector('.lightbox__overlay')
}

const galleryMarkup = createGalleryMarkup (galleryItems)

imgList.galleryItems.insertAdjacentHTML('beforeend', galleryMarkup)

imgList.galleryItems.addEventListener('click', onGallaryContainerClick);
imgList.lightboxModal.addEventListener('click', modalEvent);
imgList.lightboxOverlay.addEventListener('click',modalEvent)
window.addEventListener('keydown', modalEvent)


function createGalleryMarkup(gallery) {
    return gallery
        .map(({ preview, original,description}, idx) => {
            return `
            <a
                class="gallery__item"
                href="${original}"
            >
                <img
                class="gallery__image"
                src="${original} "
                data-source="${preview}"
                alt="${description}"
                data-index="${idx} "
                
                />
           </a>
        `;           

    })
        .join('');
}

var lightbox = new SimpleLightbox('.gallery a', {captionsData:'alt', captionDelay:250});
console.log(lightbox)


function onGallaryContainerClick(e) {
    e.preventDefault();
    const swatchGallery = e.target;
    if (!swatchGallery.classList.contains('gallery__item')) {
        return;
       }
    imgList.lightboxModal.classList.add('is-open');
    imgList.lightboxImage.src= swatchGallery.dataset.source;
    imgList.lightboxImage.dataset.index = swatchGallery.dataset.index
}

function modalEvent(e) {
    if (imgList.lightboxModal.classList.contains('is-open')) {
        if (e.target.nodeName === "BUTTON") {
            onCloseModal()
        }

        if (e.target.classList.contains('lightbox__image')) {
            onCloseModal()
        }
         if (e.target.classList.contains('lightbox__overlay')) {
            onCloseModal()
        }
    
        if (e.code === "Escape") {
            onCloseModal()
        }
        
    }
}
      
function onCloseModal() {
        imgList.lightboxModal.classList.remove('is-open');
        imgList.lightboxImage.src = "";
}

