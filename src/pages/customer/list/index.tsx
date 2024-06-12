import React from 'react';
import { UserSearchContext } from '../../../context/contextUser'
import { UserListRequest } from '../../../types/user';
import FiltersTable from '../filters/filtersTable'
import GridTable from '../grid/gridTable'


const ListCustomer = () => {

    const [customerSearch, setCustomerSearch] = React.useState<UserListRequest>({
        page: 1,
        limit: 10,
        active: undefined,
        column: '',
        desc: false,
        nome: ''
    });

    return (<>
        <UserSearchContext.Provider
            value={{ userListRequest: { userListRequest: customerSearch, setUserListRequest: setCustomerSearch } }}>
            <FiltersTable></FiltersTable>
            <GridTable></GridTable>
        </UserSearchContext.Provider>
    </>)
}

export default ListCustomer