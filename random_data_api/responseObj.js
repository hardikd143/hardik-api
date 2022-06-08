const responseObj = (newData) => {
  let d = new Date();
  let newObj = {
    date: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
    status: 200,
    "Content-Type": "application/json",
    data: newData,
  };
  return newObj;
};
module.exports = responseObj;
