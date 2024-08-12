import React, { createContext, useReducer, useState } from 'react';
import { Asset } from 'react-native-image-picker';
import { REACT_APP_PRODUCTS_SERVICE } from '@env';
import { Product, ProductRequest, ProductsResponse } from '../../../landing/store/interfaces/store.interfaces';
import createApiInstance from '../../../api/apiInstance';
import { ProductsContextProps } from '../../types/landing/store/productscontext.type';
import { ProductsSearchParams, StructureFolder, UploadResponse } from '../../interfaces/landing/store/products.context.interface';
import { productReducer, ProductState } from './ProductReducer';
import { errorMessage } from '../../../api/axiosError';

export const baseURL = REACT_APP_PRODUCTS_SERVICE;
const api = createApiInstance(baseURL);

const productInitialState: ProductState = {
    product: null,
    price: '',
    errorMessage: '',
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(productReducer, productInitialState);
    const [products, setProducts] = useState<Product[]>([]);

    const loadProducts = async({ name }: ProductsSearchParams) => {
        let url = '/products?limit=100';

        if (name) {
            url += `&name=${encodeURIComponent(name)}`;
        }

        const resp = await api.get<ProductsResponse>(url);
        setProducts(resp.data.data);
    };

    const startSaveProduct = (product: ProductRequest) => {
        dispatch({ type: 'startSaveProduct', payload: { product } });
    };

    const addProduct = async (price: number): Promise<number> => {
        try {
            const resp = await api.post<Product>('/products', {
                ...state.product,
                price,
            });

            return resp.status;
        } catch (error:any) {
            console.error(error);
            return error;
        }
    };

    const updateProduct = async( categoryId: string, productName: string, productId: string ) => {
        const resp = await api.put<Product>(`/productos/${ productId }`,{
            nombre: productName,
            categoria: categoryId,
        });
        setProducts( products.map( prod => {
            return (prod.id === productId) ? resp.data : prod;
        }) );// Retorna un nuevo array con los value modificados
    };

    const loadProductById = async( id: string ): Promise<Product> => {
        const resp = await api.get<Product>(`/productos/${id}`);
        return resp.data;
    };

    const uploadImage = async (data: Asset, detailProduct: StructureFolder) => {
        const formData = new FormData();

        formData.append('files', {
            uri: data.uri,
            type: data.type || 'image/jpeg',
            name: data.fileName || 'image.jpg',
        });

        formData.append('category_id', detailProduct.category_id);
        formData.append('brand_id', detailProduct.brand_id);

        try {
            const response = await api.post<UploadResponse[]>(`${REACT_APP_PRODUCTS_SERVICE}/products/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload successful:', response.data);
            return response.data;
        } catch (error: any) {
            dispatch({ type: 'addError', payload: { errorMessage: errorMessage(error) } });
        }
    };

    const addError = (error: string) => {
        dispatch({ type: 'addError', payload: { errorMessage: error } });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            startSaveProduct,
            addProduct,
            updateProduct,
            loadProductById,
            uploadImage,
            addError,
            removeError,
            errorMessage: state.errorMessage,
        }}>
            { children }
        </ProductsContext.Provider>
    );
};
