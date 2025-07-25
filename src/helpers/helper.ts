import { PostType } from "@prisma/client";

export function getPostTypeDetails(type: PostType | undefined){
    let post_type = '';
    let badge_color = '';

    switch (type) {
        case 'CLASSIC':
            post_type = 'Post';
            badge_color = 'bg-green-300';
            break;
        case 'PROJECT': 
            post_type = 'Project';   
            badge_color = 'bg-yellow-300';
            break;
    };

    return { 
        post_type,
        badge_color
    }
}