import type { Child, FC } from "hono/jsx";

const Layout: FC<{ children: Child }> = ({ children }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Time to Block API</title>
      <link rel="stylesheet" href="/public/styles.css" />
    </head>
    <body>
      {children}
    </body>
  </html>
);

export default Layout;
