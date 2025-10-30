import axios from "axios";

export const uploadToCloud = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'post_images');

        const response = await axios.post(
            process.env.CLOUDINARY_URL || '',
            formData
        );
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};