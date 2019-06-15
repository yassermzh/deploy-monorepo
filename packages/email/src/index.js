const Email = {
  send: (message, to) => {
    console.log(`sending ${message} to ${to}`);
    return Promise.resolve();
  }
};

module.exports = Email;
