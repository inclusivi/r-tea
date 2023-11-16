import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';


// header style
const headerSX = {
    p: 2.5,
    '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

// ==============================|| CUSTOM - MAIN CARD ||============================== //

type MainCardProps = {
    border?: boolean;
    boxShadow?: boolean;
    children: React.ReactNode;
    content?: boolean;
    contentSX?: object;
    darkTitle?: boolean;
    elevation?: number;
    secondary?: React.ReactNode;
    shadow?: string;
    sx?: object;
    title?: string;
};


export function MainCard(

    {
        border = true,
        boxShadow,
        children,
        content = true,
        contentSX = {},
        darkTitle,
        elevation,
        secondary,
        shadow,
        sx = {},
        title,
        ...others
    }: MainCardProps) {

    const theme = useTheme();
    boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

    return (
        <Card
            {...others}
            sx={{
                border: border ? '1px solid' : 'none',
                borderRadius: 2,
                borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey[800],
                boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.shadows[1] : 'inherit',
                ':hover': {
                    boxShadow: boxShadow ? shadow || theme.shadows[1] : 'inherit'
                },
                '& pre': {
                    m: 0,
                    p: '16px !important',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '0.75rem'
                },
                ...sx
            }}
        >
            {/* card header and action */}
            {!darkTitle && title && (
                <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} action={secondary} />
            )}
            {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}

            {/* card content */}
            {content && <CardContent sx={contentSX}>{children}</CardContent>}
            {!content && children}
        </Card>
    );
}
