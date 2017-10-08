const args = process.argv.slice(2);
/***
 * Support the following input commands:
 * --force:
 *    force clearing of DB on build (aka rebuild DB)
 * */
const opts = {
  ...args.includes('--force') && {force: true}
}
require('./db').init(opts);

process.exit();
