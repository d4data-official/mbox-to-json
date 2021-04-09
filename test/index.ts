import { createReadStream } from 'fs';
import path from 'path';
import { mboxParser } from '../src/Parser';

async function test(absolutePath: string) {
  let stream = createReadStream(absolutePath);
  return await mboxParser(stream, {
    pageNumber: 1,
    pageSize: 73
  });
}

test(path.resolve(process.argv[2]))
  .then((mails) => {
    console.log(mails);
  })
  .catch(e => {
    console.error(e.message);
  });