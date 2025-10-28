getData();
function getData() {
  let url =
    "https://sheets.googleapis.com/v4/spreadsheets/15SfSXmAc9sJ8QRqBfwE20U1qn2d6mWUqQ_S-GKpz_ok/values/Sheet1?key=AIzaSyCh9Qi0ASAJtbuIBez37uCC6QBwF_JwbuM";
  request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      let data = JSON.parse(request.responseText);
      loadIn(data);
      return data;
    } else {
      console.log("error");
      // We reached our target server, but it returned an error
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
  };
  request.send();
}

let latestDate;
let selectArray = [];
let currentText = " ";

function getLastDate(data) {
  let tempA = [];
  let tMax;

  for (var i = 1; i < data.values.length; i++) {
    let val = data.values[i];
    let getDate = val[1].split("-");
    let tDate = getDate[1] + "/" + getDate[0] + "/" + getDate[2];
    tempA.push(tDate);
  }
  for (var i = 0; i < tempA.length; i++) {
    if(i>1){
      if(compareTime(tempA[i-1], tempA[i])){
        tMax = tempA[i-1];
      }
      else {
        tMax = tempA[i];
      }
    }
  }
  let temp = tMax.split("/");
  latestDate = temp[1]+"-"+temp[0]+"-"+temp[2];
}

function loadIn(data) {
  getLastDate(data);
  let t = new Date();
  for (var i = 1; i < data.values.length; i++) {
    let val = data.values[i];
    let getDate = val[1].split("-");
    if (
      compareTime(
        t.getMonth() + 1 + "/" + t.getDate() + "/" + t.getFullYear(),
        getDate[1] + "/" + getDate[0] + "/" + getDate[2]
      )
    ) {
      let s = document.createElement("section");

      //add main content
      if (val[2] == "h1") {
        let d = document.createElement("h1");
        d.innerHTML = val[3];
        s.appendChild(d);
      }
      if (val[2] == "h2") {
        let d = document.createElement("h2");
        d.innerHTML = val[3];
        s.appendChild(d);
      }
      if (val[2] == "h3") {
        let d = document.createElement("h3");
        d.innerHTML = val[3];
        s.appendChild(d);
      }
      if (val[2] == "p") {
        let d = document.createElement("p");
        d.innerHTML = val[3];
        s.appendChild(d);
        if (val[1] == latestDate) {
          d.style.background = "rgb(255, 189, 51, 0.2)";
        }
      }
      if (val[2] == "a") {
        let d = document.createElement("a");
        d.href = val[6];
        d.target = "_blank";
        d.innerHTML = val[3];
        s.appendChild(d);
      }
      if (val[2] == "code") {
        let d = document.createElement("code");
        d.innerHTML = val[3];
        s.appendChild(d);
      }
      if (val[2] == "em") {
        let d = document.createElement("em");
        d.innerHTML = val[3];
        s.appendChild(d);
      }
      if (val[2] == "hr") {
        let d = document.createElement("hr");
        s.appendChild(d);
      }
      if (val[2] == "quote") {
        let d = document.createElement("blockquote");
        d.innerHTML = val[3];
        s.appendChild(d);
        // s.style.background = "lightgrey"
      }
      if (val[2] == "img") {
        let d = document.createElement("img");
        d.src = val[3];
        d.alt = val[4];
        s.appendChild(d);
      }
      if (val[2] == "details") {
        let d = document.createElement("details");
        d.innerHTML = val[3];
        let sum = document.createElement("summary");
        sum.innerHTML = val[4];
        d.appendChild(sum);
        s.appendChild(d);
      }
      document.getElementById("main").appendChild(s);

      //add date and comments
      let n = document.createElement("aside");
      let p1 = document.createElement("p");
      p1.setAttribute("class", "date");
      let p2 = document.createElement("p");
      if (val[1] == latestDate) {
        let m = document.createElement("mark");
        m.innerHTML = "Added on " + val[1];
        p1.appendChild(m);
      } else {
        p1.innerHTML = "Added on " + val[1];
      }
      n.appendChild(p1);
      if (val[5] != undefined) {
        p2.innerHTML = val[5];
        n.appendChild(p2);
      }
      s.appendChild(n);
    }
  }
}

function compareTime(time1, time2) {
  return new Date(time1) >= new Date(time2); // true if time1 is later
}

function getSelectedText() {
  var text = "";
  if (typeof window.getSelection != "undefined") {
    text = window.getSelection().toString();
  } else if (
    typeof document.selection != "undefined" &&
    document.selection.type == "Text"
  ) {
    text = document.selection.createRange().text;
  }
  return text;
}

function doSomethingWithSelectedText() {
  var selectedText = getSelectedText();
  if (selectedText) {
    if (selectedText != " ") {
      selectArray.push(selectedText);
      if (!find_duplicate_in_array(selectArray).includes(selectedText)) {
        let d = document.createElement("p");
        d.innerHTML = selectedText;
        document.getElementById("words").appendChild(d);
        let lb = document.createElement("hr");
        document.getElementById("words").appendChild(lb);
      }
    }
  }
}

document.onmouseup = doSomethingWithSelectedText;
// document.onkeyup = doSomethingWithSelectedText;

function find_duplicate_in_array(array) {
  const count = {};
  const result = [];

  array.forEach(item => {
    if (count[item]) {
      count[item] += 1;
      return;
    }
    count[item] = 1;
  });

  for (let prop in count) {
    if (count[prop] >= 2) {
      result.push(prop);
    }
  }
  console.log(count);
  return result;
}
