# docker build --tag andremiras/time2block:latest .

FROM denoland/deno:2.1.4

WORKDIR /app

USER deno

COPY deno.json deno.lock /app/
RUN deno install --frozen=true

COPY public /app/public
COPY src /app/src

EXPOSE 8000

CMD ["task", "run:prod"]
