// import  { useEffect, useState } from 'react'
// import allUserservice from '../../services/allUserSystem';
// import { Table } from 'rsuite';


// const {Column , HeaderCell ,Cell} = Table;
// export default function AllUsers() {
//     interface alluser{
        
//         email_id:string,
//         first_name:string,
//         last_name:string,
//         organisation:string,
//         dob:Date,
//         org_join_date:Date
        
//     }
//     //I-interface(Pascle)
//     const[users,Setusers]=useState<alluser[]>([]);
//     useEffect(()=>{
//       allUserservice.allusers().then(res => Setusers(res))
//       console.log(users)
//     },[users]);

//     // const formatDate = (dateString: string | number | Date) => {
//     //   return new Date(dateString).toLocaleDateString();
//     // };
    
//     const getData = () => {
//       return users;
//     };
    
//   return (
//     <div >
       
//         <h1 className='all_user'>Users</h1>
//        {/* {users.map((e:Users,i:number)=>{    
//         return (
//             <div> 
//                 <div className='AllUserss' key={i}>
//                 <h2>{e.email_id}</h2>
//                 <h2>{e.first_name}</h2>
//                 <h2>{e.last_name}</h2>
//                 <h2>{formatDate(e.dob)}</h2>
//                 <h2>{formatDate(e.org_join_date)}</h2>
//                 </div>
//             </div>
            
//         )
//        })} */}

// <Table virtualized height={400} data={[{}]}>
//       <Column width={70} align="center" fixed>
//         <HeaderCell>Id</HeaderCell>
//         <Cell dataKey="id" />
//       </Column>

//       <Column width={130}>
//         <HeaderCell>First Name</HeaderCell>
//         <Cell dataKey="firstName" />
//       </Column>

//       <Column width={130}>
//         <HeaderCell>Last Name</HeaderCell>
//         <Cell dataKey="lastName" />
//       </Column>

//       <Column width={100}>
//         <HeaderCell>Gender</HeaderCell>
//         <Cell dataKey="gender" />
//       </Column>

//       <Column width={100}>
//         <HeaderCell>Age</HeaderCell>
//         <Cell dataKey="age" />
//       </Column>

//       <Column width={200}>
//         <HeaderCell>City</HeaderCell>
//         <Cell dataKey="city" />
//       </Column>

//       <Column width={200}>
//         <HeaderCell>Email</HeaderCell>
//         <Cell dataKey="email" />
//       </Column>
//     </Table>


//        {/* <Table data={getData()}    >
//                 <Column>
//                      <HeaderCell>Email</HeaderCell>
//                      <Cell dataKey='email_id'/>
//                 </Column>
//                 <Column>
//                      <HeaderCell>First Name</HeaderCell>
//                      <Cell dataKey='first_name'/>
//                 </Column>
//                 <Column>
//                      <HeaderCell>Last Name</HeaderCell>
//                      <Cell dataKey='last_name'/>
//                 </Column>
//                 <Column>
//                      <HeaderCell>DOB</HeaderCell>
//                      <Cell dataKey='dob'/>
//                 </Column>
//                 <Column>
//                      <HeaderCell>Joining Date</HeaderCell>
//                      <Cell dataKey='org_join_date'/>
//                 </Column>
//                 <Column>
//                      <HeaderCell>organisation</HeaderCell>
//                      <Cell dataKey='organisation'/>
//                 </Column>
//        </Table> */}
//     </div>
//   )

// }

import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const App = () => {
  return (
    <Table virtualized height={400} data={[]}>
      <Column width={70} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={130}>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column width={130}>
        <HeaderCell>Last Name</HeaderCell>
        <Cell dataKey="lastName" />
      </Column>

      <Column width={100}>
        <HeaderCell>Gender</HeaderCell>
        <Cell dataKey="gender" />
      </Column>

      <Column width={100}>
        <HeaderCell>Age</HeaderCell>
        <Cell dataKey="age" />
      </Column>

      <Column width={200}>
        <HeaderCell>City</HeaderCell>
        <Cell dataKey="city" />
      </Column>

      <Column width={200}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>
    </Table>
  );
};
export default App;