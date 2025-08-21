import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Product } from '../../models/Product';
import { ProductController } from '../../controllers/ProductController';
import { ProductDetails } from '../../components/ProductDetails';
import { CartSummary } from '../../components/CartSummary';
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [cartOpen, setCartOpen] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const controller = new ProductController();
            controller.fetchProductById(String(id)).then(setProduct).finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div>Carregando...</div>;
    if (!product) return <div>Produto não encontrado</div>;

    return (
        <>
            <IconButton
                color="primary"
                sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}
                onClick={() => setCartOpen(true)}
            >
                <ShoppingCartIcon />
            </IconButton>
            <ProductDetails product={product} />
            <CartSummary open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}