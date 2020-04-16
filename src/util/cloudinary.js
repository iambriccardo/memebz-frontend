import request from 'superagent';

export function uploadPhoto(file, success) {
    const url = `https://api.cloudinary.com/v1_1/${
        process.env.REACT_APP_CLOUD_NAME
    }/upload`;

    const title = file.name;

    request.post(url)
        .field('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
        .field('file', file)
        .field('multiple', true)
        .field('context', title ? `photo=${title}` : '')
        .end((error, response) => {
            if (!error) {
                success(response.body)
            }
        });
}