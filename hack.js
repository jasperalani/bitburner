/** Usage: hack.js $host
 * @param {NS} ns */
export async function main(ns) {

  while(true){
    await ns.hack(ns.args[0])
  }

}