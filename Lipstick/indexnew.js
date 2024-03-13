(function () {
  var a = {};
  var f = /iPhone/i,
    h = /iPod/i,
    i = /iPad/i,
    r = /\biOS-universal(?:.+)Mac\b/i,
    g = /\bAndroid(?:.+)Mobile\b/i,
    j = /Android/i,
    c = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,
    d = /Silk/i,
    b = /Windows Phone/i,
    k = /\bWindows(?:.+)ARM\b/i,
    m = /BlackBerry/i,
    n = /BB10/i,
    o = /Opera Mini/i,
    p = /\b(CriOS|Chrome)(?:.+)Mobile/i,
    q = /Mobile(?:.+)Firefox\b/i;
  function s(l) {
    return function ($) {
      return $.test(l);
    };
  }
  function e(l) {
    var $ = (l =
      l || ("undefined" != typeof navigator ? navigator.userAgent : "")).split(
      "[FBAN"
    );
    void 0 !== $[1] && (l = $[0]),
      void 0 !== ($ = l.split("Twitter"))[1] && (l = $[0]);
    var a = s(l),
      e = {
        apple: {
          phone: a(f) && !a(b),
          ipod: a(h),
          tablet: !a(f) && a(i) && !a(b),
          universal: a(r),
          device: (a(f) || a(h) || a(i)) && !a(b),
        },
        amazon: { phone: a(c), tablet: !a(c) && a(d), device: a(c) || a(d) },
        android: {
          phone: (!a(b) && a(c)) || (!a(b) && a(g)),
          tablet: !a(b) && !a(c) && !a(g) && (a(d) || a(j)),
          device: (!a(b) && (a(c) || a(d) || a(g) || a(j))) || a(/\bokhttp\b/i),
        },
        windows: { phone: a(b), tablet: a(k), device: a(b) || a(k) },
        other: {
          blackberry: a(m),
          blackberry10: a(n),
          opera: a(o),
          firefox: a(q),
          chrome: a(p),
          device: a(m) || a(n) || a(o) || a(q) || a(p),
        },
        any: !1,
        phone: !1,
        tablet: !1,
      };
    return (
      (e.any =
        e.apple.universal ||
        e.apple.device ||
        e.android.device ||
        e.windows.device ||
        e.other.device),
      (e.phone = e.apple.phone || e.android.phone || e.windows.phone),
      (e.tablet = e.apple.tablet || e.android.tablet || e.windows.tablet),
      e
    );
  }
  a = e();
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = a;
  } else if (typeof define === "function" && define.amd) {
    define(function () {
      return a;
    });
  } else {
    this["isMobile"] = a;
  }
})();

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

var Kajal = 0,
  Lipstick = 0,
  EyeShade = 0,
  Blush = 0,
  Eyeliner = 0;
Eyebrows = 0;

var KajalShade;
var LipstickShade;
var EyeShadeShade;
var BlushShade;
var EyelinerShade;
var EyebrowsShade;

const state = {
  backend: "wasm",
  maxFaces: 1,
  triangulateMesh: false,
  predictIrises: false,
};
let model,
  tempCanvasCtx,
  ctx,
  tempCanvas,
  canvas,
  loading,
  hiddenCtx1,
  hiddenCanvas,
  hiddenCanvas1,
  hiddenCtx;

let stream;

var globalProduct = null;
var globalColorCode = null;

window.addEventListener(
  "message",
  (event) => {
    console.log("Received message:", event.data);
    if (event.data.type === "updateProductAndColor") {
      globalProduct = event.data.product;
      globalColorCode = event.data.colorCode;
      console.log("Product and color set:", globalProduct, globalColorCode);
      handleMessage();
    }
  },
  false
);

