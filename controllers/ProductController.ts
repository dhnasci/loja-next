import { Product } from '../models/Product';

export class ProductController {
    async fetchProductById(id: string): Promise<Product> {
        const resp = await fetch(`/api/products/${id}`);
        if (!resp.ok) throw new Error('Produto não encontrado');
        return resp.json();
    }
}