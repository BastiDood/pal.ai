# Overview

The proxy server is powered by the [Deno] runtime for [TypeScript].

[Deno]: https://deno.land/
[TypeScript]: https://www.typescriptlang.org/

# Environment Variables

**Name** | **Description**
-------- | ---------------
`PORT` | Network port to bind to when listening for new connections.
`API_KEY` | API key from [Hugging Face profile settings](https://huggingface.co/settings/tokens).

# Running the Application

Before starting the server, make sure to [build the client](../client/README.md). Specifically, the `dist` folder must exist.

## Bash

```bash
# TODO: Build the client.

# Load example environment variables.
PORT=4444
API_KEY=HuggingFace

# Start the server.
deno run start
```

## Powershell

```powershell
# TODO: Build the client.

# Load example environment variables.
$env:PORT = 4444
$env:API_KEY = 'HuggingFace'

# Start the server.
deno run start
```
