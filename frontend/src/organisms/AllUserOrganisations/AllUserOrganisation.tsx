import  { useEffect, useState } from 'react';
import allUserservice from '../../services/AllUserOrganisationApi';
import { Table } from 'rsuite';
import './AllUserOrganisation.style.scss'

const { Column, HeaderCell, Cell } = Table;

export default function AllUsers() {
    interface User {
        email_id: string,
        first_name: string,
        last_name: string,
        organisation: string,
        dob: Date,
        org_join_date: Date   
    }

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        allUserservice.allusers().then(res => setUsers(res));
    }, []);

    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <>
            <h1 className='all_user'>Users</h1>
            <Table className='tab' data={users} autoHeight>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>Email ID</HeaderCell>
                    <Cell dataKey="email_id" />
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>First Name</HeaderCell>
                    <Cell dataKey="first_name" />
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>Last Name</HeaderCell>
                    <Cell dataKey="last_name" />
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>DOB</HeaderCell>
                    <Cell>{rowData => formatDate(rowData.dob)}</Cell>
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>Joining Date</HeaderCell>
                    <Cell>{rowData => formatDate(rowData.org_join_date)}</Cell>
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>Organisation</HeaderCell>
                    <Cell dataKey="organisation" />
                </Column>
            </Table>
        </>
    );
}

