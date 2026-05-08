export function bytesToBase64(bytes) {

  bytes = new TextEncoder().encode(bytes)

  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte),
  ).join("");  

  return btoa(binString);

}