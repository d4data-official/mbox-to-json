# Mbox To Json

mbox-to-json is a really simple package to transform mbox files to json.

## Instalation

```sh
yarn add mbox-to-json
# or
npm install mbox-to-json
```

If you are using typescript please run

```sh
yarn add -D @types/mbox-to-json
# or
npm install @types/mbox-to-json --save-dev
```

## Example 1:

Get all mails in a mbox file

```typescript
import { mboxParser } from "../src/Parser";

// here stream is a ReadStream to your mbox file
mboxParser(stream).then((mails) => {
  console.log(mails);
});
```

## Example 2:

Get a specific page of a specific size in your mbox file

> First page is at number 1

```typescript
import { mboxParser } from "../src/Parser";

// here stream is a ReadStream to your mbox file
mboxParser(stream, {
  pageSize: 20, // Number of mail to return
  pageNumber: 4 // Index of the 'page' you want
}).then((mails) => {
  console.log(mails);
});
}
```
