import { Transform, TransformCallback, TransformOptions } from "stream";
import { MboxParserOptions } from "./Parser";

export default class MboxTransformer extends Transform {
  public mails: Array<string>;
  private remaining: string;
  private pageSize: number | undefined;
  private pageNumber: number | undefined;

  constructor(private opts?: TransformOptions & { paginationOption?: MboxParserOptions }) {
    super(opts ?? {
      readableObjectMode: true,
      writableObjectMode: false,
      encoding: 'binary',
    });
    this.pageSize = (opts?.paginationOption?.pageSize ?? -1) < 0 ? undefined : opts?.paginationOption?.pageSize;
    this.pageNumber = (opts?.paginationOption?.pageNumber ?? -1) < 0 ? undefined : opts?.paginationOption?.pageNumber;
    this.mails = [];
    this.remaining = '';
  }

  _transform(chunk: Buffer, encoding: string, callback: TransformCallback) {
    const data = `${this.remaining}${chunk.toString()}`;
    this.remaining = '';
    const mails = data.split(/^From /m).filter((mail) => mail.length).map((mail) => {
      return `From ${mail}`
    });
    this.remaining = mails.pop() ?? '';
    this.mails.push(...mails);
    if (this.opts?.paginationOption) {
      if (this.mails.length > this.pageSize!) {
        this.pageNumber! -= 1;
        if (this.pageNumber! === 0) {
          this.emit('data', this.mails.splice(0, this.pageSize));
          this.emit('close');
        } else {
          this.mails.splice(0, this.pageSize);
        }
      }
    }
    callback();
  };

  _flush(callback: TransformCallback) {
    if (this.remaining.length) {
      this.mails.push(this.remaining);
      this.remaining = '';
      if (this.opts?.paginationOption) {
        this.pageNumber! -= 1;
        if (this.pageNumber! === 0) {
          this.emit('data', this.mails.splice(0, this.pageSize));
        } else {
          this.emit('data', null);
        }
      } else {
        this.emit('data', this.mails)
      }
      callback();
      this.emit('close')
    }
  }
}

export {
  MboxTransformer
}