const debug = require('debug')('git-keep-update');
const _ = require('lodash');
const execSync = require('child_process').execSync;

const DEFAULT_OPTIONS = {
    cwd: process.cwd,
    always: true,
};

module.exports = function keepUpdate(opts) {
    opts = _.defaults(opts, DEFAULT_OPTIONS);
    opts.checkInterval = opts.checkInterval * 1000;
    
    console.log('Running command: ', opts.cmd);

    function tick() {
        const commandOut = execSync(opts.cmd);

        if (commandOut && commandOut.indexOf("CONFLICT") > -1) {
            console.log("Open mergeTool");
            const mergeToolOut = execSync('git mergetool');
        }
        setTimeout(tick, opts.checkInterval);
    }

    return tick();
}