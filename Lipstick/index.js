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
  blush = 0,
  Eyeliner = 0;
var lipstick_shade;

const state = {
  backend: "wasm",
  maxFaces: 1,
  triangulateMesh: false,
  predictIrises: false,
};

let model,
  tempCanvasctx,
  ctx,
  tempCanvas,
  canvas,
  loading,
  hiddenCtx1,
  hiddenCanvas,
  hiddenCanvas1,
  hiddenCtx;

let stream;

if (window.addEventListener) {
  window.addEventListener("message", handleMessage);
} else {
  window.attachEvent("onmessage", handleMessage);
}

function handleMessage(event) {
  console.log("Received a message from " + event.origin + ".");

  // If the window that sent this message is not http://dev.iframe.com, then
  // that message needs to be thrown out.
  /*  if (event.origin != "http://dev.iframe.com") {
        console.log("The message came from some site we don't know. We're not processing it.");
        return;
      }*/

  // When one window sends a message, or data, to another window via
  // `parent.postMessage()`, the message (the first argument) in the
  // `parent.postMessage()` call is accessible via `event.data` here.
  var dataFromChildIframe = event.data;

  // Log the data to the console.
  console.log(dataFromChildIframe);

  // Show that the data was received.
  /*   $(".status-message").text("Data received! This status message will reset in 5 seconds.");
      if (dataFromChildIframe.user_age == 1) {
        $(".user-data .user-age").html("The user is <strong>" + dataFromChildIframe.user_age + "</strong> year old.");
      } else {
        $(".user-data .user-age").html("The user is <strong>" + dataFromChildIframe.user_age + "</strong> years old.");
      }
      $(".user-data .user-height").html("The user is <strong>" + dataFromChildIframe.user_height + "</strong> inches tall.");
      $(".user-data").slideDown(200, function() {
        setTimeout(function() {
          $(".user-data").slideUp(200);
          $(".status-message").html("Waiting for data from <code>dev.iframe.com</code>...");
        }, 5000);
      });*/

  var product = dataFromChildIframe.product_type;
  var colorcode = dataFromChildIframe.color_code;

  if (product == "Lipstick") {
    Lipstick = 1;
    lipstick_shade = colorcode;
  } else if (product == "Kajal") {
    Kajal = 1;
    kajal_shade = colorcode;
  } else if (product == "EyeShade") {
    EyeShade = 1;
    eyeshade_shade = colorcode;
  } else if (product == "blush") {
    blush = 1;
    blush_shade = colorcode;
  } else if (product == "Eyeliner") {
    Eyeliner = 1;
    eyeliner_shade = colorcode;
  }
}
function update(product, colorcode) {
  console.log("I am called");

  if (product == "Lipstick") {
    Lipstick = 1;
    lipstick_shade = colorcode;
  } else if (product == "Kajal") {
    Kajal = 1;
    kajal_shade = colorcode;
  } else if (product == "EyeShade") {
    EyeShade = 1;
    eyeshade_shade = colorcode;
  } else if (product == "blush") {
    blush = 1;
    blush_shade = colorcode;
  } else if (product == "Eyeliner") {
    Eyeliner = 1;
    eyeliner_shade = colorcode;
  }
}

// async function setupCamera() {
//   video = document.getElementById("videoElement");

//   stream = await navigator.mediaDevices.getUserMedia({
//     audio: false,
//     video: {
//       facingMode: "user",
//       // Only setting the video to a specified size in order to accommodate a
//       // point cloud, so on mobile devices accept the default size.
//       width: VIDEO_WIDTH,
//       height: VIDEO_HEIGHT,
//       // frameRate: { ideal: 5, max: 10 }
//     },
//   });

//   video.srcObject = stream;

//   await video.play();
//   renderPrediction();

//   /* return new Promise((resolve) => {
//     video.onloadedmetadata = () => {
//       resolve(video);
//       video.play();
//       renderPrediction();
//     };
//   });*/
// }

// async function stopCamera() {
//   video.pause();
//   video.src = "";
//   stream.getTracks()[0].stop();
// }

