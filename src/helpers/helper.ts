import { formatDistanceToNow } from "date-fns";

export function getPostTypeDetails(type: any | undefined){
    let post_type = '';
    let badge_color = '';
    let text_color = '';

    switch (type) {
        case 'CLASSIC':
            post_type = 'Post';
            badge_color = 'bg-primary';
            text_color = 'text-secondary';
            break;
        case 'PROJECT': 
            post_type = 'Project';   
            badge_color = 'bg-secondary';
            text_color = 'text-primary';

            break;
    };

    return { 
        post_type,
        badge_color,
        text_color
    }
}

// update user api helper
export function insertDataFromBody(body: any,fieldsToIterate: string[], dataObj: Record<string, any>){
    for(const key of fieldsToIterate){
        if(body[key] !== undefined){
            dataObj[key] = body[key];
        }
    }
}

export function formatDate(date: string | number | Date){
    const parsedDate = new Date(date);
    return formatDistanceToNow(parsedDate, { addSuffix: true })
}