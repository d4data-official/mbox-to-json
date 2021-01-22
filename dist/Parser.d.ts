/// <reference types="node" />
import { ParsedMail } from 'mailparser';
import { Stream } from 'stream';
export declare function parseMbox(stream: Stream): Promise<Promise<ParsedMail>[]>;
