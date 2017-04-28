const check = require("./check");
const debug = require('debug')('git-keep-update');
const _ = require('lodash');

const DEFAULT_OPTIONS = {
    cwd: process.cwd,
    always: true,
};

module.exports = function keepUpdate(opts) {

    opts = _.defaults(opts, DEFAULT_OPTIONS);

    const cwd = opts.cwd;
    const checkInterval = opts.checkInterval * 1000;
    const notifyInterval = opts.notifyInterval * 1000;

console.log(opts)

    if (opts.checkInterval) {
        function tick() {
            check(cwd, function (err, status) {
                onCheck(err, status);
                setTimeout(tick, checkInterval)
            })
        }
        return tick();
    }

    check(cwd, onCheck);

    function onCheck(err, status) {
        console.log(err, status);
    }
}