/* Klokr – hjärnan och den levande bakgrunden (samma spårning som appen, viewBox 220×200). */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";

  var OUTLINE = "20.4,35.7 0.2,82.7 18.4,123.1 52.7,130.3 57.8,147.1 84.4,160.0 111.3,154.5 142.4,195.1 161.7,195.1 154.4,173.1 184.4,163.7 202.6,137.1 219.7,101.7 214.8,77.9 201.2,46.7 172.0,17.3 140.4,4.5 115.5,0.2 68.6,3.7";

  // [färg, punkter]
  var FACETS = [
    ["#2F6BFF", "105.7,5.5 72.1,8.0 77.1,27.1 104.7,7.6"],
    ["#93C5FD", "135.3,8.8 118.1,5.3 115.5,6.1 111.8,31.7 118.3,37.9 119.6,37.9 119.8,32.6"],
    ["#60A5FA", "111.3,8.0 79.6,30.9 96.2,58.7 118.0,43.9 107.8,32.6"],
    ["#3B82F6", "140.6,10.1 148.1,53.7 164.0,46.7 164.2,45.0 146.9,31.1 164.5,21.3 165.2,19.4"],
    ["#2F6BFF", "68.3,10.5 66.6,10.3 27.3,36.7 26.6,38.7 41.9,45.4 72.8,30.7 73.9,28.6"],
    ["#60A5FA", "139.2,10.5 123.5,33.6 123.5,41.0 126.1,42.0 126.3,43.7 147.1,53.5 140.7,11.3"],
    ["#4FE3FF", "154.2,31.1 154.5,32.9 168.8,44.4 193.1,46.4 170.8,22.6"],
    ["#93C5FD", "73.3,35.1 43.4,48.5 49.4,81.8 65.5,68.6"],
    ["#2F6BFF", "77.1,37.4 69.6,69.0 94.4,93.1 94.2,62.5 78.6,37.6"],
    ["#4FE3FF", "39.4,49.0 22.6,41.4 6.6,80.1 41.4,60.3"],
    ["#7C5CF6", "172.0,48.5 171.5,50.8 189.3,78.1 191.6,79.4 196.6,50.3"],
    ["#60A5FA", "167.7,48.9 149.5,57.8 148.7,87.7 171.1,103.9 169.2,49.5"],
    ["#2F6BFF", "169.2,48.9 171.0,101.5 172.5,103.0 191.3,83.1 191.3,80.6 170.5,48.9"],
    ["#93C5FD", "199.7,57.5 195.6,82.7 213.4,94.5 210.9,80.6 201.2,57.8"],
    ["#38BDF8", "41.7,60.8 7.3,80.3 6.8,82.1 36.4,95.7 45.7,86.4"],
    ["#1D4ED8", "67.6,72.4 49.0,88.1 40.5,98.0 70.6,107.5"],
    ["#2F6BFF", "67.8,73.4 70.6,107.3 92.2,98.5 79.1,83.6"],
    ["#2563EB", "193.7,86.7 198.7,130.9 200.2,131.8 214.4,100.7"],
    ["#38BDF8", "7.5,87.1 20.3,116.3 21.8,116.3 32.9,98.9"],
    ["#3B82F6", "192.4,87.1 173.3,107.5 170.3,126.8 198.1,133.6 198.9,130.8 193.7,87.1"],
    ["#60A5FA", "168.2,107.0 146.7,91.7 129.9,119.3 168.2,108.5"],
    ["#4FE3FF", "140.9,92.7 107.5,103.0 107.5,104.4 126.5,116.8"],
    ["#6D8CFF", "96.7,101.2 72.6,111.2 86.2,130.3 87.7,130.1 99.5,103.2"],
    ["#1D4ED8", "24.8,119.8 54.7,125.6 66.5,110.8 41.5,102.0 36.4,101.5"],
    ["#4FE3FF", "123.6,120.1 102.7,106.3 91.9,130.9 123.3,121.6"],
    ["#5B7CFA", "168.5,108.7 131.1,119.1 130.4,120.8 165.8,126.6"],
    ["#38BDF8", "72.6,112.3 70.8,112.7 57.3,127.8 61.0,141.9 86.1,131.3"],
    ["#1D4ED8", "129.6,120.8 134.4,141.9 163.2,127.9 162.5,126.5"],
    ["#2F6BFF", "124.5,121.5 92.4,130.9 92.2,132.6 113.7,149.2"],
    ["#2563EB", "125.3,124.3 123.8,124.6 114.3,148.4 130.4,144.1"],
    ["#38BDF8", "169.5,131.1 180.6,158.9 182.1,158.9 196.2,137.1"],
    ["#1D4ED8", "169.7,132.4 166.8,134.4 155.0,167.8 180.8,160.2"],
    ["#60A5FA", "163.2,132.8 136.8,145.4 149.9,166.0 151.2,166.0"],
    ["#2563EB", "65.3,144.4 65.3,145.7 85.4,155.4 107.2,150.9 106.8,149.2 89.6,134.9"],
    ["#7C5CF6", "116.3,152.4 133.9,176.8 138.4,180.8 131.8,147.9"],
    ["#1D4ED8", "138.9,158.2 145.4,190.4 154.9,190.4 148.5,170.0 140.4,158.4"]
  ];

  // Kärnan följer hålet i facetterna, samma punkter som appen (BrainData.core/coreInner).
  var CORE_X = 120.9, CORE_Y = 73.6;
  var CORE = "143.7,58.8 121.3,47.9 100.3,63.0 99.8,95.8 104.9,98.5 142.7,86.3";
  var CORE_INNER = "133.3,65.5 121.1,59.6 109.7,67.8 109.4,85.6 112.2,87.1 132.7,80.5";

  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  var uid = 0;

  /* Hela hjärnan med facetter, glimtar och kärna. small = bara silhuett, facetter och kärna (logga). */
  function brain(small) {
    var id = "b" + (uid++);
    var svg = el("svg", { viewBox: "-4 -4 228 204", "aria-hidden": "true", focusable: "false" });
    var defs = el("defs", {}, svg);
    var rg = el("radialGradient", { id: id + "c", gradientUnits: "userSpaceOnUse", cx: CORE_X, cy: CORE_Y - 3, r: 32 }, defs);
    var gw = el("radialGradient", { id: id + "w", gradientUnits: "userSpaceOnUse", cx: CORE_X, cy: CORE_Y, r: 34 }, defs);
    el("stop", { offset: "0", "stop-color": "#FF8A1F", "stop-opacity": ".75" }, gw);
    el("stop", { offset: ".5", "stop-color": "#FF8A1F", "stop-opacity": ".3" }, gw);
    el("stop", { offset: "1", "stop-color": "#FF8A1F", "stop-opacity": "0" }, gw);
    el("stop", { offset: "0", "stop-color": "#FFD36B" }, rg);
    el("stop", { offset: ".55", "stop-color": "#FF8A1F" }, rg);
    el("stop", { offset: "1", "stop-color": "#E85D04" }, rg);
    if (!small) {
      var f = el("filter", { id: id + "g", x: "-50%", y: "-50%", width: "200%", height: "200%" }, defs);
      el("feGaussianBlur", { stdDeviation: "2", result: "b" }, f);
      var m = el("feMerge", {}, f);
      el("feMergeNode", { in: "b" }, m);
      el("feMergeNode", { in: "SourceGraphic" }, m);
    }
    el("path", { class: "sil", d: "M" + OUTLINE.split(" ").join(" L") + "Z" }, svg);
    var g = el("g", {}, svg);
    FACETS.forEach(function (fc, i) {
      var p = el("polygon", { class: small ? "" : "facet", points: fc[1], fill: fc[0] }, g);
      if (small) { p.setAttribute("stroke", "rgba(255,255,255,.45)"); p.setAttribute("stroke-width", "2"); p.setAttribute("stroke-linejoin", "round"); }
      else p.style.animationDelay = (-((i * 2.37) % 7)).toFixed(2) + "s";
    });
    if (!small) {
      var gl = el("g", {}, svg);
      FACETS.forEach(function (fc, i) {
        var p = el("polygon", { class: "glint", points: fc[1] }, gl);
        p.style.animationDelay = (-((i * 1.37) % 6)).toFixed(2) + "s";
      });
    }
    if (!small) el("circle", { class: "core-glow", cx: CORE_X, cy: CORE_Y, r: 34, fill: "url(#" + id + "w)" }, svg);
    el("polygon", { class: small ? "" : "core", points: CORE, fill: "url(#" + id + "c)", stroke: "rgba(255,255,255,.8)", "stroke-width": "1.5", "stroke-linejoin": "round" }, svg);
    el("polygon", { points: CORE_INNER, fill: "rgba(255,255,255,.22)", filter: small ? "" : "url(#" + id + "g)" }, svg);
    return svg;
  }

  function filaments(host) {
    var svg = el("svg", { class: "filaments", viewBox: "0 0 510 964", preserveAspectRatio: "xMidYMid slice", "aria-hidden": "true" });
    var defs = el("defs", {}, svg);
    var lg = el("linearGradient", { id: "fil-grad", x1: "0", y1: "0", x2: "1", y2: "1" }, defs);
    el("stop", { offset: "0", "stop-color": "#4FE3FF" }, lg);
    el("stop", { offset: "1", "stop-color": "#8B5CF6" }, lg);
    var f = el("filter", { id: "fil-glow", x: "-50%", y: "-50%", width: "200%", height: "200%" }, defs);
    el("feGaussianBlur", { stdDeviation: "2.5", result: "b" }, f);
    var m = el("feMerge", {}, f);
    el("feMergeNode", { in: "b" }, m);
    el("feMergeNode", { in: "SourceGraphic" }, m);
    var paths = [
      ["M-20 150 C 120 60, 200 240, 330 150 S 520 40, 560 120", "9s", "-2s"],
      ["M-30 560 C 90 460, 160 680, 290 580 S 470 470, 560 560", "11s", "-5.5s"],
      ["M-20 840 C 110 740, 230 920, 360 810 S 500 720, 560 780", "13s", "-8s"]
    ];
    var nodes = [[0, "26s", "-0s", 3.2], [0, "34s", "-15s", 2.4], [1, "30s", "-9s", 3.2], [2, "28s", "-4s", 3]];
    paths.forEach(function (p, i) {
      el("path", { id: "fil-p" + i, class: "line", d: p[0] }, svg);
      var pl = el("path", { class: "pulse", d: p[0] }, svg);
      pl.style.animationDuration = p[1];
      pl.style.animationDelay = p[2];
    });
    nodes.forEach(function (n) {
      var c = el("circle", { class: "node", r: n[3] }, svg);
      var a = el("animateMotion", { dur: n[1], begin: n[2], repeatCount: "indefinite" }, c);
      var mp = el("mpath", {}, a);
      mp.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#fil-p" + n[0]);
      mp.setAttribute("href", "#fil-p" + n[0]);
    });
    host.appendChild(svg);
  }

  function init() {
    var bg = document.querySelector(".bg");
    if (bg && !bg.classList.contains("calm")) filaments(bg);
    document.querySelectorAll("[data-brain]").forEach(function (host) {
      var svg = brain(false);
      svg.setAttribute("class", "brain");
      host.appendChild(svg);
    });
    document.querySelectorAll("[data-brain-logo]").forEach(function (host) {
      host.appendChild(brain(true));
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
