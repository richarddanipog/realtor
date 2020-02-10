

export const inputImages = (files) => {
    if (Array.isArray(files) || typeof files === 'string') {
        if (files.length === 1) {
            document.getElementById('main-img').src = `http://localhost:3001/${files[0]}`;
        } else
            for (let i = 0; i < files.length; i++) {
                document.getElementById(`img-${i}`).src = `http://localhost:3001/${files[i]}`;
            }
    } else {
        if (files.length === 1) {
            const img = document.getElementById('main-img')
            img.src = URL.createObjectURL(files[0]);
        }
        if (files.length > 1) {
            for (let i = 0; i < files.length; i++) {
                document.getElementById(`img-${i}`).src = URL.createObjectURL(files[i]);
            }
        }
    }

} 
