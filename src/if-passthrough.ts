import stream from 'stream';
import through from 'through2';
import VinylFile from 'vinyl';
import { Function1, TT$ } from '@upradata/util';


export interface IfPassThroughOptions {
    condition: Function1<VinylFile, TT$<boolean>>;
    true: Function1<VinylFile, TT$<void>>;
    false?: Function1<VinylFile, TT$<void>>;
}

export function ifPassthrough(options?: IfPassThroughOptions) {
    const { condition, true: trueHandler, false: falseHandler } = options;

    return through.obj(async (file: VinylFile, encoding: string, cb: stream.TransformCallback) => {
        if (await condition(file))
            await trueHandler(file);
        else
            await falseHandler(file);

        cb(null, file);
    });
}
