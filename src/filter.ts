import PluginError from 'plugin-error';
import stream from 'stream';
import through from 'through2';
import VinylFile from 'vinyl';
import { TT$ } from '@upradata/util';


export class FilterOptions {
    filter: (file: VinylFile) => TT$<boolean>;
}

export function filter(options: FilterOptions) {
    return through.obj(async (file: VinylFile, encoding: string, cb: stream.TransformCallback) => {

        if (file.isStream()) {
            return cb(new PluginError('Filter', 'Streaming not supported'));
        }

        if (file.isNull()) {
            return cb(null, file);
        }

        if (await options.filter(file)) {
            cb(null, file);
        } else {
            cb();
        }
    });
}
