'use client';

import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, Box, CardActionArea, TextField } from '@mui/material';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

import { Pessoa } from '@/modules/firebase/models/Pessoa';
import { Registro } from '@/modules/firebase/models/Registro';
import { Item } from '../comportamentos';
import { FormularioRegistro } from '../FormularioRegistro';

interface ObservacoesTreeProps {
  onGravarRegistro: (registro: Registro) => Promise<void>;
  pessoa: Pessoa;
  data: Item[];
}

const ObservacoesTree: React.FC<ObservacoesTreeProps> = ({ data, pessoa, onGravarRegistro }) => {
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

  const handleGravarRegistro = async (registro: Registro) => {
    await onGravarRegistro(registro);
    setSelectedItem(null);
  }

  const renderItems = (items: Item[] | undefined) => {
    return items?.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} xl={3} key={index}>
        <Card style={{ height: '100%' }}>
          <CardActionArea onClick={() => handleItemClick(item)}>
            <CardContent sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
              {item.icon && <Image src={item.icon} width={48} height={48} alt={item.label} style={{ aspectRatio: 1 }} />}
              <Box>
                <Typography variant="h6" color='black'>{item.label}</Typography>
                {item.descricao && <Typography color='gray'>{item.descricao}</Typography>}
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ));
  };

  const items = selectedItem ? selectedItem.itens : data;
  const hasItens = items && items.length > 0;
  const showForm = selectedItem && !selectedItem.itens;

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h5" color='primary'>
          {selectedItem ? selectedItem.label : 'Selecione um item'}
        </Typography>
        <Button variant="contained" onClick={handleGoBack} disabled={navigationStack.length === 0}>
          <Typography>Voltar</Typography>
        </Button>
      </Grid>
      {hasItens &&
        <Grid container spacing={2} sx={{ mt: 0 }}>
          {renderItems(items)}
        </Grid>
      }
      {showForm &&
        <FormularioRegistro stack={navigationStack} pessoa={pessoa} onGravarRegistro={handleGravarRegistro} action="novo" />
      }
    </>
  );
};

export default ObservacoesTree;
