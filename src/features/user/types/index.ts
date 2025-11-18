import { PostType, User } from "@/types";

export interface EditHeadingForm {
    username?: string,
    title?: string
}

export interface EditAboutForm {
    bio?: string
}

export interface ProfilePostsProps {
    isMyProfile: boolean;
    posts: PostType[];
    user: User;
    isLoading: boolean;
}
