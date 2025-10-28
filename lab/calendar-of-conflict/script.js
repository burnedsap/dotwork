/* global p5js */
p5.disableFriendlyErrors = true;
let monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

var started = false;
let JanData = [];
let FebData = [];
let MarData = [];
let AprData = [];
let MayData = [];
let JunData = [];
let JulData = [];
let AugData = [];
let SepData = [];
let OctData = [];
let NovData = [];
let DecData = [];

let rajdhaniLight;
let rajdhaniMedium;
let rajdhaniBold;
function preload() {
  //  light = loadFont("Inter-Light.ttf");
  rajdhaniMedium = loadFont(
    "https://cdn.glitch.com/103b5608-5092-47c4-a370-56e217da399c%2FRajdhani-Medium.ttf?v=1602438666613"
  );
  rajdhaniBold = loadFont(
    "https://cdn.glitch.com/103b5608-5092-47c4-a370-56e217da399c%2FRajdhani-Bold.ttf?v=1602438668608"
  );
  rajdhaniLight = loadFont(
    "https://cdn.glitch.com/103b5608-5092-47c4-a370-56e217da399c%2FRajdhani-Light.ttf?v=1602438667759"
  );
}

let dataB;
const csvUrl = "data-take2.csv";
var psv = d3.dsvFormat("|");
var myPromise = new Promise(function(resolve, reject) {
  const fetchText = async url => {
    const response = await fetch(url);
    return await response.text();
  };

  fetchText(csvUrl).then(text => {
    // console.log(psv.parse(text));
    dataB = psv.parse(text);
    // console.log(Math.round(text.length / 1024) + ' kB');
    // console.log(dataB.length + ' rows');
    // console.log(dataB.columns.length + ' columns');
    resolve();
  });
});

async function setup() {
  var canvas = createCanvas(1280, 760);
  canvas.parent("sketch-holder");
  background(10, 10, 10);
  // noFill();
  // stroke(255);
  // strokeWeight(3);

  await myPromise;
  started = true;
  // console.log(dataB);
  if (started) {
    inputOpt();
    monthSplit();
    background(10, 10, 10);
    console.log("setup Done");
  }
}

let d = "";
let len = 9;
let lenp = 2;
let headlineDisplay = "";

