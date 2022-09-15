const photosEl = document.querySelector('#photos')
const loading = document.getElementById('loading')

loading.style.display ='none'
// loading.style.display ='block'

const getPhotos = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10&page=1')

    const data = await res.json();

    return data;
}


const showPhotos = async () => {
    let photos = await getPhotos();

    console.log(photos);
    photos.forEach(photo => {
        let photoEl = document.createElement('div');

        photoEl.classList.add('card');
        photoEl.classList.add('m-3');
        photoEl.style.width = '18rem';

        photoEl.innerHTML = `
            <img src=${photo.thumbnailUrl} class="card-img-top" alt="...">
            <div class="card-body p-2">
                <p class="card-text">${photo.title.slice(0, 30)}</p>
            </div>
        `;

        photosEl.appendChild(photoEl);
    })
}

window.addEventListener('scroll', () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    console.log(scrollHeight, scrollTop, clientHeight);

    if( scrollTop + clientHeight >= scrollHeight - 5) {
        loading.style.display = 'block';
        setTimeout(() => {
            loading.style.display = 'none';

            setTimeout(() => {
                showPhotos();
            }, 200);

        }, 3000)
    } 
})

showPhotos();