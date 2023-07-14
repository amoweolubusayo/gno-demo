// checks the existence of the adena object in window

const existsWallet = () => {
  if (window.adena) {
    return true;
  }
  return false;
};
