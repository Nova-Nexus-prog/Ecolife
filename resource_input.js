 

document.getElementById('type').addEventListener('change', function() {
    const additionalFields = document.getElementById('additional-fields');
    const specificInput = document.getElementById('specific-input');
    const fileInput = document.getElementById('file-input');
    const type = this.value;

    if (type === 'video') {
        additionalFields.style.display = 'block';
        specificInput.placeholder = 'Enter video link';
        specificInput.style.display = 'block';
        fileInput.style.display = 'none';
    } else if (type === 'book') {
        additionalFields.style.display = 'block';
        specificInput.placeholder = 'Upload book file';
        specificInput.style.display = 'none';
        fileInput.style.display = 'block';
    } else if (type === 'seminar') {
        additionalFields.style.display = 'block';
        specificInput.placeholder = 'Enter seminar link';
        specificInput.style.display = 'block';
        fileInput.style.display = 'none';
    } else if (type === 'article') {
        additionalFields.style.display = 'block';
        specificInput.placeholder = 'Upload article file';
        specificInput.style.display = 'none';
        fileInput.style.display = 'block';
    } else {
        additionalFields.style.display = 'none';
    }
});

 
