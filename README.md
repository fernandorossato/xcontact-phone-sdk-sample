# Xcontact phone sdk sample

This project is an example of using the Xcontact SDK to register a webrtc extension on the Xcontact PBX and make calls.

## Install the dependencies

```bash
yarn
# or
npm install
```

## .env file

create a .env file in the project root with the connection data, see example below:

```ini
XC_HOST=cliente1ws.xcontactcenter.com.br
XC_RAMAL=1000
XC_SENHA=123456
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
npm run dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
npm run build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
