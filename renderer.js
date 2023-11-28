const user = document.getElementById("user");
const footer = document.querySelector("footer");
const electronVer = document.createElement("span");
const nodeVer = document.createElement("span");
const secPageBtn = document.querySelector("#sec-page");

electronVer.innerHTML = "Electron version: " + window.versions.electron();
nodeVer.textContent = `Node Version: ${window.versions.node()}`;
footer.append(nodeVer, electronVer);

const getData = async () => {
  const res = await window.datas.data();
  return res;
};

getData().then((r) => {
  if (r.name) {
    user.innerHTML = `<span>User: </span> <span id='uName'>${r.name}</span> `;
  } else {
    return;
  }
});
