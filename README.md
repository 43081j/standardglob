# Standard Glob Specification

## Development

### Initial set up

See [`mise.toml`](./mise.toml) for dependencies.

If you have [`mise`](https://mise.jdx.dev) installed, you can run `mise install` to install them automatically.

_We need to use the tracey `2.0` pre-release as it adds support for yaml files, so we need to compile it from source for now._

### JSON schemas

JSON schemas for the tests are already configured for VSCode and JetBrains IDEs.

Any other need to be manually configured as follows:

```
json-schemas/test.schema.json -> tests/**/.{yml}
```

Feel free to open a PR to add config for more tools!

## Writing the spec

Read the tracey docs for more information: https://tracey.bearcove.eu/guide/getting-started

### Running tracey

Run the web UI:

```
tracey web
```

Then open the url, which defaults to http://127.0.0.1:3000
