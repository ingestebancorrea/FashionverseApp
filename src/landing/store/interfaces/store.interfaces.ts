export interface ProductRequest {
    name: string;
    category_id: number;
    brand_id: number;
    color: string;
    price: number | null;
    inventories: Inventory[];
    image_url: string;
}

export interface Inventory {
    size_id: number;
    available_quantity: number;
}

export interface ProductsResponse {
    data: Product[];
}

export interface Product {
    id:       number;
    name: string;
    category: { id: number; name: string; };
    brand: { id: number; name: string; };
    color: string;
    price: string | null;
    sizes: Size[];
    image_url?:   string;
}

export interface Size {
    name: string;
}

export interface RowData {
    id: string;
    size: {
        id: number;
        name: string;
    };
    available_quantity: number;
}

export interface Post {
    id: number;
    likes: number;
    type: string;
    products: Product[];
    comments: number;
}

export interface PostRequest {
    description?: string;
    posttype_id?: number;
}

export interface PostDetailsRequest {
    post_id: number;
    products: productId[];
}

type productId = Pick<Product, 'id'>;

export interface Post {
    id:       number;
    likes: number;
    type: string;
    products: Product[];
    comments: number;
}

export interface PostsResponse {
    data: Post[];
}
