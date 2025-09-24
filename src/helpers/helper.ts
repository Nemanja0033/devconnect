import { Images } from "@/types";

export function getPostTypeDetails(type: any | undefined){
    let post_type = '';
    let badge_color = '';

    switch (type) {
        case 'CLASSIC':
            post_type = 'Post';
            badge_color = 'bg-blue-300';
            break;
        case 'PROJECT': 
            post_type = 'Project';   
            badge_color = 'bg-red-300';
            break;
    };

    return { 
        post_type,
        badge_color
    }
}

export function mapImagesToObject(imagesUrls: string[]){
    if(!imagesUrls) return [];

    const imagesObject = imagesUrls.map((url) => ({ url }));
    return imagesObject;
}

export function mapImagesObjectToRawArray(imagesUrls: Images[]) : string[]{
    if(!imagesUrls) return [];
    
    return imagesUrls.map((img) => img.url);
}