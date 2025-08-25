import { Drawer, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';

type CartSummaryProps = { open: boolean; onClose: () => void; };

export function CartSummary({ open, onClose }: CartSummaryProps) {
    const { cartItems, removeFromCart } = useCart();

    console.log('cartItems :: ',cartItems);
    // Crie um array contendo apenas ListItem (com ou sem itens).
    const listItems = cartItems.length === 0
        ? [
            <ListItem key="empty">
                <ListItemText
                    primary={
                    <Typography color="text.secondary" sx={
                        {textAlign: 'center',
                        width: '100%'}
                    }>
                    Seu carrinho está vazio
                    </Typography>
                    }
                />
            </ListItem>
        ]
        : cartItems.map(item => (
            <ListItem
                key={item.product.id}
                secondaryAction={
                          <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => removeFromCart(item.product)}
                          >
                              <DeleteIcon />
                          </IconButton>
                      }
            >
                <ListItemText
                    primary={item.product.nome}
                    secondary={`Qtd: ${item.quantity} – R$ ${(item.product.promotionalPrice ?? item.product.preco).toFixed(2)}`}
                />
            </ListItem>
        ));

    // // O subtotal sempre é exibido
    // listItems.push(
    //     <ListItem key="subtotal">
    //         <Typography variant="subtitle1" sx={{ ml: 'auto', fontWeight: 'bold' }}>
    //             Subtotal: R$ {subtotal.toFixed(2)}
    //         </Typography>
    //     </ListItem>
    // );

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Typography variant="h6" sx={{ p: 2 }}>Carrinho</Typography>
            <List sx={{ width: 320, maxWidth: '100%' }}>
                {listItems}
            </List>
        </Drawer>
    );
}