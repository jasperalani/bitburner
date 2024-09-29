/** Usage: purchaseServer.js $host $ram
 * @param {NS} ns */
export async function main(ns) {
  await ns.purchaseServer(ns.args[0], ns.args[1])
}