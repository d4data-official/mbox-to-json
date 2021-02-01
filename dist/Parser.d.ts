/// <reference types="node" />
import { ParsedMail } from 'mailparser';
import { Stream } from 'stream';
/**
 *
 *
 * @param {Stream} stream
 * @description stream to the mbox file
 *
 * @param {(number | undefined)} [pageSize=undefined]
 * @description if pageSize is set and > 0 the function return an array of array of size {pageSize} containing Promise that resolve mails datas as Parsed Mail. Otherwise it return an Array of the same kind of Promise
 *
 * @return {(Promise<ParsedMail>[]>)}
 */
declare function parseMbox(stream: Stream, pageSize?: number | undefined): Promise<Promise<ParsedMail>[]>;
export { parseMbox };
