export function useCloudinaryWidget(cloudName, uploadPreset, success) {
    return window.cloudinary.createUploadWidget({cloudName, uploadPreset},
        (error, result) => {
            if (!error && result && result.event === "success") {
                success(result.info)
            }
        }
    )
}