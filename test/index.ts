import { createReadStream } from 'fs';
import path from 'path';
import { mboxParser } from '../src/Parser';

async function test(absolutePath: string) {
  let stream = createReadStream(absolutePath);
  return await mboxParser(stream, {
    pageNumber: 73,
    pageSize: 100
  });
}

test(path.resolve(process.argv[2]))
  .then((mails) => {
    console.log(mails.length);
  })
  .catch(e => {
    console.error(e);
  });