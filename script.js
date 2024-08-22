// const btnConfirm = document.getElementById('confirm')
// const product_modal_cancel = document.getElementById('product_modal_cancel')

// btnConfirm.addEventListener('click', function () {
//     const product_modal = document.getElementById('product_modal')
    
//     document.body.style.overflow = 'hidden'
//     product_modal.style.display = 'flex'
// })

// product_modal_cancel.addEventListener('click', function () {
//     const product_modal = document.getElementById('product_modal')
    
//     document.body.style.overflow = 'auto'
//     product_modal.style.display = 'none'
// })


let compressedFileListSave = [];

document.querySelector('input[type="file"]').addEventListener('change', onImages);

async function onImages(event) {
    const files = event.target.files;
    const uploadedFilesContainer = document.getElementById('comment_seller_images');

    if (files) {
        const compressedImages = await Promise.all(
            Array.from(files).map(async (file) => {
                const image = new Image();
                const render = new FileReader();

                render.readAsDataURL(file);

                return new Promise((resolve) => {
                    render.onload = (e) => {
                        if (e.target) {
                            image.src = e.target.result;

                            image.onload = () => {
                                const canvas = document.createElement('canvas');
                                const maxImageWidth = 800;
                                const aspectRatio = maxImageWidth / image.width;

                                canvas.width = maxImageWidth;
                                canvas.height = image.height * aspectRatio;

                                const ctx = canvas.getContext('2d');

                                ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);

                                canvas.toBlob((blob) => {
                                    if (blob) {
                                        const compressedFile = new File([blob], file.name, {
                                            type: file.type,
                                            lastModified: Date.now()
                                        });
                                        resolve(compressedFile);
                                    }
                                }, file.type, 0.8);
                            };
                        }
                    };
                });
            })
        );

        compressedFileListSave = [...compressedFileListSave, ...compressedImages];

        uploadedFilesContainer.innerHTML = '';

        compressedFileListSave.forEach((file, index) => {
            const fileElement = document.createElement('div');
            fileElement.style.position = 'relative';
            uploadedFilesContainer.appendChild(fileElement);

            const imgElement = document.createElement('img');
            imgElement.src = URL.createObjectURL(file);
            imgElement.style.maxWidth = '200px';
            fileElement.appendChild(imgElement);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'x';
            removeButton.style.position = 'absolute';
            removeButton.style.top = 0;
            removeButton.style.right = 0;
            fileElement.appendChild(removeButton);

            removeButton.addEventListener('click', () => {
                compressedFileListSave.splice(index, 1);

                renderImages();
            });
        });
    }
}

function renderImages() {
    const uploadedFilesContainer = document.getElementById('comment_seller_images');
    uploadedFilesContainer.innerHTML = '';

    compressedFileListSave.forEach((file, index) => {
        const fileElement = document.createElement('div');
        fileElement.style.position = 'relative';
        uploadedFilesContainer.appendChild(fileElement);

        const imgElement = document.createElement('img');
        imgElement.src = URL.createObjectURL(file);
        imgElement.style.maxWidth = '200px';
        fileElement.appendChild(imgElement);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.style.position = 'absolute';
        removeButton.style.top = 0;
        removeButton.style.right = 0;
        fileElement.appendChild(removeButton);

        removeButton.addEventListener('click', () => {
            compressedFileListSave.splice(index, 1);

            renderImages();
        });
    });
}

function onSave() {
    console.log(compressedFileListSave);
}