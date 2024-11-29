function delay(n) {
  return new Promise((res, rej) => {
    setTimeout(()=>{
      res();
    }, n)
  });
}

module.exports = {
  delay,
};