//Draw is currently only being used for mouseover to display headlines
//Drawing visuals in this block is super-not-great
//Also means to need to come up with hacky solutions for frame by frame visuals
function draw() {
  if (!started) {
    textFont(rajdhaniMedium);
    textSize(14);
    background(10, 10, 10);
    fill(map(sin(frameCount * 0.015), 1, -1, 255, 0), 100);
    stroke(255);
    strokeWeight(map(sin(frameCount * 0.015), 1, -1, 0.1, 3));
    ellipse(
      width / 2,
      height / 2 - 30,
      map(sin(frameCount * 0.015), -1, 1, 10, 80)
    );
    fill(255);
    noStroke();
    textAlign(CENTER);
    text("Loading (16.2MB)...", width / 2, height / 2 + 40);
  } else if (started) {
    if (selectedMonth != undefined) {
      // console.log(selectedMonth);
      let monthArrayName = selectedMonth + "Data";
      monthArrayName = eval(monthArrayName);
      let x = 50;
      for (var i = 1; i < selectedMonthLength + 1; i++) {
        let y = 50;
        let d = "";
        if (i < 10) {
          d = "0" + i;
        } else {
          d = i;
        }
        let ident = selectedMonth + "-" + d;
        for (var j = 0; j < eval(monthArrayName).length; j++) {
          // let r = map(
          //   parseFloat(eval(monthArrayName)[j].sentiment),
          //   -18,
          //   15,
          //   0.1,
          //   0.9
          // );
          // let rr = lerp(1, 20, r);
          if (eval(monthArrayName)[j].Date == ident) {
            if (
              "Riot" == dataB[j].Riot ||
              "Protest" == dataB[j].Protest ||
              "Strike" == dataB[j].Strike ||
              "Bandh" == dataB[j].Bandh ||
              "Dharna" == dataB[j].Dharna
            ) {
              if (politicalCheck.checked()) {
                if (
                  mouseX > y + len / 2 - 5 &&
                  mouseX < y + len / 2 + 5 &&
                  (mouseY > x - 5 && mouseY < x + 5)
                ) {
                  // fill(255, 50, 50);
                  // ellipse(y, x + len / 2, rr+2, rr+2);
                  noStroke();
                  fill(10, 10, 10);
                  rect(720, 100, 500, 360);
                  fill(255);
                  textAlign(LEFT);
                  textSize(18);
                  textFont(rajdhaniLight);
                  text(eval(monthArrayName)[j].Date, 800, 140);
                  let textLen = textWidth(eval(monthArrayName)[j].Date);
                  textFont(rajdhaniMedium);
                  text(eval(monthArrayName)[j].Location, 810 + textLen, 140);
                  textAlign(LEFT);
                  textSize(40);
                  textFont(rajdhaniBold);
                  text(eval(monthArrayName)[j].Headline, 800, 150, 380, 500);
                }
              }
            }
            if (
              "Drought" == dataB[j].Drought ||
              "Earthquake" == dataB[j].Earthquake ||
              "Famine" == dataB[j].Famine ||
              "Cyclone" == dataB[j].Cyclone ||
              "Pollution" == dataB[j].Pollution ||
              "Flood" == dataB[j].Flood ||
              "Starve" == dataB[j].Starve
            ) {
              if (environmentalCheck.checked()) {
                if (
                  mouseX > y + len / 2 - 5 &&
                  mouseX < y + len / 2 + 5 &&
                  (mouseY > x - 5 && mouseY < x + 5)
                ) {
                  // fill(65, 242, 104);
                  // ellipse(y, x + len / 2, rr+2, rr+2);
                  noStroke();
                  fill(10, 10, 10);
                  rect(720, 100, 500, 360);
                  fill(255);
                  textAlign(LEFT);
                  textSize(18);
                  textFont(rajdhaniLight);
                  text(eval(monthArrayName)[j].Date, 800, 140);
                  let textLen = textWidth(eval(monthArrayName)[j].Date);
                  textFont(rajdhaniMedium);
                  text(eval(monthArrayName)[j].Location, 810 + textLen, 140);
                  textAlign(LEFT);
                  textSize(40);
                  textFont(rajdhaniBold);
                  text(eval(monthArrayName)[j].Headline, 800, 150, 380, 500);
                }
              }
            }
            if (
              "Rape" == dataB[j].Rape ||
              "Murder" == dataB[j].Murder ||
              "Abuse" == dataB[j].Abuse ||
              "Kill" == dataB[j].Kill ||
              "Pollution" == dataB[j].Pollution ||
              "Acid Attack" == dataB[j].Acid_Attack ||
              "Fight" == dataB[j].Fight
            ) {
              if (interpersonalCheck.checked()) {
                if (
                  mouseX > y + len / 2 - 5 &&
                  mouseX < y + len / 2 + 5 &&
                  (mouseY > x - 5 && mouseY < x + 5)
                ) {
                  // fill(123, 59, 227);
                  // ellipse(y, x + len / 2, rr+2, rr+2);
                  noStroke();
                  fill(10, 10, 10);
                  rect(720, 100, 500, 360);
                  fill(255);
                  textAlign(LEFT);
                  textSize(18);
                  textFont(rajdhaniLight);
                  text(eval(monthArrayName)[j].Date, 800, 140);
                  let textLen = textWidth(eval(monthArrayName)[j].Date);
                  textFont(rajdhaniMedium);
                  text(eval(monthArrayName)[j].Location, 810 + textLen, 140);
                  textAlign(LEFT);
                  textSize(40);
                  textFont(rajdhaniBold);
                  text(eval(monthArrayName)[j].Headline, 800, 150, 380, 500);
                }
              }
            }
            if (
              "Police Brutality" == dataB[j].Police_Brutality ||
              "Police Crackdown" == dataB[j].Police_Crackdown
            ) {
              if (policeCheck.checked()) {
                if (
                  mouseX > y + len / 2 - 5 &&
                  mouseX < y + len / 2 + 5 &&
                  (mouseY > x - 5 && mouseY < x + 5)
                ) {
                  // fill(242, 162, 41);
                  // ellipse(y, x + len / 2, rr+2, rr+2);
                  noStroke();
                  fill(10, 10, 10);
                  rect(720, 100, 500, 360);
                  fill(255);
                  textAlign(LEFT);
                  textSize(18);
                  textFont(rajdhaniLight);
                  text(eval(monthArrayName)[j].Date, 800, 140);
                  let textLen = textWidth(eval(monthArrayName)[j].Date);
                  textFont(rajdhaniMedium);
                  text(eval(monthArrayName)[j].Location, 810 + textLen, 140);
                  textAlign(LEFT);
                  textSize(40);
                  textFont(rajdhaniBold);
                  text(eval(monthArrayName)[j].Headline, 800, 150, 380, 500);
                }
              }
            }
            if (
              "Lynch" == dataB[j].Lynch ||
              "Riot" == dataB[j].Riot ||
              "Violence" == dataB[j].Violence ||
              "Clash" == dataB[j].Clash
            ) {
              if (communityCheck.checked()) {
                if (
                  mouseX > y + len / 2 - 5 &&
                  mouseX < y + len / 2 + 5 &&
                  (mouseY > x - 5 && mouseY < x + 5)
                ) {
                  // fill(237, 242, 75);
                  // ellipse(y, x + len / 2, rr+2, rr+2);
                  noStroke();
                  fill(10, 10, 10);
                  rect(720, 100, 500, 360);
                  fill(255);
                  textAlign(LEFT);
                  textSize(18);
                  textFont(rajdhaniLight);
                  text(eval(monthArrayName)[j].Date, 800, 140);
                  let textLen = textWidth(eval(monthArrayName)[j].Date);
                  textFont(rajdhaniMedium);
                  text(eval(monthArrayName)[j].Location, 810 + textLen, 140);
                  textAlign(LEFT);
                  textSize(40);
                  textFont(rajdhaniBold);
                  text(eval(monthArrayName)[j].Headline, 800, 150, 380, 500);
                }
              }
            }
            if (
              "Steal" == dataB[j].Steal ||
              "Theft" == dataB[j].Theft ||
              "Fraud" == dataB[j].Fraud
            ) {
              if (financialCheck.checked()) {
                if (
                  mouseX > y + len / 2 - 5 &&
                  mouseX < y + len / 2 + 5 &&
                  (mouseY > x - 5 && mouseY < x + 5)
                ) {
                  // fill(222, 78, 138);
                  // ellipse(y, x + len / 2, rr+2, rr+2);
                  noStroke();
                  fill(10, 10, 10);
                  rect(720, 100, 500, 360);
                  fill(255);
                  textAlign(LEFT);
                  textSize(18);
                  textFont(rajdhaniLight);
                  text(eval(monthArrayName)[j].Date, 800, 140);
                  let textLen = textWidth(eval(monthArrayName)[j].Date);
                  textFont(rajdhaniMedium);
                  text(eval(monthArrayName)[j].Location, 810 + textLen, 140);
                  textAlign(LEFT);
                  textSize(40);
                  textFont(rajdhaniBold);
                  text(eval(monthArrayName)[j].Headline, 800, 150, 380, 500);
                }
              }
            }
            if ("Caste Killing" == dataB[j].Caste_Killing) {
              if (casteCheck.checked()) {
                if (
                  mouseX > y + len / 2 - 5 &&
                  mouseX < y + len / 2 + 5 &&
                  (mouseY > x - 5 && mouseY < x + 5)
                ) {
                  // fill(77, 227, 224);
                  // ellipse(y, x + len / 2, rr+2, rr+2);
                  noStroke();
                  fill(10, 10, 10);
                  rect(720, 100, 500, 360);
                  fill(255);
                  textAlign(LEFT);
                  textSize(18);
                  textFont(rajdhaniLight);
                  text(eval(monthArrayName)[j].Date, 800, 140);
                  let textLen = textWidth(eval(monthArrayName)[j].Date);
                  textFont(rajdhaniMedium);
                  text(eval(monthArrayName)[j].Location, 810 + textLen, 140);
                  textAlign(LEFT);
                  textSize(40);
                  textFont(rajdhaniBold);
                  text(eval(monthArrayName)[j].Headline, 800, 150, 380, 500);
                }
              }
            }
            y += 1.2;
          }
        }
        x += 22;
      }
    } else {
      background(10, 10, 10);
      strokeWeight(1);
      stroke(map(sin(frameCount * 0.015), -1, 1, 255, 0));
      fill(map(sin(frameCount * 0.015), 1, -1, 255, 0));
      ellipse(width / 2, height / 2, 130);
      fill(map(sin(frameCount * 0.015), -1, 1, 255, 0));
      textAlign(CENTER);
      noStroke();
      text(
        "Select a month " + "\n" + "to get started",
        width / 2,
        height / 2 - 5
      );
    }
  }
}

