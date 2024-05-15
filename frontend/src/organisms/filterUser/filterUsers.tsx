import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import allUserservice from '../../services/AllUserOrganisationApi';
import { Table } from 'rsuite';
import './FilterUser.style.scss'

export default function UserOrg() {
  const { id } = useParams();
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    allUserservice.allusers()
      .then(res => {
        const users = res.filter((user: { organisation: string}) => user.organisation === id);
        setFilteredUsers(users);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [id]); 

  return (
    <div>
      <h1 className='usrh'>Users for Organization: {id?.toUpperCase()}</h1>
      <div className='usermain'>

        <Table data={filteredUsers} autoHeight bordered cellBordered>
          <Table.Column width={200}>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.Cell dataKey='first_name' ></Table.Cell> 
          </Table.Column>
          <Table.Column width={200}>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.Cell dataKey='last_name' ></Table.Cell> 
          </Table.Column>
          <Table.Column width={200}>
            <Table.HeaderCell>DOB</Table.HeaderCell>
            <Table.Cell dataKey='dob' >{rowData => new Date(rowData.dob).toLocaleString().split(",")[0]}</Table.Cell> 
          </Table.Column>
          <Table.Column width={200}>
            <Table.HeaderCell>Joining Date</Table.HeaderCell>
            <Table.Cell dataKey='org_join_date' >{rowData => new Date(rowData.org_join_date).toLocaleString().split(",")[0]}</Table.Cell> 
          </Table.Column>
        </Table>
      </div>
    </div>
  );
}
