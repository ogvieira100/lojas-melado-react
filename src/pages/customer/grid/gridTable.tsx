
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Container, CssBaseline, Pagination, ThemeProvider, createTheme } from '@mui/material';
import { useAuth } from '../../../hooks/auth';
import { ApiResponse, PagedDataResponse } from '../../../types/global';
import { UserList, UserListRequest, UserListResponse } from '../../../types/user';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { Link } from 'react-router-dom';
import { UserSearchContext } from '../../../context/contextUser';




const defaultTheme = createTheme();
const GridTable = () => {

    const { listsUsersAsync } = useAuth()
    const [rows, setRows] = React.useState<ApiResponse<PagedDataResponse<UserListResponse>> | null>(null);
    const filter =  React.useContext(UserSearchContext);

    React.useEffect(() =>{

        const listFirstUsers  = async () => {
            const fUsers =  await   listsUsersAsync(filter.userListRequest.userListRequest)
            setRows({...fUsers})  
         }   
         listFirstUsers();

    },[filter.userListRequest.userListRequest])




    const handleDelete = (userListResponse:UserListResponse) => {
            console.log(userListResponse)
    }

   const  handleEdit = (userListResponse:UserListResponse) => {
    console.log(userListResponse)
}

    const handlePageChange = async  (event: React.ChangeEvent<unknown>, page: number) => {
        filter.userListRequest.setUserListRequest({...filter.userListRequest.userListRequest,page:page})
    }


    return (<>
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <TableContainer component={Container}>
                        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell >Email</TableCell>
                                    <TableCell >CPF</TableCell>
                                    <TableCell >Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows?.data.items.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.nome}
                                        </TableCell>
                                        <TableCell >{row.email}</TableCell>
                                        <TableCell >{row.cpf}</TableCell>
                                        <TableCell>
                                            <DeleteForeverRoundedIcon
                                             onClick={()=> handleDelete(row)} /> 
                                             <EditNoteRoundedIcon onClick={()=> handleEdit(row)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination onChange={handlePageChange} page={rows?.data.page ?? 1} sx={{margin:5}} count={rows?.data.totalPages ?? 0} color="primary" />
                </Box>
            </Container>
        </ThemeProvider>
    </>)

}

export default GridTable;