//Split up source CSV Data into individual month arrays
function monthSplit() {
  for (var m = 0; m < monthList.length; m++) {
    // console.log(monthList[m]);
    let arrName = monthList[m] + "Data";
    for (var i = 0; i < dataB.length; i++) {
      if (dataB[i].Date.includes(monthList[m])) {
        eval(arrName).push(dataB[i]);
      }
    }
  }
  console.log("monthSplit complete");
  // console.log(JanData);
}

//Set up all the inputs

let monthSel;
let sentimentCheck;
let politicalCheck;
let interpersonalCheck;
let environmentalCheck;
let casteCheck;
let policeCheck;
let communityCheck;
let financialCheck;
let saveButton;

function inputOpt() {
  monthSel = createSelect();
  for (var m = 0; m < monthList.length; m++) {
    monthSel.option(monthList[m]);
  }
  monthSel.option("Month");
  monthSel.selected("Month");
  monthSel.changed(changeMonth);
  monthSel.parent("sketch-buttons");
  // }

  // function showOpt() {
  sentimentCheck = createCheckbox("Sentiment Analysis", true);
  sentimentCheck.parent("sketch-buttons");
  sentimentCheck.changed(changeVisual);

  politicalCheck = createCheckbox("Political Conflict", false);
  politicalCheck.parent("sketch-buttons");
  politicalCheck.changed(changeVisual);

  interpersonalCheck = createCheckbox("Interpersonal Conflict", false);
  interpersonalCheck.parent("sketch-buttons");
  interpersonalCheck.changed(changeVisual);

  environmentalCheck = createCheckbox("Environmental Conflict", false);
  environmentalCheck.parent("sketch-buttons");
  environmentalCheck.changed(changeVisual);

  casteCheck = createCheckbox("Caste Conflict", false);
  casteCheck.parent("sketch-buttons");
  casteCheck.changed(changeVisual);

  policeCheck = createCheckbox("Police Conflict", false);
  policeCheck.parent("sketch-buttons");
  policeCheck.changed(changeVisual);

  communityCheck = createCheckbox("Community Conflict", false);
  communityCheck.parent("sketch-buttons");
  communityCheck.changed(changeVisual);

  financialCheck = createCheckbox("Financial Conflict", false);
  financialCheck.parent("sketch-buttons");
  financialCheck.changed(changeVisual);
  
  saveButton = createButton('Save Image');
  saveButton.parent("sketch-buttons");
  saveButton.mousePressed(saveImage);
}

