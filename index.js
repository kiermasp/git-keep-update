const debug = require('debug')('git-keep-update');
const _ = require('lodash');
const exec = require('child_process').exec;

const DEFAULT_OPTIONS = {
    cwd: process.cwd,
    always: true,
};

module.exports = function keepUpdate(opts) {

    opts = _.defaults(opts, DEFAULT_OPTIONS);
    opts.checkInterval = opts.checkInterval * 1000;

    console.log('Running command: ', opts.cmd);
    function tick() {
        exec(opts.cmd, { timeout: 1000 * 60 * 5 }, (err, res) => {
            console.log("process response", res);
            if(res.idnexOf("CONFLICT") > -1) {
                console.log("Open mergeTool")
                exec('git mergetool', (err, response)=>{

                })
            }
            setTimeout(tick, opts.checkInterval)
        })
    }
    return tick();
}