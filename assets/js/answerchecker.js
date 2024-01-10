function gid(id) {
  return document.getElementById(id);
}

async function hash(string) {
  const salt =
    "87a3bc6e5a8b8e8da8815c0126a247be5b021bb73ed549f58913421ad8bb8c00";
  const asBuffer = new TextEncoder().encode(string + salt);

  const hash = await crypto.subtle.digest("SHA-384", asBuffer);
  const hash_as_hex = Array.prototype.map
    .call(new Uint8Array(hash), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
  console.log(`${hash_as_hex}`);
  return hash_as_hex;
}

gid("form").onsubmit = async function submit(e) {
  e.preventDefault();
  const puzzle = document.title;
  const normalized = gid("answer")
    .value.toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z]/g, "");
  const hashed = await hash(normalized);
  const message = ANSWERS.includes(hashed)
    ? normalized.concat(" is correct!")
    : normalized.concat(" is incorrect.");
  if (PARTIALS.includes(hashed)) {
    message = PARTMESSAGE;
  }
  gid("feedback").innerText = message;
};
