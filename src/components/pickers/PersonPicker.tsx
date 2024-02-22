'use client';

import { Avatar, Box, Card, CardActionArea, CardContent, Menu, MenuItem, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Pessoa } from "@/modules/firebase/models/Pessoa";
import { UserKind } from "@/modules/firebase/models/UserKind"; 
import React from "react";

type PersonPickerProps = {
    label: string,
    pessoas: Pessoa[],
    selectedPerson: Pessoa,
    onChange: (pessoa: Pessoa) => void,
    userKind: UserKind
}

export default function PersonPicker({ label, pessoas, selectedPerson, userKind, onChange }: PersonPickerProps) {
    
    const [personMenuAnchor, setPersonMenuAnchor] = React.useState<null | HTMLElement>(null);

    const personMenuOpen = Boolean(personMenuAnchor);
    const selectedPersonId = selectedPerson?.id;
    
    const handlePersonChange = (pessoa: Pessoa) => {
        setPersonMenuAnchor(null);
        onChange(pessoa);
    }

    if  (userKind === UserKind.PessoaAutista || userKind === UserKind.PessoaSemDiagnostico) {
    return (<></>)
    }

    return (
        <>
            <Box display='flex' justifyContent='flex-end'>
                <Box>
                    <Typography variant="h6" color='gray'>{label}</Typography>
                    <Card>
                        <CardActionArea onClick={(e) => setPersonMenuAnchor(e.currentTarget)}>
                            <CardContent>
                                <Box display='flex' flexDirection='row' alignItems='center' gap={2}>
                                    {selectedPerson && (
                                        <>
                                            <Avatar alt={selectedPerson.nome} src={selectedPerson.photoUrl} />
                                            <Typography>{selectedPerson.nome} {selectedPerson.sobreNome}</Typography>
                                            <ArrowDropDownIcon color="action" />
                                        </>
                                    )}
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            </Box>

            <Menu open={personMenuOpen} anchorEl={personMenuAnchor} onClose={() => setPersonMenuAnchor(null)}>
                {pessoas.map(p => (
                    <MenuItem key={p.id} onClick={(e) => handlePersonChange(p)} selected={p.id === selectedPersonId}>
                        <Box display='flex' flexDirection='row' alignItems='center' gap={2}>
                            <Avatar alt={p.nome} src={p.photoUrl} />
                            <Typography>{p.nome} {p.sobreNome}</Typography>
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}