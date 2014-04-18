//Step 1: Check for localStorage support.
function supports_local_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e){
    return false;
  }
}

if (supports_local_storage() == false) {
  alert('Your browser is incapable of localstorage functions. Several functions may not work correctly. You are welcome to try to play Land Pirates as much as you wish, but be warned that you will not be able to save, and other functions may be unavailable as well.');
}

//Step 2: Initialize

var debug = false,
dead = false,
eventActive = false,
gameStarted = false,
lootBox = document.getElementById('totalloot'),
hpBox = document.getElementById('hitpoints')
hpTotalBox = document.getElementById('totalhitpoints'),
eventBox = document.getElementById('event'),
thisSceneBy = document.getElementById('scene');

//Step 3: Load

var currentHp = parseInt(localStorage['hp']);
var totalHp = parseInt(localStorage['hptotal']);
var lootTotal = parseInt(localStorage['total']);

//Step 4: Check. If a var couldn't be loaded, start a new game.

if (lootTotal % 1 != 0) {
  lootTotal = 100;
  totalHp = 10;
  currentHp = 10;
  gameStarted = false;
}
else {
  gameStarted = true;
}

//Step 5: Write all variables to the site.

lootBox.innerHTML = lootTotal;
hpBox.innerHTML = currentHp;
hpTotalBox.innerHTML = totalHp;

//Step 6: Define starting a new game

if (gameStarted == false) {
  document.getElementById('numberBox').style.top = '-180px';
  document.getElementById('main').style.top = '-100px';
  eventBox.innerHTML = '<p>Perhaps you&apos;ve heard of swashbuckling seafarers before, but have you ever heard such tales on the land? Romping through lush forests in their large, armored, treaded vehicles, these wayfaring wanderers seek cash and glory, often outside of the law. They are...</p><p style="font-size: 30pt; font-family: ' + "'Kaushan Script', cursive" + '">Land Pirates!</p><button onClick="gameInit()">New Game</button><p style="font-size: 10pt;">Land Pirates is designed for the latest two versions of the most popular browsers. If you experience problems, consider updating your browser.</p>';
}

function gameInit(){
  document.getElementById('numberBox').style.top = '0';
  document.getElementById('main').style.top = '0';
  eventBox.innerHTML = '<p>Game started.</p>';
  gameStarted = true;
}

//step 7 goes here

function lootUpdate(x) {
    lootTotal += x;
    if (lootTotal < 0) {
        lootTotal = 0;
        eventBox.innerHTML += "<p>You've run completely out of cash!</p>";
    }
    lootBox.innerHTML = lootTotal;
}

function hpUpdate(x) {
    currentHp += x;
    if (currentHp > totalHp) {
        currentHp = totalHp;
    }
    if (currentHp <= 0) {
        currentHp = 0;
        eventBox.innerHTML += "<p>You fall faint and die...</p>";
        dead = true;
    }
    hpBox.innerHTML = currentHp;
}

function hpTotalUpdate(x) {
    totalHp += x;
    if (currentHp > totalHp) {
        currentHp = totalHp;
    }
    if (currentHp <= 0) {
        currentHp = 0;
        eventBox.innerHTML += "<p>You fall faint and die...</p>";
        dead = true;
    }
    hpTotalBox.innerHTML = totalHp;
    hpBox.innerHTML = currentHp;
}

function gameSave() {
  localStorage['hp'] = currentHp;
  localStorage['hptotal'] = totalHp;
  localStorage['total'] = lootTotal;
}

function resetAll() {
  if (confirm('Are you sure you would like to delete your save and start over?') == true) {
    document.write('Your save has been deleted. You may close the page or reload to start over.');
    localStorage.removeItem('total');
    localStorage.removeItem('hp');
    localStorage.removeItem('hptotal');
    }
}

//Step 8: Define cool stuff

function randomIntfromInterval(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function toggleDebug() {
if (debug == false) {
  document.getElementById('debug').style.display = "block";
debug = true;
} else {
  document.getElementById('debug').style.display = "none";
debug = false;
}
}

var moneyNames = new Array();
moneyNames[0] = "spits",
moneyNames[1] = 'pounds of "goulash"',
moneyNames[2] = 'slices of "cheese"',
moneyNames[3] = "greenbacks",
moneyNames[4] = "doubloons",
moneyNames[5] = "pieces of eight",
moneyNames[6] = 'Hot Pockets&trade;';

function moneyTitle() {
    return moneyNames[randomIntfromInterval(0, moneyNames.length - 1)];
}

//Step 9: Save everything on quit.

window.addEventListener("beforeunload", function (e) {
  if (gameStarted == true) {
    localStorage['hp'] = currentHp;
    localStorage['hptotal'] = totalHp;
    localStorage['total'] = lootTotal;
  }
});

//Step 10: Define the functions that hide and show menus

window.onload = function() {
    document.getElementById('loading').style.display = "none";
}

function showOptions() {
  document.getElementById('options').style.display = "block";
}

function hideOptions() {
  document.getElementById('options').style.display = "none";
}

function showCredits() {
  document.getElementById('credits').style.display = "block";
}

function hideCredits() {
  document.getElementById('credits').style.display = "none";
}

function showUpload() {
  document.getElementById('upload').style.display = "block";
}

function hideUpload() {
  document.getElementById('upload').style.display = "none";
}

//Step 11: Define actions inside those menus.

/* function intenseQualityMode() {
  if (confirm("Do you have nothing better to do than play web-based RPGs on your huge-screen TV? Then Intense Quality Mode is for you! Click OK to start downloading huge (3MB+) images to replace the current backgrounds. If your monitor is under 1920x1080, you will notice no change.") == true) {
    document.getElementsByTagName('html').style.background = "file('alex_huge.jpg') center 85%";
  document.getElementById('options').style.background = "file('parchment_huge.jpg')";
  document.getElementById('lootBox').style.background = "file('rice_huge.jpg')";
  }
} */

if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
  document.getElementById('upload').innerHTML = '<p>Sadly, your browser does not support file uploading APIs. However, there is a chance that you can still enjoy Land Pirates without custom events.</p>';
}

function fileSelector(evt) {
  var file = evt.target.files[0],
  status = document.getElementById('uploading');
  status.innerHTML = '&#8635; Uploading your file...';
  if (!file.type == 'application/javascript' || !file.type == 'text/javascript') {
     alert("Well, aren't YOU clever? Upload a JAVASCRIPT file, please.");
	 status.innerHTML = '&#10060; An error occurred.';
  }
  else {
    var getFile = new FileReader();
    getFile.onload = (function(input) {
      return function(inp) {
        var newMod = document.createElement('script');
        newMod.innerHTML = inp.target.result;
        document.body.appendChild(newMod);
        status.innerHTML = '&#10003; File imported.';
      };
    })(file);
    getFile.readAsText(file);
  }
  document.getElementById('fileupload').value = '';
}

document.getElementById('fileupload').addEventListener('change', fileSelector, false);