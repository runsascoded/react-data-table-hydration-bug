import DataTable from "react-data-table-component";
import ReactMarkdown, { Components } from "react-markdown";
import fs from "fs";
import Link from "next/link";

export function getStaticProps() {
  return { props: { readme: fs.readFileSync("README.md").toString() } }
}

const components: Components = {
  a: ({ href, children }) =>
      <Link href={href || "#"} target={href?.startsWith("http") ? "_blank" : "_self"}>
        {children}
      </Link>
}

const Index = ({ readme }: { readme: string }) =>
    <div className={"markdown-body"}>
      <ReactMarkdown components={components}>{readme}</ReactMarkdown>
      <DataTable
          columns={[ { name: "Str" }, { name: "Num" } ]}
          data={[ { Str: "A", Num: 1 } ]}
          // This line causes a hydration error in the pagination footer "nav" element (iff the
          // browser window is ≥599px wide); commenting this line fixes it.
          pagination
      />
    </div>

export default Index
