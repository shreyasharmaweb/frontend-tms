import { useEffect, useState } from 'react';
import allUserservice from '../../services/AllUserOrganisationApi';
import { Table } from 'rsuite';
import './AllUserOrganisation.style.scss'
import { Cookies } from 'react-cookie';
const { Column, HeaderCell, Cell } = Table;
const cookies = new Cookies();
const token=cookies.get("token");
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
    const totalColumns = 6; 
    const totalWidth = 1500; 

    const columnWidth = totalWidth / (totalColumns );

    return (

        <>
            <h1 className='all_user'>Users</h1>
            <div className='tableuser'>
                <Table  className='tab' width={totalWidth} data={users} autoHeight>
                    <Column width={300} align="center">
                        <HeaderCell className='tablehead'>Email ID</HeaderCell>
                        <Cell dataKey="email_id" />
                    </Column>
                    <Column width={columnWidth} align="center">
                        <HeaderCell className='tablehead'>First Name</HeaderCell>
                        <Cell dataKey="first_name" />
                    </Column>
                    <Column width={columnWidth} align="center">
                        <HeaderCell className='tablehead'>Last Name</HeaderCell>
                        <Cell dataKey="last_name" />
                    </Column>
                    <Column width={columnWidth} align="center">
                        <HeaderCell className='tablehead'>DOB</HeaderCell>
                        <Cell>{rowData => formatDate(rowData.dob)}</Cell>
                    </Column>
                    <Column width={columnWidth} align="center">
                        <HeaderCell className='tablehead'>Joining Date</HeaderCell>
                        <Cell>{rowData => formatDate(rowData.org_join_date)}</Cell>
                    </Column>
                    <Column width={310} align="center">
                        <HeaderCell width={310} className='tablehead'>Organisation</HeaderCell>
                        <Cell dataKey="organisation" />
                    </Column>
                </Table>
            </div>
        </>
    );
}

