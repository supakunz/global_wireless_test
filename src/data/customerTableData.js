import ActionBtn from "@/components/icons/common/ActionBtn";
import UsersImage from "@/components/icons/common/UsersImage";

export const columns = [
  {
    field: 'file',
    headerName: 'Image',
    flex: 0.8,
    minWidth: 180,
    renderCell: (params) => <UsersImage image_name={params.value}/>
  },
  {
    field: 'firstName',
    headerName: 'FirstName',
    flex: 1,
    minWidth: 150,
    sortable: false,
  },
  {
    field: 'lastName',
    headerName: 'LastName',
    flex: 1,
    minWidth: 150,
    sortable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1.4,
    minWidth: 150,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'action',
    headerName: 'Action',
    flex: 1,
    minWidth: 152,
    renderCell: (params) => <ActionBtn data={params}/>
  },
];

//Mockup Data
export const rows = [
  {
    id: 1,
    firstName: 'David',
    lastName: 'Demo',
    email: 'David@hotmail.con',
    role: 'user',
    file: "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Smith',
    email: 'John@Smith.com',
    role: 'user',
    file: 'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'Emma@Johnson.com',
    role: 'user',
    file: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    firstName: 'Sophia',
    lastName: 'Brown',
    email: 'Sophia@Brown.com',
    role: 'user',
    file: 'https://images.unsplash.com/photo-1541752171745-4176eee47556?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    firstName: 'James',
    lastName: 'Wilson',
    email: 'James@Wilson.com',
    role: 'user',
    file: 'https://images.unsplash.com/photo-1482961674540-0b0e8363a005?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  }
]