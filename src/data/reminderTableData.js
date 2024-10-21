import ActionBtn from "@/components/icons/common/ActionBtn";
import ProductImage from "@/components/icons/common/ProductImage";

export const columns = [
  {
    field: 'file',
    headerName: 'Image',
    flex: 1.2,
    minWidth: 180,
    renderCell: (params) => <ProductImage image_name={params.value}/>
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 150,
    sortable: false,
  },
  {
    field: 'price',
    headerName: 'Price',
    flex: 1,
    minWidth: 150,
    sortable: false,
  },
  {
    field: 'detail',
    headerName: 'Detail',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'action',
    headerName: 'Action',
    flex: 0.8,
    minWidth: 152,
    renderCell: (params) => <ActionBtn data={params}/>
  },
];

//Mockup Data
export const rows = [
  {
    id: 1,
    name: '06/04/2022',
    price: '08/04/2022',
    detail: 'David Demo',
    file: "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: '12/04/2022',
    price: '15/04/2022',
    detail: 'John Smith',
    file: 'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: '18/04/2022',
    price: '20/04/2022',
    detail: 'Emma Johnson',
    file: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: '25/04/2022',
    price: '27/04/2022',
    detail: 'Sophia Brown',
    file: 'https://images.unsplash.com/photo-1541752171745-4176eee47556?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: '30/04/2022',
    price: '02/05/2022',
    detail: 'James Wilson',
    file: 'https://images.unsplash.com/photo-1482961674540-0b0e8363a005?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  }
]