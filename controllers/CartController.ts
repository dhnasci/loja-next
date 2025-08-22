import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class CartController {
    private items: CartItem[] = [];

    async getCartItems(): Promise<CartItem[]> {
        const response = await fetch(`${API_BASE_URL}/api/cart`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Erro ao buscar itens do carrinho');
        return await response.json();
    }

    // Adiciona um item ao carrinho
    async addToCart(product: Product): Promise<CartItem[]> {
        const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: product.id })
        });
        if (!response.ok) throw new Error('Erro ao adicionar produto ao carrinho');
        // Pode retornar o carrinho atualizado:
        return await response.json();
    }

    removeFromCart(productId: string) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    // (Opcional): Calcular subtotal a partir do array de CartItem recebido
    static computeSubtotal(items: CartItem[]): number {
        return items.reduce(
            (acc, item) =>
                acc +
                ((item.product.promotionalPrice ?? item.product.preco) * item.quantity),
            0
        );
    }
}