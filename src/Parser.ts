import { ParsedMail, simpleParser } from 'mailparser';
import MboxTransformer from './Transform';
import { Readable } from 'stream';

export interface MboxParserOptions {
  pageNumber: number
  pageSize: number
}

export {
  ParsedMail
}

export default async function mboxParser(stream: Readable, options?: MboxParserOptions): Promise<Array<ParsedMail>> {
  return new Promise<Array<ParsedMail>>((resolve, reject) => {
    let mails: Promise<Array<ParsedMail>>;
    const transform = new MboxTransformer({ paginationOption: options });
    const mbox = stream.pipe(transform);
    mbox.on('close', async () => {
      mails?.then((resolved) => {
        resolve(resolved);
      }).catch((e) => {
        reject(e);
      })
    });
    mbox.on('data', async (data) => {
      if (!data) {
        reject(new Error('Unable to find mail in this file corresponding the given options'));
        return;
      }
      mails = Promise.all<ParsedMail>(data.map(async (mail: any) => {
        return new Promise<ParsedMail>((resolve, reject) => {
          simpleParser(mail, { keepCidLinks: true }, (err, mail) => {
            if (err) { reject(err) }
            resolve(mail);
          });
        })
      }));
    });
  });
};

export { mboxParser }