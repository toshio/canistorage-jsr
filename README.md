# Canistorage

[Canistorage](https://github.com/toshio/canistorage) is a distributed cloud storage running on ICP (Internet Computer Protocol).

This library provides I/F to access Canistorage from client application in TypeScript.

## Usage

First, let's deploy Canistorage in your local PC and access it from Node,js, Deno, etc.

### Local Deployment of Canistorage

```bash
$ git clone https://github.com/toshio/canistorage.git
$ cd canistorage
$ dfx start --clean --background
$ dfx deploy
```

### Download samples

You can execute the following commands in any directory to download samples.

```bash
$ mkdir samples
$ cd samples
$ tiged https://github.com/toshio/canistorage-jsr/samples 
```

### 0. Prepare

Before running the samples, please update `host`, `canistrerId`, and seed phrase of `identity` in the common.ts.

```typescript:sapmples/0000_common.ts
export const canistorage = await Canistorage({
  host: "http://127.0.0.1:4943",
  canisterId: "uxrrr-q7777-77774-qaaaq-cai",
  identity: Secp256k1KeyIdentity.fromSeedPhrase("test test test test test test test test test test test test")
});
```

##### Note

Deno has a great [security and permissions](https://docs.deno.com/runtime/fundamentals/security/) feature. If you change the access host, you must also change the value of `--allow-net` in tasks of deno.json.

### 1. Version

```bash
$ deno task version
canistorage 0.1.3
```

### 2. Initialize

```bash
deno task initialize
```

### 3. Create directory

```bash
deno task createDirectory <directory>
```

### 4. Upload a file

```bash
deno task upload <filePath> <canistorage path>
```

### 5. Download a file

```bash
deno task download <canistorage path> <filePath>
```

### 6. delete a file

```bash
deno task delete <canistorage path>
```

## Disclaimer

You can also deploy to Playground, which is free for 20 minutes, with the `--playgound` option.   

Also, to deploy to Mainnet, please specify the `--ic` option.

Canistorage is still under development, so use at your own risk.  The developers assume no responsibility for any data loss or leakage that occurs as a result of using Canistorage.
