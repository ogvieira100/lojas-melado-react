import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Container, CssBaseline, FormControl, FormHelperText, Grid, IconButton, Input, InputLabel, Paper, TextField, Theme, ThemeProvider, createTheme, makeStyles, styled } from "@mui/material"
import { useState } from "react";
import { Form } from "react-router-dom";




const NewCustomer = () => {

    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Aqui você pode enviar os dados do formulário para onde desejar
        console.log({ cpf, nome, email });
    };

    const theme = createTheme();
    return (<>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg"  >
                <Box
                    component='form'
                    sx={{
                        flexGrow: 1,
                        marginTop: 5
                    }}
                >
                    <Card>
                        <CardHeader
                            title="Incluir Cliente"
                            subheader="Módulo de inclusão de clientes que serão usuários do sistema."
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <TextField
                                        label="CPF"
                                        sx={{ width: '100%' }}
                                        value={cpf}
                                        onChange={(e) => setCpf(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        label="Nome"
                                        sx={{ width: '100%' }}
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        sx={{ width: '100%' }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        sx={{ width: '100%' }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button type="submit" variant="contained" color="primary">
                                Enviar
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    </>)
}

export default NewCustomer