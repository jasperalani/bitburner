/** @param {NS} ns**/
export async function main(ns) {
  ns.disableLog("ALL"); //Visual clarity

  let manager;
  let history = {
    purchased: {
      nodes: 0,
    },
    upgraded: {
      level: 0,
      ram: 0,
      core: 0,
    }
  }

  async function log() {//The display
    ns.clearLog();

    const padding = 35;
    ns.print(`╠══════ Managing ${ns.hacknet.numNodes()} HNet Nodes `.padEnd(padding, "═") + "╣")
    ns.print(`╠══════ Nodes purchased: ${history.purchased.nodes} `.padEnd(padding, "═") + "╣")
    ns.print(`╠══════ Upgraded ${history.upgraded.level} levels `.padEnd(padding, "═") + "╣")
    ns.print(`╠══════ Upgraded ${history.upgraded.ram} RAM `.padEnd(padding, "═") + "╣")
    ns.print(`╠══════ Upgraded ${history.upgraded.core} cores `.padEnd(padding, "═") + "╣")
  }

  //Put modules below here
  manager = await ns.prompt("Activate Hacknet Manager?");
  async function hnManager() {

    let mode = ["Level", "Ram", "Core"]
    function check(q) { return eval(q < ns.getPlayer().money / 5) }
    if (check(ns.hacknet.getPurchaseNodeCost())) {
      history.purchased.nodes++
      ns.hacknet.purchaseNode();
    }
    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
      for (let n = 0; n < 3; n++) {
        if (check(ns.hacknet["get" + mode[n] + "UpgradeCost"](i))) {
          switch (mode[n]) {
            case "Level":
              history.upgraded.level++
              break;
            case "RAM" || "Ram":
              history.upgraded.ram++
              break;
            case "Core":
              history.upgraded.core++
              break;
          }
          ns.hacknet["upgrade" + mode[n]](i);
        }
      }
    }
  }
  //But above here
  ns.tail()
  while (true) {//Keeps everything running once per second
    await hnManager()
    await log()
    await ns.asleep(1000)
  }
}
