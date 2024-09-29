
/** @param {NS} ns**/
export async function main(ns) {
  // Kill All Method


  let hosts = await scanServers(ns)
  ns.tprint(hosts)

  // Kill all scripts on all hosts
  for (let i = 0; i < hosts.length; i++) {
    ns.killall(hosts[i])
  }
}

export async function scanServers(ns) {//Finds all servers
  let serverList = ns.scan("home");

  let results = ns.scan(serverList[checked]); checked++;
  for (let i = 0; i <= results.length - 1; i++) {
    if (results != "home" && !serverList.includes(results)) {
      serverList.push(results); serverCount[depth + 1]++
    }
  }
}