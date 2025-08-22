import { Product } from '../models/Product';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class ProductController {
    /**
     * Consulta um produto pelo seu id
     * @param id
     */
    async fetchProductById(id: string): Promise<Product> {
        const resp = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (!resp.ok) throw new Error('Produto não encontrado');
        return resp.json();
    }

    /**
     * Lista todos os produtos
     */
    async listAllProducts(){
        const resp = await fetch(`${API_BASE_URL}/api/products`);
        if (!resp.ok) throw new Error('Produtos não cadastrados ainda');
        return resp.json();
    }
}