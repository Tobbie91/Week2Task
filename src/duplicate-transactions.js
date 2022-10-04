function findDuplicateTransactions(transactions) {
  if (!Array.isArray(transactions) || typeof transactions !== "object") {
    throw Error;
  }

  if (!transactions) {
    return [];
  }
  function timeinsec(time) {
    const newtime = new Date(time).getTime() / 1000;
    return newtime;
  }
  const mod = JSON.parse(JSON.stringify(transactions));
  // console.log("mod is ", mod)
  mod.sort((a, b) => timeinsec(a.time) - timeinsec(b.time));
  //console.log("mod sorted is ", mod)
  let output = [];
  let buffer = [];
  let result = [];

  for (let i = 0; i < mod.length; i++) {
    if (result.some((x) => x.id == mod[i].id)) continue;
    else buffer.push(mod[i]);
    for (let j = 0; j < mod.length; j++) {
      if (result.some((x) => x.id == mod[j].id)) continue;
      else if (
        mod[i].id != mod[j].id &&
        mod[i].sourceAccount === mod[j].sourceAccount &&
        mod[i].targetAccount === mod[j].targetAccount &&
        mod[i].amount === mod[j].amount &&
        mod[i].category === mod[j].category
      ) {
        buffer.push(mod[j]);
      }
    }
    for (let i = 0; i < buffer.length - 1; i++) {
      if (Math.abs(timeinsec(buffer[i].time) - timeinsec(buffer[i + 1].time))> 59) {
        buffer = buffer.slice(0, i+1);
      
      break;
      }
    }
    for (let i = 0; i < buffer.length; i++) {
      result.push(buffer[i]);
    }
    if (buffer.length > 1) {
      output.push(buffer);
    }
    buffer = [];
  }
  return output;
}

module.exports = findDuplicateTransactions;

const transaction = [
  {
    id: 3,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:34:30.000Z",
  },
  {
    id: 1,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:33:00.000Z",
  },
  {
    id: 6,
    sourceAccount: "A",
    targetAccount: "C",
    amount: 250,
    category: "other",
    time: "2018-03-02T10:33:05.000Z",
  },
  {
    id: 4,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:36:00.000Z",
  },
  {
    id: 2,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:33:50.000Z",
  },
  {
    id: 5,
    sourceAccount: "A",
    targetAccount: "C",
    amount: 250,
    category: "other",
    time: "2018-03-02T10:33:00.000Z",
  },
];
console.log(findDuplicateTransactions(transaction));
