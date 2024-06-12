import * as React from 'react';
import { ThemeProvider } from "@emotion/react";
import { Box, Container, CssBaseline, TextField, Typography, createTheme } from "@mui/material";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { UserListRequest } from '../../../types/user';
import { UserSearchContext } from '../../../context/contextUser';



const FiltersTable = () => {
    const defaultTheme = createTheme();
    const navigate = useNavigate();
    const filter =  React.useContext(UserSearchContext);
    
    const [customerSearch,setCustomerSearch] = React.useState<UserListRequest>({
        page:1,
        limit:10,
        active:undefined,
        column:'',
        desc:false,
        nome:''
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        filter.userListRequest.setUserListRequest({...customerSearch})
    }

    const handleNovoCustomer  = () => {
        navigate('/clientes/novo')
    }

    return (<>
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box
                    noValidate
                    autoComplete="off"
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Card sx={{ minWidth: '100%' }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14, paddingBottom: 1 }} color="text.secondary" gutterBottom>
                                Consulta de Clientes
                            </Typography>
                            <TextField
                                id="txtSearchCustomer"
                                label="Nome cliente"
                                value={customerSearch.nome}
                                onChange={(e)=> setCustomerSearch({...customerSearch,nome:e.target.value})}
                                sx={{ width: '100%' }}
                            />
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                            <Button size='small' onClick={handleNovoCustomer} >Novo</Button>
                            <Button type='submit' size="small">Buscar</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    </>)
}
export default FiltersTable;