import { AxiosResponse } from 'axios';
import { Post, PostDetailsRequest, PostRequest } from '../../../../landing/store/interfaces/store.interfaces';
import { PostsSearchParams } from '../../../interfaces/landing/store/postscontext.interface';

export type PostsContextProps = {
    posts: Post[];
    loadPosts: (params:PostsSearchParams) => Promise<void>;
    startSavePost: ( post: PostRequest ) => void;
    addPost: ( post:PostRequest  ) => Promise<AxiosResponse<Post, any> | undefined>;
    addPostDetails: ( postDetails:PostDetailsRequest ) => Promise<number | undefined>;
    updatePost: ( categoryId: string, productName: string, postId: number ) => Promise<void>;
    loadPostById: ( id: string ) => Promise<Post>;
    addError: (error:string) => void;
    removeError: () => void;
    errorMessage: string;
    loading: boolean;
}