function handleMessage() {
  console.log("Received a message from " + ".");

  const colorCode = globalColorCode;
  const product = globalProduct;

  console.log("inside the handle message " + colorCode + product);

  // Define a function to toggle the product application
  function toggleProductApplication(productName, productFlag, shade) {
    if (window[productFlag] === 1 && window[shade] === colorCode) {
      // If the product is already applied with the same shade, remove it
      window[productFlag] = 0;
      window[shade] = null; // Or however you want to denote an inactive shade
      console.log(productName + " removed.");
    } else {
      // Apply the new shade and set the product as active
      window[productFlag] = 1;
      window[shade] = colorCode;
      console.log(productName + " applied with color " + colorCode);
    }
  }

  switch (product) {
    case "Lipstick":
      toggleProductApplication("Lipstick", "Lipstick", "LipstickShade");
      break;
    case "Kajal":
      toggleProductApplication("Kajal", "Kajal", "KajalShade");
      break;
    case "EyeShade":
      toggleProductApplication("EyeShade", "EyeShade", "EyeShadeShade");
      break;
    case "blush":
      toggleProductApplication("Blush", "Blush", "BlushShade");
      break;
    case "Eyeliner":
      toggleProductApplication("Eyeliner", "Eyeliner", "EyelinerShade");
      break;
    case "Eyebrows":
      toggleProductApplication("Eyebrows", "Eyebrows", "EyebrowsShade");
    default:
      console.log("Unknown product: " + product);
  }
}

// function update(product, colorCode) {
//   console.log("I am called");
//   console.log(product, "product");
//   console.log(colorCode, "colorcode");
//   switch (product) {
//     case "Lipstick":
//       Lipstick = 1;
//       LipstickShade = colorCode;
//       break;
//     case "Kajal":
//       Kajal = 1;
//       KajalShade = colorCode;
//       break;
//     case "EyeShade":
//       EyeShade = 1;
//       EyeShadeShade = colorCode;
//       break;
//     case "blush":
//       Blush = 1;
//       BlushShade = colorCode;
//       break;
//     case "Eyeliner":
//       Eyeliner = 1;
//       EyelinerShade = colorCode;
//       break;
//   }
// }

handleMessage();
function update(product, colorCode) {
  console.log("I am called");
  console.log(product);
  console.log(colorCode);
  if (product == "Lipstick") {
    Lipstick = 1;
    LipstickShade = colorCode;
  } else if (product == "Kajal") {
    Kajal = 1;
    KajalShade = colorCode;
  } else if (product == "EyeShade") {
    EyeShade = 1;
    EyeShadeShade = colorCode;
  } else if (product == "blush") {
    Blush = 1;
    BlushShade = colorCode;
  } else if (product == "Eyeliner") {
    Eyeliner = 1;
    EyelinerShade = colorCode;
  } else if (product == "Eyebrows") {
    Eyebrows = 1;
    EyebrowsShade = colorCode;
  }
}

