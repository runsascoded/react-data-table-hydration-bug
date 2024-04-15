# react-data-table-hydration-bug
Repro of a [hydration error][react#418] in [react-data-table-component]'s [`Pagination` element][PaginationWrapper].

[When the client window width][shouldShow] is < [599px][`SMALL`] or `undefined` (as during [SSR]), "rows per page" in the pagination footer [is omitted][shouldShows]. This causes a hydration error whenever the client window width is ≥599, as it is omitted on the server but rendered on the client.

![][error.gif]

*Hydration error iff `window.innerWidth < 599`*

## Live demo
[react-data-table-hydration-bug.runsascoded.com] was built and deployed [via GitHub Actions][GHA], and the error is visible in the dev console:

![][console-error.png]

[Page source][index.tsx]:

```tsx
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
```

The error in the dev console links to [react#418]:
```
Uncaught Error: Minified React error #418; visit https://reactjs.org/docs/error-decoder.html?invariant=418 for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
    at lg (framework-5eea1a21a68cb00b.js:9:46336)
    at i (framework-5eea1a21a68cb00b.js:9:121103)
    at oD (framework-5eea1a21a68cb00b.js:9:99070)
    at framework-5eea1a21a68cb00b.js:9:98937
    at oO (framework-5eea1a21a68cb00b.js:9:98944)
    at ox (framework-5eea1a21a68cb00b.js:9:93983)
    at x (framework-5eea1a21a68cb00b.js:33:1364)
    at MessagePort.T (framework-5eea1a21a68cb00b.js:33:1894)
```

## Local repro
Dev mode gives more details about the error (namely that it occurs in a hierarchy like `<nav>…<span>` in react-data-table-component's [pagination footer][PaginationWrapper]):

```bash
git clone https://github.com/runsascoded/react-data-table-hydration-bug && cd react-data-table-hydration-bug
pnpm install
npm run dev
```

[localhost:3000] will show something like:

![][hydration-error.png]

Error text:

```
Unhandled Runtime Error
Error: Hydration failed because the initial UI does not match what was rendered on the server.
See more info here: https://nextjs.org/docs/messages/react-hydration-error

Expected server HTML to contain a matching <span> in <nav>.

...
  <O>
    <nav>
    ^^^^^
      <O>
        <span>
        ^^^^^^
```

Commenting out [the `pagination` property] avoids the issue; [react-data-table-component#649] and [this StackOverflow][SO] describe the same.


[react-data-table-component]: https://github.com/jbetancur/react-data-table-component
[localhost:3000]: http://localhost:3000

[react#418]: https://react.dev/errors/418?invariant=418

[react-data-table-hydration-bug.runsascoded.com]: https://react-data-table-hydration-bug.runsascoded.com
[GHA]: https://github.com/runsascoded/react-data-table-hydration-bug/actions
[PaginationWrapper]: https://github.com/jbetancur/react-data-table-component/blob/v7.6.2/src/DataTable/Pagination.tsx#L20-L30

[shouldShow]: https://github.com/jbetancur/react-data-table-component/blob/v7.6.2/src/DataTable/Pagination.tsx#L98
[`SMALL`]: https://github.com/jbetancur/react-data-table-component/blob/v7.6.2/src/DataTable/media.ts
[shouldShows]: https://github.com/jbetancur/react-data-table-component/blob/v7.6.2/src/DataTable/Pagination.tsx#L145-L151
[SSR]: https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering

[SO]: https://stackoverflow.com/q/75068071
[react-data-table-component#649]: https://github.com/jbetancur/react-data-table-component/issues/649

[//]: # (gh repo links)
[index.tsx]: pages/index.tsx
[the `pagination` property]: pages/index.tsx#L17

[//]: # (images)
[error.gif]: public/error.gif
[console-error.png]: public/console-error.png
[hydration-error.png]: public/hydration-error.png