//Block to change month
let selectedMonth;
let selectedMonthLength;
function changeMonth() {
  selectedMonth = monthSel.value();
  if (
    selectedMonth == "Jan" ||
    selectedMonth == "Mar" ||
    selectedMonth == "May" ||
    selectedMonth == "Jul" ||
    selectedMonth == "Aug" ||
    selectedMonth == "Oct" ||
    selectedMonth == "Dec"
  ) {
    selectedMonthLength = 31;
  } else if (selectedMonth == "Feb") {
    selectedMonthLength = 28;
  } else {
    selectedMonthLength = 30;
  }
  // showOpt();
  changeVisual();
}

//Block to display visual
function changeVisual() {
  if (selectedMonth != "Month") {
    background(10, 10, 10);
    explainerVisual();
    let monthArrayName = selectedMonth + "Data";
    monthArrayName = eval(monthArrayName);
    let x = 50;
    for (var i = 1; i < selectedMonthLength + 1; i++) {
      let y = 50;
      let d = "";
      if (i < 10) {
        d = "0" + i;
      } else {
        d = i;
      }
      let ident = selectedMonth + "-" + d;
      for (var j = 0; j < eval(monthArrayName).length; j++) {
        if (eval(monthArrayName)[j].Date == ident) {
          strokeWeight(1.2);
          noFill();
          stroke(
            map(parseFloat(eval(monthArrayName)[j].sentiment), -18, 15, 0, 255),
            100
          );
          let r = map(
            parseFloat(eval(monthArrayName)[j].sentiment),
            -18,
            15,
            0.1,
            0.9
          );
          let rr = lerp(1, 20, r);
          if (sentimentCheck.checked()) {
            line(y, x, y, x + len);
            // ellipse(y, x, rr, rr);
          }
          if (
            "Riot" == dataB[j].Riot ||
            "Protest" == dataB[j].Protest ||
            "Strike" == dataB[j].Strike ||
            "Bandh" == dataB[j].Bandh ||
            "Dharna" == dataB[j].Dharna
          ) {
            fill(255, 50, 50, 50);
            noStroke();
            if (politicalCheck.checked()) {
              // line(y, x-lenp, y, x + len+lenp);
              ellipse(y, x + len / 2, rr, rr);
            }
          }
          if (
            "Drought" == dataB[j].Drought ||
            "Earthquake" == dataB[j].Earthquake ||
            "Famine" == dataB[j].Famine ||
            "Cyclone" == dataB[j].Cyclone ||
            "Pollution" == dataB[j].Pollution ||
            "Flood" == dataB[j].Flood ||
            "Starve" == dataB[j].Starve
          ) {
            fill(65, 242, 104, 50);
            noStroke();
            if (environmentalCheck.checked()) {
              // line(y, x-lenp, y, x + len+lenp);
              ellipse(y, x + len / 2, rr, rr);
            }
          }
          if (
            "Rape" == dataB[j].Rape ||
            "Murder" == dataB[j].Murder ||
            "Abuse" == dataB[j].Abuse ||
            "Kill" == dataB[j].Kill ||
            "Pollution" == dataB[j].Pollution ||
            "Acid Attack" == dataB[j].Acid_Attack ||
            "Fight" == dataB[j].Fight
          ) {
            fill(123, 59, 227, 50);
            noStroke();
            if (interpersonalCheck.checked()) {
              // line(y, x - lenp, y, x + len + lenp);
              ellipse(y, x + len / 2, rr, rr);
            }
          }
          if (
            "Police Brutality" == dataB[j].Police_Brutality ||
            "Police Crackdown" == dataB[j].Police_Crackdown
          ) {
            fill(242, 162, 41, 50);
            noStroke();
            if (policeCheck.checked()) {
              // line(y, x - lenp, y, x + len + lenp);
              ellipse(y, x + len / 2, rr, rr);
            }
          }
          if (
            "Lynch" == dataB[j].Lynch ||
            "Riot" == dataB[j].Riot ||
            "Violence" == dataB[j].Violence ||
            "Clash" == dataB[j].Clash
          ) {
            fill(237, 242, 75, 50);
            noStroke();
            if (communityCheck.checked()) {
              // line(y, x - lenp, y, x + len + lenp);
              ellipse(y, x + len / 2, rr, rr);
            }
          }
          if (
            "Steal" == dataB[j].Steal ||
            "Theft" == dataB[j].Theft ||
            "Fraud" == dataB[j].Fraud
          ) {
            fill(222, 78, 138, 50);
            noStroke();
            noStroke();
            if (financialCheck.checked()) {
              // line(y, x - lenp, y, x + len + lenp);
              ellipse(y, x + len / 2, rr, rr);
            }
          }
          if ("Caste Killing" == dataB[j].Caste_Killing) {
            fill(77, 227, 224, 50);
            noStroke();
            if (casteCheck.checked()) {
              // line(y, x - lenp, y, x + len + lenp);
              ellipse(y, x + len / 2, rr, rr);
            }
          }
          y += 1.2;
        }
      }
      x += 22;
    }
  }
}

