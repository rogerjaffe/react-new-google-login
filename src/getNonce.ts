const NONCE_SIZE = 20;

const getNonce = (size = NONCE_SIZE) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const buf = [];
  for (let i = 0; i < size; i++) {
    buf.push(charset[Math.trunc(Math.random() * charset.length)]);
  }
  return buf.join("");
};
