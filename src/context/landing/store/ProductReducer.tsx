import { ProductRequest } from '../../../landing/store/interfaces/store.interfaces';

export interface ProductState {
    errorMessage: string;
    product: ProductRequest | null;
    price: string;
}

type ProductAction =
    | { type: 'startSaveProduct', payload: { product: ProductRequest } }
    | { type: 'saveProductPrice', payload: { price: string; } }
    | { type: 'addError', payload: { errorMessage: string; } }
    | { type: 'removeError' }

export const productReducer = (state: ProductState, action: ProductAction): ProductState => {
    switch (action.type) {
        case 'startSaveProduct':
            return {
                ...state,
                product: action.payload.product,
            };

        case 'saveProductPrice':
            return {
                ...state,
                price: action.payload.price,
            };

        case 'addError':
            return {
                ...state,
                product: null,
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
