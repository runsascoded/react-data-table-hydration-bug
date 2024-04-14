import Link from "next/link";

export default function Index() {
  const rdtc = <a target={"_blank"} href={"https://github.com/jbetancur/react-data-table-component"}>react-data-table-component</a>
  const DataTable = <a href={"https://github.com/jbetancur/react-data-table-component/blob/v7.6.2/src/DataTable/DataTable.tsx"}>DataTable</a>
  return (
      <div>
        <h1><a target={"_blank"} href={"https://github.com/runsascoded/react-data-table-hydration-bug"}>react-data-table-hydration-bug</a></h1>
        <p>Repro of a hydration error in {rdtc}'s pagination <code>&lt;nav&gt;</code> element:</p>
        <ul>
          <li><Link href={"/hydration-error"}>/hydration-error</Link>: hydration error while rendering a simple {rdtc} {DataTable}</li>
          <li><Link href={"/no-pagination-no-error"}>/no-pagination-no-error</Link>: commenting out the `pagination` property doesn't exhibit have the issue</li>
        </ul>
        <p>Both pages above have been compiled, so you'll have to open the dev console to see the error</p>
        <p>Cloning the repo and running <code>next dev</code> allows for more context:</p>
        <p><a href={"/hydration-error.png"}><img width={800} src={"/hydration-error.png"}/></a></p>
        <p>See <a target={"_blank"} href={"https://github.com/runsascoded/react-data-table-hydration-bug"}>runsascoded/react-data-table-hydration-bug</a> on Github for more info.</p>
      </div>
  )
}
