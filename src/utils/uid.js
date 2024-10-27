export default function generateUid() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uid = "";
  for (let i = 0; i < 16; i++) {
    uid += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return uid;
}