let monitorvalue = 0;
async function renderPrediction() {
  if (model && stream) {
    const loop = async (timestamp) => {
      if (monitorvalue % 1 == 0) {
        // console.log ("Start captureImage")
        const image = captureImage();
        // console.log ("Start longCalculation")

        const result = await longCalculation(image);
      }

      monitorvalue = monitorvalue + 1;
      // console.log (monitorvalue)
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
  tempCanvasctx.drawImage(video, sx, sy, 300, 400, 0, 0, 300, 400);
  let image = tempCanvasctx.getImageData(0, 0, 300, 400);
  return image;
}
async function longCalculation(image) {
  try {
    //alert(stream.active);
    //alert(stream.readyState);
    const predictions = await model.estimateFaces({
      input: image,
      returnTensors: false,
      flipHorizontal: false,
      predictIrises: state.predictIrises,
    });

    if (predictions.length > 0) {
      // console.log(mesh);
      predictions.forEach((prediction) => {
        const keypoints = prediction.scaledMesh;

        hiddenCtx1.clearRect(0, 0, canvas.width, canvas.height);

        if (Kajal == 1) {
          hiddenCtx1.globalAlpha = 0.7;
          hiddenCtx1.strokeStyle = "#000000";
          hiddenCtx1.fillStyle = "#000000";
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
          hiddenCtx1.strokeStyle = "#000000";
          hiddenCtx1.fillStyle = "#000000";
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
          hiddenCtx1.strokeStyle = lipstick_shade;
          hiddenCtx1.fillStyle = lipstick_shade;
          hiddenCtx1.filter = "blur(1px)";
          //  hiddenCanvas1.style.webkitFilter = "blur(1px)";

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
          hiddenCtx1.strokeStyle = lipstick_shade;
          hiddenCtx1.fillStyle = lipstick_shade;
          hiddenCtx1.filter = "blur(1px)";
          //  hiddenCanvas1.style.webkitFilter = "blur(1px)";

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
          //hiddenCtx1.lineTo(lipsLowerOuter[0][0], lipsLowerOuter[0][1]-1);

          hiddenCtx1.fill();
          hiddenCtx1.stroke();

          hiddenCtx1.closePath();
        }

        //-----------------------------Eyeshade-----------------------------------------
        if (EyeShade == 1) {
          //   console.log(finalcolor);

          //hiddenCtx1.clearRect(0, 0, canvas.width, canvas.height);

          hiddenCtx1.globalAlpha = 0.2;
          hiddenCtx1.strokeStyle = "#d12f58";
          hiddenCtx1.fillStyle = "#d12f58";
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
          hiddenCtx1.strokeStyle = "#d12f58";
          hiddenCtx1.fillStyle = "#d12f58";
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

        if (blush == 1) {
          //   console.log(finalcolor);

          //hiddenCtx1.clearRect(0, 0, canvas.width, canvas.height);

          hiddenCtx1.globalAlpha = 0.1;
          hiddenCtx1.strokeStyle = "#d12f58";
          hiddenCtx1.fillStyle = "#d12f58";
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
          hiddenCtx1.strokeStyle = "#d12f58";
          hiddenCtx1.fillStyle = "#d12f58";
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
          hiddenCtx1.strokeStyle = "#000000";
          hiddenCtx1.fillStyle = "#000000";
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
          hiddenCtx1.strokeStyle = "#000000";
          hiddenCtx1.fillStyle = "#000000";
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

async function main() {
  await tf.setBackend(state.backend);

  model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    { maxFaces: state.maxFaces }
  );

  if (model) console.log("face model loaded");
  else console.log("face model not loaded");

  tempCanvas = document.getElementById("tempCanvas");
  tempCanvasctx = tempCanvas.getContext("2d");

  hiddenCanvas = document.getElementById("hiddenCanvas");
  hiddenCtx = hiddenCanvas.getContext("2d");

  hiddenCanvas1 = document.getElementById("hiddenCanvas1");

  hiddenCtx1 = hiddenCanvas1.getContext("2d");

  /* loading = $(
    '<div style="position:absolute;width:50px;height:50px;background-image:url("images/spinner.gif")"></div>'
  ).appendTo("body");*/

  video = document.getElementById("videoElement");
  /*  video.autoplay = true;
  video.muted= true;
  video.playsinline = true;
  video.style.webkitTransform = "scaleX(-1)";
  video.style.zindex = "-1000";
  video.style.width ="100%";
  video.style.height ="auto";*/

  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: "user",
      // Only setting the video to a specified size in order to accommodate a
      // point cloud, so on mobile devices accept the default size.
      //   width: VIDEO_WIDTH,
      //   height: VIDEO_HEIGHT,
      // frameRate: { ideal: 5, max: 10 }
    },
  });

  video.srcObject = stream;

  await video.play();

  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  document.getElementById("tryon").style.display = "none";
  //video.style.display ="none";

  renderPrediction();
}
document.getElementById("tryon").addEventListener("click", (e) => {
  main();
});

showImage();
