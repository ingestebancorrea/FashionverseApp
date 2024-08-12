import { Product, ProductRequest } from '../../../../landing/store/interfaces/store.interfaces';
import { Asset } from 'react-native-image-picker';
import { ProductsSearchParams, StructureFolder, UploadResponse } from '../../../interfaces/landing/store/products.context.interface';

export type ProductsContextProps = {
    products: Product[];
    loadProducts: (params: ProductsSearchParams) => Promise<void>;
    startSaveProduct: (product: ProductRequest) => void;
    addProduct: ( price: number ) => Promise<number>;
    updateProduct: ( categoryId: string, productName: string, productId: string ) => Promise<void>;
    loadProductById: ( id: string ) => Promise<Product>;
    uploadImage: ( data: Asset, detailProduct: StructureFolder ) => Promise<UploadResponse[] | undefined>;
    addError: (error:string) => void;
    removeError: () => void;
    errorMessage: string;
}
