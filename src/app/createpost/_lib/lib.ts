import { Images } from "@/types";

export function mapImagesToObject(imagesUrls: string[]){
    if(!imagesUrls) return [];

    const imagesObject = imagesUrls.map((url) => ({ url }));
    return imagesObject;
}

export function mapImagesObjectToRawArray(imagesUrls: Images[]) : string[]{
    if(!imagesUrls) return [];
    
    return imagesUrls.map((img) => img.url);
}