let monitorvalue = 0;
async function renderPrediction() {
  if (model && stream) {
    const loop = async (timestamp) => {
      if (monitorvalue % 1 == 0) {
        const image = captureImage();

        const result = await longCalculation(image);
      }

      monitorvalue = monitorvalue + 1;

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}
function captureImage() {
  var sx, sy;
  if (isMobile.apple.phone || isMobile.android.phone) {
    sx = 90;
    sy = 120;
  } else {
    sx = 170;
    sy = 80;
  }
  tempCanvasCtx.drawImage(video, sx, sy, 300, 400, 0, 0, 300, 400);
  let image = tempCanvasCtx.getImageData(0, 0, 300, 400);
  return image;
}
async function longCalculation(image) {
  try {
    const predictions = await model.estimateFaces({
      input: image,
      returnTensors: false,
      flipHorizontal: false,
      predictIrises: state.predictIrises,
    });
    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const keypoints = prediction.scaledMesh;

        hiddenCtx1.clearRect(0, 0, canvas.width, canvas.height);
        if (Kajal == 1) {
          hiddenCtx1.globalAlpha = 0.7;
          hiddenCtx1.strokeStyle = KajalShade;
          hiddenCtx1.fillStyle = KajalShade;
          hiddenCtx1.filter = "blur(1px)";

          hiddenCtx1.lineWidth = -1;
          hiddenCtx1.beginPath();
          hiddenCtx1.moveTo(keypoints[362][0], keypoints[362][1]);
          hiddenCtx1.lineTo(keypoints[382][0], keypoints[382][1]);
          hiddenCtx1.lineTo(keypoints[381][0], keypoints[381][1]);
          hiddenCtx1.lineTo(keypoints[380][0], keypoints[380][1]);
          hiddenCtx1.lineTo(keypoints[374][0], keypoints[374][1]);
          hiddenCtx1.lineTo(keypoints[373][0], keypoints[373][1]);
          hiddenCtx1.lineTo(keypoints[390][0], keypoints[390][1]);
          hiddenCtx1.lineTo(keypoints[249][0], keypoints[249][1]);
          hiddenCtx1.lineTo(keypoints[390][0], keypoints[390][1]);
          hiddenCtx1.lineTo(keypoints[373][0], keypoints[373][1]);
          hiddenCtx1.lineTo(keypoints[374][0], keypoints[374][1]);
          hiddenCtx1.lineTo(keypoints[380][0], keypoints[380][1]);
          hiddenCtx1.lineTo(keypoints[381][0], keypoints[381][1]);
          hiddenCtx1.lineTo(keypoints[382][0], keypoints[382][1]);
          hiddenCtx1.lineTo(keypoints[362][0], keypoints[362][1]);
          hiddenCtx1.fill();
          hiddenCtx1.stroke();

          hiddenCtx1.closePath();

          hiddenCtx1.globalAlpha = 0.7;
          hiddenCtx1.strokeStyle = KajalShade;
          hiddenCtx1.fillStyle = KajalShade;
          hiddenCtx1.filter = "blur(1px)";

          hiddenCtx1.lineWidth = -1;
          hiddenCtx1.beginPath();
          hiddenCtx1.moveTo(keypoints[133][0], keypoints[133][1]);
          hiddenCtx1.lineTo(keypoints[155][0], keypoints[155][1]);
          hiddenCtx1.lineTo(keypoints[154][0], keypoints[154][1]);
          hiddenCtx1.lineTo(keypoints[153][0], keypoints[153][1]);
          hiddenCtx1.lineTo(keypoints[145][0], keypoints[145][1]);
          hiddenCtx1.lineTo(keypoints[144][0], keypoints[144][1]);
          hiddenCtx1.lineTo(keypoints[163][0], keypoints[163][1]);
          hiddenCtx1.lineTo(keypoints[7][0], keypoints[7][1]);
          hiddenCtx1.lineTo(keypoints[33][0], keypoints[33][1]);
          hiddenCtx1.lineTo(keypoints[7][0], keypoints[7][1]);
          hiddenCtx1.lineTo(keypoints[163][0], keypoints[163][1]);
          hiddenCtx1.lineTo(keypoints[144][0], keypoints[144][1]);
          hiddenCtx1.lineTo(keypoints[145][0], keypoints[145][1]);
          hiddenCtx1.lineTo(keypoints[153][0], keypoints[153][1]);
          hiddenCtx1.lineTo(keypoints[154][0], keypoints[154][1]);
          hiddenCtx1.lineTo(keypoints[155][0], keypoints[155][1]);

          hiddenCtx1.fill();
          hiddenCtx1.stroke();

          hiddenCtx1.closePath();
        }
        if (Lipstick == 1) {
          const lipsUpperOuter = prediction.annotations.lipsUpperOuter;
          const lipsUpperInner = prediction.annotations.lipsUpperInner;
          const lipsLowerOuter = prediction.annotations.lipsLowerOuter;
          const lipsLowerInner = prediction.annotations.lipsLowerInner;
          hiddenCtx1.globalAlpha = 0.6;
          hiddenCtx1.strokeStyle = LipstickShade;
          hiddenCtx1.fillStyle = LipstickShade;
          hiddenCtx1.filter = "blur(1px)";

          hiddenCtx1.lineWidth = 0;
          hiddenCtx1.beginPath();
          hiddenCtx1.moveTo(lipsUpperOuter[0][0], lipsUpperOuter[0][1]);
          hiddenCtx1.lineTo(lipsUpperOuter[1][0], lipsUpperOuter[1][1]);
          hiddenCtx1.lineTo(lipsUpperOuter[2][0], lipsUpperOuter[2][1]);
          hiddenCtx1.lineTo(lipsUpperOuter[3][0], lipsUpperOuter[3][1]);
          hiddenCtx1.lineTo(lipsUpperOuter[4][0], lipsUpperOuter[4][1]);
          hiddenCtx1.lineTo(lipsUpperOuter[5][0], lipsUpperOuter[5][1] + 3);
          hiddenCtx1.lineTo(lipsUpperOuter[6][0], lipsUpperOuter[6][1]);
          hiddenCtx1.lineTo(lipsUpperOuter[7][0], lipsUpperOuter[7][1]);
          hiddenCtx1.lineTo(lipsUpperOuter[8][0], lipsUpperOuter[8][1]);
          hiddenCtx1.lineTo(lipsUpperOuter[9][0], lipsUpperOuter[9][1]);
          hiddenCtx1.lineTo(lipsUpperOuter[10][0], lipsUpperOuter[10][1]);

          hiddenCtx1.lineTo(lipsUpperInner[10][0], lipsUpperInner[10][1] + 2);
          hiddenCtx1.lineTo(lipsUpperInner[9][0], lipsUpperInner[9][1] + 2);
          hiddenCtx1.lineTo(lipsUpperInner[8][0], lipsUpperInner[8][1] + 2);
          hiddenCtx1.lineTo(lipsUpperInner[7][0], lipsUpperInner[7][1] + 2);
          hiddenCtx1.lineTo(lipsUpperInner[6][0], lipsUpperInner[6][1] + 2);
          hiddenCtx1.lineTo(lipsUpperInner[5][0], lipsUpperInner[5][1] + 2);
          hiddenCtx1.lineTo(lipsUpperInner[4][0], lipsUpperInner[4][1] + 2);
          hiddenCtx1.lineTo(lipsUpperInner[3][0], lipsUpperInner[3][1] + 2);
          hiddenCtx1.lineTo(lipsUpperInner[2][0], lipsUpperInner[2][1] + 2);
          hiddenCtx1.lineTo(lipsUpperInner[1][0], lipsUpperInner[1][1] + 2);
          hiddenCtx1.lineTo(lipsUpperInner[0][0], lipsUpperInner[0][1] + 2);
          hiddenCtx1.lineTo(lipsUpperOuter[0][0], lipsUpperOuter[0][1]);

          hiddenCtx1.fill();
          hiddenCtx1.stroke();

          hiddenCtx1.closePath();

          hiddenCtx1.globalAlpha = 0.6;
          hiddenCtx1.strokeStyle = LipstickShade;
          hiddenCtx1.fillStyle = LipstickShade;
          hiddenCtx1.filter = "blur(1px)";

          hiddenCtx1.lineWidth = 0;
          hiddenCtx1.beginPath();
          hiddenCtx1.moveTo(lipsLowerOuter[0][0], lipsLowerOuter[0][1]);
          hiddenCtx1.lineTo(lipsLowerOuter[1][0], lipsLowerOuter[1][1]);
          hiddenCtx1.lineTo(lipsLowerOuter[2][0], lipsLowerOuter[2][1]);
          hiddenCtx1.lineTo(lipsLowerOuter[3][0], lipsLowerOuter[3][1]);
          hiddenCtx1.lineTo(lipsLowerOuter[4][0], lipsLowerOuter[4][1]);
          hiddenCtx1.lineTo(lipsLowerOuter[5][0], lipsLowerOuter[5][1]);
          hiddenCtx1.lineTo(lipsLowerOuter[6][0], lipsLowerOuter[6][1]);
          hiddenCtx1.lineTo(lipsLowerOuter[7][0], lipsLowerOuter[7][1]);
          hiddenCtx1.lineTo(lipsLowerOuter[8][0], lipsLowerOuter[8][1]);
          hiddenCtx1.lineTo(lipsLowerOuter[9][0], lipsLowerOuter[9][1]);

          hiddenCtx1.lineTo(lipsLowerInner[10][0], lipsLowerInner[10][1] - 1);
          hiddenCtx1.lineTo(lipsLowerInner[9][0], lipsLowerInner[9][1] - 1);
          hiddenCtx1.lineTo(lipsLowerInner[8][0], lipsLowerInner[8][1] - 1);
          hiddenCtx1.lineTo(lipsLowerInner[7][0], lipsLowerInner[7][1] - 1);
          hiddenCtx1.lineTo(lipsLowerInner[6][0], lipsLowerInner[6][1] - 1);
          hiddenCtx1.lineTo(lipsLowerInner[5][0], lipsLowerInner[5][1] - 1);
          hiddenCtx1.lineTo(lipsLowerInner[4][0], lipsLowerInner[4][1] - 1);
          hiddenCtx1.lineTo(lipsLowerInner[3][0], lipsLowerInner[3][1] - 1);
          hiddenCtx1.lineTo(lipsLowerInner[2][0], lipsLowerInner[2][1] - 1);
          hiddenCtx1.lineTo(lipsLowerInner[1][0], lipsLowerInner[1][1] - 1);
          hiddenCtx1.lineTo(lipsLowerInner[0][0], lipsLowerInner[0][1] - 1);
          hiddenCtx1.lineTo(lipsUpperOuter[0][0], lipsUpperOuter[0][1] - 1);

          hiddenCtx1.fill();
          hiddenCtx1.stroke();

          hiddenCtx1.closePath();
        }
        if (EyeShade == 1) {
          hiddenCtx1.globalAlpha = 0.2;
          hiddenCtx1.strokeStyle = EyeShadeShade;
          hiddenCtx1.fillStyle = EyeShadeShade;
          hiddenCtx1.filter = "blur(3px)";

          hiddenCtx1.lineWidth = -1;
          hiddenCtx1.beginPath();
          hiddenCtx1.moveTo(keypoints[33][0], keypoints[33][1]);
          hiddenCtx1.lineTo(keypoints[247][0], keypoints[247][1]);
          hiddenCtx1.lineTo(keypoints[225][0], keypoints[225][1]);
          hiddenCtx1.lineTo(keypoints[224][0], keypoints[224][1]);
          hiddenCtx1.lineTo(keypoints[223][0], keypoints[223][1]);
          hiddenCtx1.lineTo(keypoints[222][0], keypoints[222][1]);
          hiddenCtx1.lineTo(keypoints[56][0], keypoints[56][1]);
          hiddenCtx1.lineTo(keypoints[157][0], keypoints[157][1]);
          hiddenCtx1.lineTo(keypoints[158][0], keypoints[158][1]);
          hiddenCtx1.lineTo(keypoints[159][0], keypoints[159][1]);
          hiddenCtx1.lineTo(keypoints[160][0], keypoints[160][1]);
          hiddenCtx1.lineTo(keypoints[160][0], keypoints[160][1]);
          hiddenCtx1.lineTo(keypoints[246][0], keypoints[246][1]);
          hiddenCtx1.fill();
          hiddenCtx1.stroke();

          hiddenCtx1.closePath();

          hiddenCtx1.globalAlpha = 0.2;
          hiddenCtx1.strokeStyle = EyeShadeShade;
          hiddenCtx1.fillStyle = EyeShadeShade;
          hiddenCtx1.filter = "blur(3px)";

          hiddenCtx1.lineWidth = -1;
          hiddenCtx1.beginPath();
          hiddenCtx1.moveTo(keypoints[263][0], keypoints[263][1]);
          hiddenCtx1.lineTo(keypoints[467][0], keypoints[467][1]);
          hiddenCtx1.lineTo(keypoints[445][0], keypoints[445][1]);
          hiddenCtx1.lineTo(keypoints[444][0], keypoints[444][1]);
          hiddenCtx1.lineTo(keypoints[443][0], keypoints[443][1]);
          hiddenCtx1.lineTo(keypoints[442][0], keypoints[442][1]);
          hiddenCtx1.lineTo(keypoints[441][0], keypoints[441][1]);
          hiddenCtx1.lineTo(keypoints[286][0], keypoints[286][1]);
          hiddenCtx1.lineTo(keypoints[384][0], keypoints[384][1]);
          hiddenCtx1.lineTo(keypoints[385][0], keypoints[385][1]);
          hiddenCtx1.lineTo(keypoints[386][0], keypoints[386][1]);
          hiddenCtx1.lineTo(keypoints[387][0], keypoints[387][1]);
          hiddenCtx1.lineTo(keypoints[388][0], keypoints[388][1]);

          hiddenCtx1.fill();
          hiddenCtx1.stroke();

          hiddenCtx1.closePath();
        }
        if (Blush == 1) {
          hiddenCtx1.globalAlpha = 0.1;
          hiddenCtx1.strokeStyle = BlushShade;
          hiddenCtx1.fillStyle = BlushShade;
          hiddenCtx1.filter = "blur(3px)";

          hiddenCtx1.lineWidth = -1;
          hiddenCtx1.beginPath();
          hiddenCtx1.moveTo(keypoints[330][0], keypoints[330][1]);
          hiddenCtx1.lineTo(keypoints[347][0], keypoints[347][1]);
          hiddenCtx1.lineTo(keypoints[346][0], keypoints[346][1]);
          hiddenCtx1.lineTo(keypoints[352][0], keypoints[352][1]);
          hiddenCtx1.lineTo(keypoints[411][0], keypoints[411][1]);
          hiddenCtx1.lineTo(keypoints[425][0], keypoints[425][1]);

          hiddenCtx1.fill();
          hiddenCtx1.stroke();

          hiddenCtx1.closePath();

          hiddenCtx1.globalAlpha = 0.1;
          hiddenCtx1.strokeStyle = BlushShade;
          hiddenCtx1.fillStyle = BlushShade;
          hiddenCtx1.filter = "blur(3px)";

          hiddenCtx1.lineWidth = -1;
          hiddenCtx1.beginPath();
          hiddenCtx1.moveTo(keypoints[187][0], keypoints[187][1]);
          hiddenCtx1.lineTo(keypoints[123][0], keypoints[123][1]);
          hiddenCtx1.lineTo(keypoints[117][0], keypoints[117][1]);
          hiddenCtx1.lineTo(keypoints[118][0], keypoints[118][1]);
          hiddenCtx1.lineTo(keypoints[101][0], keypoints[101][1]);
          hiddenCtx1.lineTo(keypoints[205][0], keypoints[205][1]);

          hiddenCtx1.fill();
          hiddenCtx1.stroke();

          hiddenCtx1.closePath();
        }
        if (Eyeliner == 1) {
          hiddenCtx1.globalAlpha = 0.7;
          hiddenCtx1.strokeStyle = EyelinerShade;
          hiddenCtx1.fillStyle = EyelinerShade;
          hiddenCtx1.filter = "blur(1px)";

          hiddenCtx1.lineWidth = 1;
          hiddenCtx1.beginPath();
          hiddenCtx1.moveTo(keypoints[133][0], keypoints[133][1]);
          hiddenCtx1.lineTo(keypoints[243][0], keypoints[243][1]);
          hiddenCtx1.lineTo(keypoints[56][0], keypoints[56][1] + 4);
          hiddenCtx1.lineTo(keypoints[28][0], keypoints[28][1] + 4);
          hiddenCtx1.lineTo(keypoints[27][0], keypoints[27][1] + 4);
          hiddenCtx1.lineTo(keypoints[29][0], keypoints[29][1] + 4);
          hiddenCtx1.lineTo(keypoints[30][0], keypoints[30][1] + 4);
          hiddenCtx1.lineTo(keypoints[247][0], keypoints[247][1] + 4);
          hiddenCtx1.lineTo(keypoints[7][0], keypoints[7][1]);
          hiddenCtx1.lineTo(keypoints[33][0], keypoints[33][1]);
          hiddenCtx1.lineTo(keypoints[246][0], keypoints[246][1]);
          hiddenCtx1.lineTo(keypoints[161][0], keypoints[161][1]);
          hiddenCtx1.lineTo(keypoints[160][0], keypoints[160][1]);
          hiddenCtx1.lineTo(keypoints[159][0], keypoints[159][1]);
          hiddenCtx1.lineTo(keypoints[158][0], keypoints[158][1]);
          hiddenCtx1.lineTo(keypoints[157][0], keypoints[157][1]);
          hiddenCtx1.lineTo(keypoints[173][0], keypoints[173][1]);
          hiddenCtx1.fill();
          hiddenCtx1.stroke();

          hiddenCtx1.closePath();

          hiddenCtx1.globalAlpha = 0.7;
          hiddenCtx1.strokeStyle = EyelinerShade;
          hiddenCtx1.fillStyle = EyelinerShade;
          hiddenCtx1.filter = "blur(1px)";

          hiddenCtx1.lineWidth = -1;
          hiddenCtx1.beginPath();
          hiddenCtx1.moveTo(keypoints[362][0], keypoints[362][1]);
          hiddenCtx1.lineTo(keypoints[463][0], keypoints[463][1]);
          hiddenCtx1.lineTo(keypoints[414][0], keypoints[414][1] + 4);
          hiddenCtx1.lineTo(keypoints[286][0], keypoints[286][1] + 4);
          hiddenCtx1.lineTo(keypoints[258][0], keypoints[258][1] + 4);
          hiddenCtx1.lineTo(keypoints[257][0], keypoints[257][1] + 4);
          hiddenCtx1.lineTo(keypoints[259][0], keypoints[259][1] + 4);
          hiddenCtx1.lineTo(keypoints[260][0], keypoints[260][1] + 4);
          hiddenCtx1.lineTo(keypoints[467][0], keypoints[467][1] + 4);
          hiddenCtx1.lineTo(keypoints[263][0], keypoints[263][1]);
          hiddenCtx1.lineTo(keypoints[466][0], keypoints[466][1]);
          hiddenCtx1.lineTo(keypoints[388][0], keypoints[388][1]);
          hiddenCtx1.lineTo(keypoints[387][0], keypoints[387][1]);
          hiddenCtx1.lineTo(keypoints[386][0], keypoints[386][1]);
          hiddenCtx1.lineTo(keypoints[385][0], keypoints[385][1]);
          hiddenCtx1.lineTo(keypoints[384][0], keypoints[384][1]);
          hiddenCtx1.lineTo(keypoints[398][0], keypoints[398][1]);

          hiddenCtx1.fill();
          hiddenCtx1.stroke();

          hiddenCtx1.closePath();
        }
        if (Eyebrows == 1) {
          hiddenCtx1.globalAlpha = 0.3;
          hiddenCtx1.strokeStyle = EyebrowsShade;
          hiddenCtx1.fillStyle = EyebrowsShade;
          hiddenCtx1.filter = "blur(3px)";

          hiddenCtx1.lineWidth = -1;
          hiddenCtx1.beginPath();
          hiddenCtx1.moveTo(keypoints[55][0], keypoints[55][1]);
          hiddenCtx1.lineTo(keypoints[65][0], keypoints[65][1]);
          hiddenCtx1.lineTo(keypoints[52][0], keypoints[53][1]);
          hiddenCtx1.lineTo(keypoints[46][0], keypoints[46][1]);
          hiddenCtx1.lineTo(keypoints[139][0], keypoints[139][1]);
          hiddenCtx1.lineTo(keypoints[63][0], keypoints[63][1] + 5);
          hiddenCtx1.lineTo(keypoints[105][0], keypoints[105][1] + 4);
          hiddenCtx1.lineTo(keypoints[66][0], keypoints[66][1] + 3);
          hiddenCtx1.lineTo(keypoints[107][0], keypoints[107][1] + 7);
          hiddenCtx1.lineTo(keypoints[55][0], keypoints[55][1]);

          hiddenCtx1.fill();
          hiddenCtx1.stroke();

          hiddenCtx1.closePath();

          hiddenCtx1.lineWidth = -1;
          hiddenCtx1.beginPath();
          hiddenCtx1.moveTo(keypoints[336][0], keypoints[336][1] + 3);
          hiddenCtx1.lineTo(keypoints[296][0], keypoints[296][1]);
          hiddenCtx1.lineTo(keypoints[334][0], keypoints[334][1]);
          hiddenCtx1.lineTo(keypoints[293][0], keypoints[293][1]);
          hiddenCtx1.lineTo(keypoints[300][0], keypoints[300][1] - 1);
          hiddenCtx1.lineTo(keypoints[368][0], keypoints[368][1]);
          hiddenCtx1.lineTo(keypoints[276][0], keypoints[276][1] - 4);
          hiddenCtx1.lineTo(keypoints[283][0], keypoints[283][1]);
          hiddenCtx1.lineTo(keypoints[282][0], keypoints[282][1] - 1);
          hiddenCtx1.lineTo(keypoints[295][0], keypoints[295][1] - 2);
          hiddenCtx1.lineTo(keypoints[285][0], keypoints[285][1] - 3);
          hiddenCtx1.lineTo(keypoints[336][0], keypoints[336][1] + 3);

          hiddenCtx1.fill();
          hiddenCtx1.stroke();

          hiddenCtx1.closePath();
        }

        if (isMobile.apple.phone || isSafari) {
          var idata = Filters.convolute(
            hiddenCtx1.getImageData(
              0,
              0,
              hiddenCanvas1.width,
              hiddenCanvas1.height
            ),
            [
              1 / 256,
              4 / 256,
              6 / 256,
              4 / 256,
              1 / 256,
              4 / 256,
              16 / 256,
              24 / 256,
              16 / 256,
              4 / 256,
              6 / 256,
              24 / 256,
              36 / 256,
              24 / 256,
              6 / 256,
              4 / 256,
              16 / 256,
              24 / 256,
              16 / 256,
              4 / 256,
              1 / 256,
              4 / 256,
              6 / 256,
              4 / 256,
              1 / 256,
            ]
          );

          hiddenCtx1.putImageData(idata, 0, 0);
        }

        ctx.save();
        hiddenCtx.clearRect(0, 0, canvas.width, canvas.height);
        hiddenCtx.drawImage(tempCanvas, 0, 0);
        hiddenCtx.globalCompositeOperation = "multiply";

        hiddenCtx.drawImage(hiddenCanvas1, 0, 0);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(hiddenCanvas, 0, 0);
        ctx.restore();
      });
    }
  } catch (e) {
    console.log(e);
  }
}
async function showImage() {
  canvas = document.getElementById("output");
  image = document.getElementById("image");
  ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
}

