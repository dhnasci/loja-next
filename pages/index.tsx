import { useEffect, useState } from "react";
import Link from "next/link";
import { Typography, Grid, Card, CardMedia, CardContent, CardActionArea, IconButton, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product } from "../models/Product";
import { CartSummary } from "../components/CartSummary";
import { ProductController } from "../controllers/ProductController";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [cartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        // Exemplo de busca de produtos; troque por sua chamada de listagem real!
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
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card>
                                <Link href={`/product/${product.id}`} legacyBehavior passHref>
                                    <CardActionArea component="a">
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={product.foto}
                                            alt={product.nome}
                                        />
                                        <CardContent>
                                            <Typography variant="h6">{product.nome}</Typography>
                                            {/* Mostra preço promocional se houver */}
                                            {product.promotionalPrice && product.promotionalPrice < product.preco ? (
                                                <>
                                                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                                                        R$ {product.preco.toFixed(2)}
                                                    </Typography>
                                                    <Typography variant="body1" color="error">
                                                        R$ {product.promotionalPrice.toFixed(2)}
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Typography variant="body1">
                                                    R$ {product.preco.toFixed(2)}
                                                </Typography>
                                            )}
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <CartSummary open={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
    );
}