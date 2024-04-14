import DataTable from "react-data-table-component";

export default function TablePage() {
  const columns = [ { name: "Str" }, { name: "Num" } ]
  const data = [ { Str: "A", Num: 1 } ]
  console.log("ReactDataTable:", columns, data, )
  return (
      <DataTable
          columns={columns}
          data={data}
          // Uncommenting this line causes a hydration error in the pagination footer "nav"
          // element (see hydration-error.tsx)
          // pagination
      />
  )
}
