import type { FC } from "hono/jsx";

const ReDoc: FC<{ title: string; specUrl: string }> = ({ title, specUrl }) => (
  <html>
    <head>
      <title>{title}</title>
      <script
        src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"
        defer
      >
      </script>
    </head>
    <body>
      <redoc spec-url={specUrl}></redoc>
    </body>
  </html>
);

export default ReDoc;