function explainerVisual() {
  //760
  noStroke();
  fill(255, 50, 50, 150);
  ellipse(800, 630, 15, 15);
  fill(123, 59, 227, 150);
  ellipse(800, 655, 15, 15);
  fill(65, 242, 104, 150);
  ellipse(800, 680, 15, 15);
  fill(77, 227, 224, 150);
  ellipse(800, 705, 15, 15);

  fill(242, 162, 41, 150);
  ellipse(1000, 630, 15, 15);
  fill(237, 242, 75, 150);
  ellipse(1000, 655, 15, 15);
  fill(222, 78, 138, 150);
  ellipse(1000, 680, 15, 15);


  fill(255);
  textAlign(LEFT);
  textSize(14);
  textFont(rajdhaniMedium);
  
  text("Political Conflict", 815, 635);
  text("Interpersonal Conflict", 815, 660);
  text("Environmental Conflict", 815, 685);
  text("Caste Conflict", 815, 710);

  text("Police Conflict", 1015, 635);
  text("Community Conflict", 1015, 660);
  text("Financial Conflict", 1015, 685);
  
  let interA;
  let c1 = color(255);
  let c2 = color(0);
  let llen = 10;
  for(var i=0; i<100; i++) {
    let inter = map(i, 0, 50, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    strokeWeight(1);
    let lly = map(i,0, 50, 805, 1100);
    line(lly, 590, lly, 590+llen);
  }
  
  noFill();
  stroke(255);
  rect(795, 585, 320, 20);
  noStroke();
  fill(255);
  text("Each line is a news article.", 795, 540);
  text("The lighter the line, the more positive the news is.", 795, 555);
  text("The darker the line, the more negative the news is.", 795, 570);
}

function saveImage() {
  save('Calendar-of-Conflict.png');
}