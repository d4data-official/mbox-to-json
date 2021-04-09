# Mbox Parser

mbox-tparser is a really simple package to transform mbox files to js object.

## Instalation

```sh
yarn add mbox-parser
# or
npm install mbox-parser
```

## Example 1:

Get all mails in a mbox file

```typescript
import { mboxParser } from "mbox-parser";

// here stream is a ReadStream to your mbox file
mboxParser(stream).then((mails) => {
  console.log(mails);
});
```

## Example 2:

Get a specific page of a specific size in your mbox file

> First page is at number 1

```typescript
import { mboxParser } from "mbox-parser";

// here stream is a ReadStream to your mbox file
mboxParser(stream, {
  pageSize: 20, // Number of mail to return
  pageNumber: 4 // Index of the 'page' you want
}).then((mails) => {
  console.log(mails);
});
}
```
