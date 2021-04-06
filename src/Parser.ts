import { ReadStream } from 'fs';
import { ParsedMail, simpleParser } from 'mailparser';
import HumanizeDuration from 'humanize-duration';
import MboxTransformer from './Transform';

export interface MboxParserOptions {
  pageNumber: number
  pageSize: number
}

export {
  ParsedMail
}

export default async function mboxParser(stream: ReadStream, options?: MboxParserOptions): Promise<Array<ParsedMail>> {
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