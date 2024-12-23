# docker build --build-arg VERSION=$(git describe --tags --always) --tag andremiras/time2block:latest .


FROM denoland/deno:2.1.4

WORKDIR /app

USER deno

ARG VERSION=1.0.0
ENV VERSION=$VERSION

COPY deno.json deno.lock /app/
RUN deno install --frozen=true

COPY public /app/public
COPY src /app/src

EXPOSE 8000

CMD ["task", "run:prod"]
