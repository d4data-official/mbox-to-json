import { ParsedMail, simpleParser } from 'mailparser';
import { mboxReader } from 'mbox-reader';
import { Stream } from 'stream';

export async function parseMbox(stream: Stream): Promise<ParsedMail[]> {
    const messages: ParsedMail[] = [];
    for await (let message of mboxReader(stream)) {
        messages.push(await simpleParser(message.content));
    }
    return (messages);
};