import PluginError from 'plugin-error';
import stream from 'stream';
import through from 'through2';
import VinylFile from 'vinyl';


export function waitFlush() {
    const files: VinylFile[] = [];

    return through.obj(
        (file: VinylFile, _encoding: string, cb: stream.TransformCallback) => {
            if (file.isStream()) {
                return cb(new PluginError('WaitFlush', 'Streaming not supported'));
            }

            files.push(file);
            return cb();
        },
        function (cb: stream.TransformCallback) {
            for (const file of files)
                this.push(file);

            cb();
        });
}
