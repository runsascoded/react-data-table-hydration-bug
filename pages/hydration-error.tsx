import DataTable from "react-data-table-component";

export default function TablePage() {
  const columns = [ { name: "Str" }, { name: "Num" } ]
  const data = [ { Str: "A", Num: 1 } ]
  console.log("ReactDataTable:", columns, data, )
  return (
      <DataTable
          columns={columns}
          data={data}
          // This line causes a hydration error in the pagination footer "nav" element; commenting
          // this line fixes it (see no-pagination-no-error.tsx)
          pagination
      />
  )
}
