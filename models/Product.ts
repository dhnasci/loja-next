export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    promotionalPrice?: number;
    image: string;
}