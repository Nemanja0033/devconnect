export function getPostTypeDetails(type: any | undefined){
    let post_type = '';
    let badge_color = '';
    let text_color = '';

    switch (type) {
        case 'CLASSIC':
            post_type = 'Post';
            badge_color = 'bg-blue-300';
            text_color = 'text-blue-400';
            break;
        case 'PROJECT': 
            post_type = 'Project';   
            badge_color = 'bg-red-300';
            text_color = 'text-red-400';

            break;
    };

    return { 
        post_type,
        badge_color,
        text_color
    }
}

