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
    category: string;
    brand: string;
    color: string;
    price: string | null;
    sizes: Size[];
    img?:   string;
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
