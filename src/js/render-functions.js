import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more");

const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    navText: ["<<",">>"], 
});


export function showLoader() {
    loader.classList.remove("hidden");
}

export function hideLoader() {
    loader.classList.add("hidden");
}

export function clearGallery() {
    gallery.innerHTML = "";
}

export function showLoadMoreButton() {
    loadMoreBtn.classList.remove("hidden");
}

export function hideLoadMoreButton() {
    loadMoreBtn.classList.add("hidden");
}

function scrollPage() {
    const { height } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: "smooth" });
}

export function renderGallery(images) {
    if (images.length === 0) {
        iziToast.show({
            message: `Sorry, there are no images matching <br/> your search query. Please try again!`,            
            messageColor: "#fafafb",
            messageSize: "16px",
            messageLineHeight: "20px",

            backgroundColor: "#ef4040",
            iconUrl: warningIcon,

            progressBar: false,
            position: "topRight",
            
            });
        return;
    }

    const markup = images
        .map((image) => `
        <li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${image.webformatURL}" 
                    alt="${image.tags}" 
                    // width="360" 
                    // height="200" 
                />
            </a>
            <div class="image-info-wrapper">
                <div class="image-info-container">
                    <span class="image-info-container-type">Likes</span>
                    <span class="image-info-container-value">${image.likes}</span>                
                </div>

                <div class="image-info-container">
                    <span class="image-info-container-type">Views</span>
                    <span class="image-info-container-value">${image.views}</span>                
                </div>

                <div class="image-info-container">
                    <span class="image-info-container-type">Comments</span>
                    <span class="image-info-container-value">${image.comments}</span>                
                </div>

                <div class="image-info-container">
                    <span class="image-info-container-type">Downloads</span>
                    <span class="image-info-container-value">${image.downloads}</span>                
                </div>
            </div>
        </li>
    `
        )
        .join("");

    gallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
    scrollPage();
}