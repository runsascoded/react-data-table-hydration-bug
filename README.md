# react-data-table-hydration-bug
Repro of a hydration error in [react-data-table-component]'s pagination `<nav>` element.

```bash
git clone https://github.com/ryan-williams/react-data-table-hydration-bug
cd react-data-table-hydration-bug
pnpm install
npm run dev
```

Then visit [localhost:3000/hydration-error] in your browser, you'll see something like:

![](screenshots/hydration-error.png)

[localhost:3000/no-pagination-no-error] is the same page, with [`DataTable`]'s `pagination` property commented out, and the error is not present:

![](screenshots/no-pagination-no-error.png)

`diff -u pages/hydration-error.tsx pages/no-pagination-no-error.tsx` shows:
```diff
       <DataTable
           columns={columns}
           data={data}
-          // This line causes a hydration error in the pagination footer "nav" element; commenting
-          // this line fixes it (see no-pagination-no-error.tsx)
-          pagination
+          // Uncommenting this line causes a hydration error in the pagination footer "nav"
+          // element (see hydration-error.tsx)
+          // pagination
       />
```

[react-data-table-component]: https://github.com/jbetancur/react-data-table-component
[localhost:3000/hydration-error]: http://localhost:3000/hydration-error
[localhost:3000/no-pagination-no-error]: http://localhost:3000/no-pagination-no-error
[`DataTable`]: 
