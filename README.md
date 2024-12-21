# Time to Block

[![Tests](https://github.com/AndreMiras/time2block/actions/workflows/tests.yml/badge.svg)](https://github.com/AndreMiras/time2block/actions/workflows/tests.yml)
[![Docker](https://github.com/AndreMiras/time2block/actions/workflows/docker.yml/badge.svg)](https://github.com/AndreMiras/time2block/actions/workflows/docker.yml)

Retrive the block number from a given timestamp.

## Run

### Development

```sh
deno task run:dev
```

## Test

```sh
deno task test
```

## Format & lint

```sh
deno fmt
deno lint
```

## Endpoints

- GET /v1/supported-chains
- GET /v1/:chain/timestamp/:timestamp e.g. /v1/canto/timestamp/1765432100
