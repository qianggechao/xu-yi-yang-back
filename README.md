# koa js

[url](https://www.koajs.com.cn/) showcase using typescript && koa

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+

### Packge Description

- [jsencrypt](https://www.npmjs.com/package/jsencrypt) https://www.bejson.com/enc/rsa/ generate public&private key
