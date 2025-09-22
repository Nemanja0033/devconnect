
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