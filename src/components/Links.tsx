import type { FC } from "hono/jsx";

const Links: FC = () => (
  <section>
    <h2>Documentation</h2>
    <div class="links">
      <a href="/redoc">Redoc Documentation</a>
      <a href="/swagger">Swagger UI</a>
      <a href="https://github.com/AndreMiras/time2block" target="_blank">
        GitHub Repository
      </a>
    </div>
  </section>
);

export default Links;
