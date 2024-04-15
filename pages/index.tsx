import DataTable from "react-data-table-component";
import ReactMarkdown from "react-markdown";
import fs from "fs";

export function getStaticProps() {
  return { props: { readme: fs.readFileSync("README.md").toString() } }
}

const Index = ({ readme }: { readme: string }) =>
    <div className={"markdown-body"}>
        <ReactMarkdown>{readme}</ReactMarkdown>
        <hr />
        <DataTable
            columns={[ { name: "Str" }, { name: "Num" } ]}
            data={[ { Str: "A", Num: 1 } ]}
            // This line causes a hydration error in the pagination footer "nav" element (iff the
            // browser window is ≥599px wide); commenting this line fixes it.
            pagination
        />
      </div>

export default Index
