const selects = document.querySelectorAll("select");
const colorInput = document.getElementById("color");

colorInput.addEventListener("input", (e) => {
  const color = e.target.value;
  document.documentElement.style.setProperty("--ly--color", color);
});

selects.forEach((select) => {
  select.addEventListener("change", updateButtons);
});

let oldAtt = "bs";         // iniziale type
let oldShape = "rounded";  // iniziale shape

function updateButtons() {
  const type = document.getElementById("type").value;   // bs, mnl
  const shape = document.getElementById("shape").value; // squared, pill, asym
  const color = document.getElementById("color").value;

  console.log([shape, type, color]);

  const btns = document.querySelectorAll("table button");

  let newAtt = "";
  if (type === "minimal") {
    newAtt = "mnl";
  }
  if (type === "basic") {
    newAtt = "bs";
  }

  let newShape = "";
  if(shape === "rounded"){
    newShape = "rounded"
  }
  if(shape === "pill"){
    newShape = "pill"
  }
  if(shape === "asym"){
    newShape = "asym"
  }
  if(shape === "squared"){
    newShape = "squared"
  }

  // sostituzione attributi type
  if (newAtt !== oldAtt) {
    btns.forEach((btn) => {
      [...btn.attributes].forEach((attr) => {
        if (attr.name === oldAtt) {
          btn.removeAttribute(attr.name);
          btn.setAttribute(newAtt, "");
        }

        if (attr.name.startsWith(oldAtt + "-")) {
          const suffix = attr.name.substring(oldAtt.length); // es: "-prim"
          btn.removeAttribute(attr.name);
          btn.setAttribute(newAtt + suffix, "");
        }
      });
    });
    oldAtt = newAtt;
    newAtt = "";
  }

  // sostituzione attributi shape
  if (newShape !== oldShape){
    btns.forEach((btn) => {
      [...btn.attributes].forEach((attr) => {

        if(oldShape !== "squared"){
          if (attr.name === oldShape) {
            btn.removeAttribute(attr.name);
          }
        }
        if(newShape !== "squared"){
            btn.setAttribute(newShape, "");
          }
      });
    });

    
      oldShape = newShape;
      newShape = "";

  }
}
