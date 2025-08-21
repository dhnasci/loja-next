import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';

export class CartController {
    private items: CartItem[] = [];

    getCartItems(): CartItem[] {
        return this.items;
    }

    addToCart(product: Product) {
        const index = this.items.findIndex(item => item.product.id === product.id);
        if (index > -1) {
            this.items[index].quantity += 1;
        } else {
            this.items.push({ product, quantity: 1 });
        }
    }

    removeFromCart(productId: string) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    getSubtotal(): number {
        return this.items.reduce((acc, item) =>
            acc + ((item.product.promotionalPrice ?? item.product.price) * item.quantity), 0
        );
    }
}