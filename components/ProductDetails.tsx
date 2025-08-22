import React, { useState } from 'react';
import { Typography, Button, Card, CardContent, CardMedia, Box } from '@mui/material';
import { Product } from '../models/Product';
import { useCart } from '../context/CartContext';

type ProductDetailsProps = { product: Product };

export function ProductDetails({ product }: ProductDetailsProps) {
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        setLoading(true);
        await addToCart(product);
        setLoading(false);
    };

    const hasPromo =
        product.promotionalPrice !== undefined &&
        product.promotionalPrice !== null &&
        product.promotionalPrice < product.preco;

    return (
        <Card sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
            <CardMedia
                component="img"
                height="300"
                image={product.foto}
                alt={product.nome}
            />
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {product.nome}
                </Typography>

                <Typography variant="body2" gutterBottom>
                    {product.descricao}
                </Typography>

                <Box mt={2} mb={2}>
                    {hasPromo ? (
                        <>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ textDecoration: 'line-through' }}
                            >
                                R$ {product.preco.toFixed(2)}
                            </Typography>
                            <Typography
                                variant="h5"
                                color="error"
                                fontWeight="bold"
                            >
                                R$ {product.promotionalPrice!.toFixed(2)}
                            </Typography>
                        </>
                    ) : (
                        <Typography
                            variant="h5"
                            color="primary"
                            fontWeight="bold"
                        >
                            R$ {product.preco.toFixed(2)}
                        </Typography>
                    )}
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                    disabled={loading}
                    fullWidth
                >
                    {loading ? 'Adicionando...' : 'Adicionar ao carrinho'}
                </Button>
            </CardContent>
        </Card>
    );
}