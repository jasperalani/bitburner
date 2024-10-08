/** @param {NS} ns */
export async function main(ns) {
  let [force = false, destinationFolder = ''] = ns.args;
  if (destinationFolder != '' && !destinationFolder.endsWith('/'))
    destinationFolder += '/';

  const BASE_URL = 'https://raw.githubusercontent.com/xxxsinx/bitburner/main/';
  const FILES = [];

  for (const file of FILES) {
    const source = BASE_URL + file;
    const destination = destinationFolder + file;
    if (ns.fileExists(destination) && force == false) {
      var resp = await ns.prompt(`?! ${destination} already exists, do you want to overwrite it ?!`);
      if (resp == false) {
        ns.tprint("Download skipped.");
        continue;
      }
    }
    const ret = await ns.wget(source, destination);
    if (ret == true) {
      ns.tprint('SUCCESS: Downloaded ' + source + ' to ' + destination);
    }
    else {
      ns.tprint('FAIL: ?! Could not download ' + source + ' to ' + destination + ' ?!');
    }
  }
}