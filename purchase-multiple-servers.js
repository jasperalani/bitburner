/** @param {NS} ns */
export async function main(ns) {
  // const n = ns.args[0] // amount of servers to buy
  const ramTB = ns.args[0] // ram in terabytes
  const ramGB = ramTB * 1024 // ram in gigabytes

  let i = 1;
  let p = 0;
  let e = 0;

  while (i < ns.getPurchasedServerLimit()+1) {
    let cost = ns.getPurchasedServerCost(ramGB)
    if ((ns.getServerMoneyAvailable("home") / 10) > cost) {
      let result = ns.purchaseServer(`sv${ramTB}tb-${i}`, ramGB);
      if(result != ""){
        ns.tprint(`Purchased server ${result}`)
        p++
      }else{
        ns.tprint("Unable to purchase servers")
      }
      ++i;
    }else{
      e++;
    }

  }

  ns.tprint(`${e} servers were too expensive.`)
  ns.tprint(`Purchased ${p} servers in total.`)
}