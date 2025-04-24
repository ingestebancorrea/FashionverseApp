export interface StructureFolder {
    category_id: number;
    brand_id: number;
}

export interface UploadResponse {
    ubication: string;
    url: string;
}

export interface ProductsSearchParams {
    name: string;
    category_id?: number;
    brand_id?: number;
}
