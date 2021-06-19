import stream from 'stream';
import { promisify } from 'util';
import { isDefined } from '@upradata/util';


export function isWritable(stream: any): stream is NodeJS.WritableStream {
    return stream.writable || isDefined(stream._writableState);
}

export function isReadable(stream: any): stream is NodeJS.ReadableStream {
    return stream.readable || isDefined(stream._readableState);
}

export const streamFinished = promisify(stream.finished);
