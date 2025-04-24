import React, { createContext, useReducer, useState } from 'react';
import { REACT_APP_PRODUCTS_SERVICE } from '@env';
import createApiInstance from '../../../api/apiInstance';
import { postReducer, PostState } from './PostReducer';
import { PostsContextProps } from '../../types/landing/store/postscontext.type';
import { Post, PostDetailsRequest, PostRequest, PostsResponse } from '../../../landing/store/interfaces/store.interfaces';
import { PostsSearchParams } from '../../interfaces/landing/store/postscontext.interface';
import { errorMessage } from '../../../api/axiosError';
import { AxiosResponse } from 'axios';
export const baseURL = REACT_APP_PRODUCTS_SERVICE;
const api = createApiInstance(baseURL);

const postInitialState: PostState = {
    post: null,
    errorMessage: '',
};

export const PostsContext = createContext({} as PostsContextProps);

export const PostsProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(postReducer, postInitialState);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading,setLoading] = useState<boolean>(true);

    const loadPosts = async ({ description }: PostsSearchParams) => {
        let url = '/posts?limit=100';

        if (description) {
            url += `&description=${encodeURIComponent(description)}`;
        }

        const resp = await api.get<PostsResponse>(url);
        setPosts(resp.data.data);
        setLoading(false);
    };

    const startSavePost = (post: PostRequest) => {
        dispatch({ type: 'startSavePost', payload: { post } });
    };

    const addPost = async (post: PostRequest): Promise<AxiosResponse<Post, any> | undefined> => {
        try {
            const resp = await api.post<Post>('/posts', {
                ...state.post,
                posttype_id: post.posttype_id,
            });

            return resp;
        } catch (error: any) {
            dispatch({ type: 'addError', payload: { errorMessage: errorMessage(error) } });
        }
    };

    const addPostDetails = async (postDetails: PostDetailsRequest): Promise<number | undefined> => {
        try {
            const resp = await api.post<Post>('/postdetails',{
                ...postDetails,
            });

            return resp.status;
        } catch (error: any) {
            dispatch({ type: 'addError', payload: { errorMessage: errorMessage(error) } });
        }
    };

    const updatePost = async (categoryId: string, productName: string, postId: number) => {
        const resp = await api.put<Post>(`/posts/${postId}`, {
            nombre: productName,
            categoria: categoryId,
        });
        setPosts(posts.map(post => {
            return (post.id === postId) ? resp.data : post;
        }));// Retorna un nuevo array con los value modificados
    };

    const loadPostById = async (id: string): Promise<Post> => {
        const resp = await api.get<Post>(`/productos/${id}`);
        return resp.data;
    };

    const addError = (error: string) => {
        dispatch({ type: 'addError', payload: { errorMessage: error } });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <PostsContext.Provider value={{
            posts,
            loadPosts,
            startSavePost,
            addPost,
            addPostDetails,
            updatePost,
            loadPostById,
            addError,
            removeError,
            errorMessage: state.errorMessage,
            loading,
        }}>
            {children}
        </PostsContext.Provider>
    );
};
