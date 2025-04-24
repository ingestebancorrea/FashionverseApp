import { PostRequest } from '../../../landing/store/interfaces/store.interfaces';

export interface PostState {
    errorMessage: string;
    post: PostRequest | null;
}

type PostAction =
    | { type: 'startSavePost', payload: { post: PostRequest } }
    | { type: 'addError', payload: { errorMessage: string; } }
    | { type: 'removeError' }

export const postReducer = (state: PostState, action: PostAction): PostState => {
    switch (action.type) {
        case 'startSavePost':
            return {
                ...state,
                post: action.payload.post,
            };

        case 'addError':
            return {
                ...state,
                post: null,
                errorMessage: action.payload.errorMessage,
            };

        case 'removeError':
            return {
                ...state,
                errorMessage: '',
            };

        default:
            break;
    }
};
