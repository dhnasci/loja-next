import { useEffect, useState } from "react";
import Link from "next/link";
import { Typography, Grid, Card, CardMedia, CardContent, CardActionArea, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product } from "../models/Product";
import { CartSummary } from "../components/CartSummary";
import {ProductCard} from "../components/ProductCard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [cartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then(setProducts)
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
                Loja de Produtos
            </Typography>

            <IconButton
                color="primary"
                sx={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}
                onClick={() => setCartOpen(true)}
            >
                <ShoppingCartIcon />
            </IconButton>

            {loading ? (
                <Typography align="center" sx={{ mt: 4 }}>
                    Carregando produtos...
                </Typography>
            ) : (
                <Grid container spacing={4}>
                    {products.map(
                            (product) =>  (
                                <ProductCard key={product.id} product={product} apiBaseUrl={API_BASE_URL} />
                            ))}
                </Grid>
            )}

            <CartSummary open={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
    );
}