import { Product, ProductRequest } from '../../../../landing/store/interfaces/store.interfaces';
import { Asset } from 'react-native-image-picker';
import { ProductsSearchParams, StructureFolder, UploadResponse } from '../../../interfaces/landing/store/productscontext.interface';

export type ProductsContextProps = {
    products: Product[];
    loadProducts: (params: ProductsSearchParams) => Promise<void>;
    startSaveProduct: (product: ProductRequest) => void;
    addProduct: ( price: number ) => Promise<number | undefined>;
    updateProduct: ( categoryId: string, productName: string, productId: number ) => Promise<void>;
    loadProductById: ( id: number ) => Promise<Product>;
    uploadImage: ( data: Asset, detailProduct: StructureFolder ) => Promise<UploadResponse[] | undefined>;
    addError: (error:string) => void;
    removeError: () => void;
    errorMessage: string;
    loading: boolean;
}
