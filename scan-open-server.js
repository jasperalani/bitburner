function scan(ns, parent, server, list) {
  const children = ns.scan(server);
  for (let child of children) {
    if (parent == child) {
      continue;
    }
    list.push(child);

    scan(ns, server, child, list);
  }
}

export function list_servers(ns) {
  const list = [];
  scan(ns, '', 'home', list);
  return list;
}

/** @param {NS} ns **/
export async function main(ns) {
  const args = ns.flags([["help", false]]);
  if (args.help) {
    ns.tprint("This script lists all servers on which you can/can't run scripts.");
    ns.tprint("open: Default 0 - Set to 1 to find servers that are closed.")
    ns.tprint(`Usage: run ${ns.getScriptName()} $open=0`);
    ns.tprint("Example:");
    ns.tprint(`> run ${ns.getScriptName()}`);
    ns.tprint(`> run ${ns.getScriptName()} 1`);
    return;
  }

  const mal = ns.args[0] === 1 || ns.args[0] === "1"

  let text = "opened"
  let filterAccess = s => ns.hasRootAccess(s)
  if (mal) {
    text = "closed"
    filterAccess = s => !ns.hasRootAccess(s)
  }

  const servers = list_servers(ns).filter(filterAccess).concat(['home']);

  let max_money = 0
  let best_server = {
    sv: 0,
    used: 0,
    max: 0,
    hl: 0
  }

  for (const server of servers) {
    let used = ns.getServerUsedRam(server);
    let max = ns.getServerMaxRam(server);
    let money_ = ns.getServerMaxMoney(server);
    let hl = ns.getServerRequiredHackingLevel(server)
    
    if (money_ > max_money && hl < ns.getHackingLevel()) {
      max_money = money_
      best_server = {
        sv: server,
        used: used,
        max: max,
        hl: hl
      }
    }

    ns.tprint(`${server} is ${text}. ${used} GB / ${max} GB (${(100 * used / max).toFixed(2)}%)`)
  }

  if (mal) {
    if(best_server.sv === 0){
      ns.tprint("No new servers are hackable.")
      return
    }
    ns.tprint(`Best server: ${best_server.sv}, money: ${max_money}, hacking level: ${best_server.hl},  ${best_server.used} GB / ${best_server.max} GB (${(100 * best_server.used / best_server.max).toFixed(2)}%)`)
  }
}

export default list_servers;