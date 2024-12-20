import { Hono } from "hono";
import Header from "../components/Header.tsx";
import Layout from "../components/Layout.tsx";
import Links from "../components/Links.tsx";
import Overview from "../components/Overview.tsx";

const html = (
  <Layout>
    <Header />
    <main>
      <Overview />
      <Links />
    </main>
  </Layout>
);

const app = new Hono()
  .get("/", (c) => (
    c.html(html)
  ));

export default app;
