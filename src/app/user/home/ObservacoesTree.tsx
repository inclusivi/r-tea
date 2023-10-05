import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, Container } from '@mui/material';

interface Item {
  label: string;
  itens?: Item[];
}

interface ObservacoesTreeProps {
  data: Item[];
}

const ObservacoesTree: React.FC<ObservacoesTreeProps> = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [navigationStack, setNavigationStack] = useState<Item[]>([]);
  
  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setNavigationStack([...navigationStack, item]);
  };

  const handleGoBack = () => {
    const updatedStack = navigationStack.slice(0, -1);
    const previousItem = updatedStack[updatedStack.length - 1] || null;

    setSelectedItem(previousItem);
    setNavigationStack(updatedStack);
  };

  const renderItems = (items: Item[] | undefined) => {
    return items?.map((item, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card style={{ height: '100%', backgroundColor: '#000033' }}>
          <CardContent onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
            <Typography variant="h6" color={'white'}>{item.label}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <Card sx={{ p: 3, backgroundColor: '#f0f0f0' }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h5">
          {selectedItem ? selectedItem.label : 'Selecione um item'}
        </Typography>
        <Button variant="contained" onClick={handleGoBack} disabled={navigationStack.length === 0}>
          Voltar
        </Button>
      </Grid>
      <Grid container spacing={2} sx={{mt: 2}}>
        {selectedItem ? renderItems(selectedItem.itens) : renderItems(data)}
      </Grid>
    </Card>
  );
};

export default ObservacoesTree;
