const selects = document.querySelectorAll("select");
const colorInput = document.getElementById("color");

colorInput.addEventListener("input", (e) => {
  const color = e.target.value;
  document.documentElement.style.setProperty("--ly--color", color);

  console.log(color);
  //destructor
  const [, r, g, b] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  console.log(r, g, b);

  const rValue = Math.round(parseInt(r, 16));
  const gValue = Math.round(parseInt(g, 16));
  const bValue = Math.round(parseInt(b, 16));

  const sRGB_red = rValue / 255;
  const sRGB_green = gValue / 255;
  const sRGB_blue = bValue / 255;

  const red = sRGB_red <= 0.03928 ? sRGB_red / 12.92 : Math.pow((sRGB_red + 0.055) / 1.055, 2.4);
  const green = sRGB_green <= 0.03928 ? sRGB_green / 12.92 : Math.pow((sRGB_green + 0.055) / 1.055, 2.4);
  const blue = sRGB_blue <= 0.03928 ? sRGB_blue / 12.92 : Math.pow((sRGB_blue + 0.055) / 1.055, 2.4);

  // For the sRGB colorspace, the relative luminance of a color is defined as:
  const luminance =  0.2126 * red + 0.7152 * green + 0.0722 * blue;
  console.log(luminance);

  if(luminance <= 0.5){
    document.documentElement.style.setProperty("--ly--text-color", "#fff");
  }else{
    document.documentElement.style.setProperty("--ly--text-color", "#000");
  }

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
