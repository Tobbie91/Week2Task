const input = [
    {
      name: "Hendrick",
      dob: "1853-07-18T00:00:00.000Z",
      regNo: "041",
    },
    {
      name: "Albert",
      dob: "1879-03-14T00:00:00.000Z",
      regNo: "033",
    },
    {
      name: "Marie",
      dob: "1867-11-07T00:00:00.000Z",
      regNo: "024",
    },
    {
      name: "Neils",
      dob: "1885-10-07T00:00:00.000Z",
      regNo: "02",
    },
    {
      name: "Max",
      dob: "1858-04-23T00:00:00.000Z",
      regNo: "014",
    },
    {
      name: "Erwin",
      dob: "1887-08-12T00:00:00.000Z",
      regNo: "09",
    },
    {
      name: "Auguste",
      dob: "1884-01-28T00:00:00.000Z",
      regNo: "08",
    },
    {
      name: "Karl",
      dob: "1901-12-05T00:00:00.000Z",
      regNo: "120",
    },
    {
      name: "Louis",
      dob: "1892-08-15T00:00:00.000Z",
      regNo: "022",
    },
    {
      name: "Arthur",
      dob: "1892-09-10T00:00:00.000Z",
      regNo: "321",
    },
    {
      name: "Paul",
      dob: "1902-08-08T00:00:00.000Z",
      regNo: "055",
    },
    {
      name: "William",
      dob: "1890-03-31T00:00:00.000Z",
      regNo: "013",
    },
    {
      name: "Owen",
      dob: "1879-04-26T00:00:00.000Z",
      regNo: "052",
    },
    {
      name: "Martin",
      dob: "1871-02-15T00:00:00.000Z",
      regNo: "063",
    },
    {
      name: "Guye",
      dob: "1866-10-15T00:00:00.000Z",
      regNo: "084",
    },
    {
      name: "Charles",
      dob: "1868-02-14T00:00:00.000Z",
      regNo: "091",
    },
];

function classifier(input) {
  const modifyInput = input.map((el, index) => {
    let date = new Date(el.dob);

    let age = 2019 - date.getFullYear();
    const objEl = { ...el, age };

    return objEl;
  });

  //   Sort modified input
  modifyInput.sort((a, b) => a.age - b.age);

  let grouped = [];
  let buffer = [];
  let state;

  modifyInput.forEach((el) => {
    if (!state) state = el;

    if (buffer.length == 3 || el.age - state.age > 5) {
      grouped.push(buffer);
      buffer = [];
      state = el;
    }
    buffer.push(el);
  });

  if (buffer.length > 0) {
    grouped.push(buffer);
  }

  let result = {
    noOfGroups: grouped.length,
  };

  grouped.forEach((el, i) => {
    let members = [];
    let oldest = 0;
    let sum = 0;
    let regNos = [];

    el.forEach((item, i) => {
      members.push(item);
      oldest = Math.max(oldest, item.age);
      sum += item.age;
      regNos.push(Number(item.regNo));
    });
    regNos.sort((a, b) => a - b);

    result[`group${i + 1}`] = { members, oldest, sum, regNos };
  });

//   console.log(result)
  return result;
}


module.exports = classifier;

// export default classifier

console.log(classifier(input));
