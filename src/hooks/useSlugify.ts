import slugify from "slugify";

export function useSlugify(slug: string){
    const transformedSlug = slugify(slug, {
        lower: false,
        strict: true,
        locale: 'en'
    });

    return {
        transformedSlug
    }
}