// async function main() {
//   await tf.setBackend(state.backend);

//   model = await faceLandmarksDetection.load(
//     faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
//     { maxFaces: state.maxFaces }
//   );

//   if (model) console.log("face model loaded");
//   else console.log("face model not loaded");

//   tempCanvas = document.getElementById("tempCanvas");
//   tempCanvasCtx = tempCanvas.getContext("2d");

//   hiddenCanvas = document.getElementById("hiddenCanvas");
//   hiddenCtx = hiddenCanvas.getContext("2d");

//   hiddenCanvas1 = document.getElementById("hiddenCanvas1");

//   hiddenCtx1 = hiddenCanvas1.getContext("2d");

//   video = document.getElementById("videoElement");

//   stream = await navigator.mediaDevices.getUserMedia({
//     audio: false,
//     video: {
//       facingMode: "user",
//     },
//   });

//   video.srcObject = stream;

//   await video.play();

//   ctx.translate(canvas.width, 0);
//   ctx.scale(-1, 1);
//   document.getElementById("tryon").style.display = "none";

//   renderPrediction();
// }
async function main() {
  try {
    await tf.setBackend(state.backend);

    model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
      { maxFaces: state.maxFaces }
    );
    console.log(model ? "face model loaded" : "face model not loaded");

    tempCanvas = document.getElementById("tempCanvas");
    tempCanvasCtx = tempCanvas.getContext("2d");

    hiddenCanvas = document.getElementById("hiddenCanvas");
    hiddenCtx = hiddenCanvas.getContext("2d");

    hiddenCanvas1 = document.getElementById("hiddenCanvas1");
    hiddenCtx1 = hiddenCanvas1.getContext("2d");

    video = document.getElementById("videoElement");
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: "user" },
      });
      video.srcObject = stream;
    } catch (err) {
      console.error("Error accessing video stream: ", err);
      return; // Exit the function if stream is not available.
    }

    video.onloadedmetadata = () => {
      video.play().catch((e) => console.error("Error playing video: ", e));
    };

    ctx = canvas.getContext("2d");
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    document.getElementById("tryon").style.display = "none";

    renderPrediction();
  } catch (e) {
    console.error("Error in main function: ", e);
  }
}

document.getElementById("tryon").addEventListener("click", (e) => {
  main();
});

showImage();
