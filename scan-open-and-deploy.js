import list_servers from "list-servers.js"

/** @param {NS} ns */
export async function main(ns) {
    const servers = list_servers(ns).filter(s => ns.hasRootAccess(s)).concat(['home']);
    for(const server of servers){
      if(server === "home"){
        continue
      }

      ns.tprint(`Deploying on: ${server}`)
      ns.exec("deploy.js", "home", 1, server, ns.args[0], server)
    }
}