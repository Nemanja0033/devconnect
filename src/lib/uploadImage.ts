import axios from "axios";

//this function provide image upload and store it in the cloud
export const uploadToCloud = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'post_images');

        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dssl3tt5e/image/upload',
            formData
        );
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};