# Time to Block

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
