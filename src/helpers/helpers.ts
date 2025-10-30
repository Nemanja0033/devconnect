import { formatDistanceToNow } from "date-fns";
import slugify from "slugify";

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

export function slugifyUsername(username: string) {
    return slugify(username, {
        lower: false,
        strict: true,
        locale: 'en',
    });
}

export function getRandomTextColor(char: string): string {
  const colors = [
    'text-red-500',
    'text-orange-500',
    'text-amber-500',
    'text-yellow-500',
    'text-lime-500',
    'text-green-500',
    'text-emerald-500',
    'text-teal-500',
    'text-cyan-500',
    'text-sky-500',
    'text-blue-500',
    'text-indigo-500',
    'text-violet-500',
    'text-purple-500',
    'text-fuchsia-500',
    'text-pink-500',
    'text-rose-500',
  ];

  const lowerChar = char.toLowerCase();

  if (!/[a-z]/.test(lowerChar)) return 'text-gray-500';

  const index = lowerChar.charCodeAt(0) - 97;

  const color = colors[index % colors.length];

  return color;
}
