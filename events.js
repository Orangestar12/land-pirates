var eventBox = document.getElementById('event'),
thisSceneBy = document.getElementById('scene'),
eventYes = 0,
result = 0,
enemyName = "Slime",
enemyHp = 3,
enemyHpTotal = 3,
events = new Array();

events[0]="quarryHunt";
function quarryHunt() {
  thisSceneBy.innerHTML = "Orangestar";
  eventBox.innerHTML = '<p>While your ship rumbles along, you think you spot something in the lush forests. Do you go to check it out?</p><button onClick="eventYes=2; quarryHunt2()">No</button> <button onClick="eventYes=1; quarryHunt2()">Yes</button>';
}

function quarryHunt2() {
  if (eventYes == 1) {
    eventBox.innerHTML = '<p>&quot;Stop the ship!&quot; you shout. Your pilot kicks into high gear throwing every break and disabling every single source of power your large, armored vehicle has. With a creaking and groaning of hydraulics and gears, your vessel moans to a halt. You waste no time dropping yourself down onto the surface and into the forests, towards the quarry you saw fleeing you.</p> <p>The quarry is currently distracted with grooming itself as you sneak up on it. The magnitude of what you are seeing hits you in an instant. A Golden Ringtail: One of the most prized and rarest animals in the land...and they sell for a pretty penny too! You take out your &quot;trusty&quot; blunderbuss and prepare to make the cleanest shot you ever will.</p><button onClick="eventYes=2;quarryHunt3()">Don&apos;t shoot</button> <button onClick="eventYes=1;quarryHunt3()">Shoot</button>';
  }
  else {
    eventBox.innerHTML = '<p>You decide discretion is the better part of valor and return to your ship.</p>';
    finalizeEvent();
  }
}

function quarryHunt3() {
  if (eventYes == 1) {
    eventBox.innerHTML = '<p>A shot rings out through the forest. Your blunderbuss flies true and the Ringtail falls dead. You take the quarry in your hands and lift it triumphantly over your head. This should sell quite nicely.</p>';
    result = randomIntfromInterval(250, 450);
    eventBox.innerHTML += '<p>You got ' + result + ' ' + moneyTitle() + '!</p>'
    lootUpdate(result);
  }
  else {
    eventBox.innerHTML = '<p>Your blunderbuss pointed, you hesitate to shoot the Golden Ringtail. It promptly bounds off into some remote part of the forest. You leave back to your ship.</p>';
  }
  finalizeEvent();
}

events[1]="fightCorsair";
function fightCorsair() {
  thisSceneBy.innerHTML = "Orangestar";
  eventBox.innerHTML = "<p>This will be a cool event where you fight corsairs! Trust me!</p><!-- <p>Your ship rumbles along with deafening creaks and bounces as its massive treads roll it along in a timely manner. Something seems... off. The vessel seems louder than </p> -->";
  finalizeEvent();
}

/////////////////////////////////////////////

function eventOccurance() {
  document.getElementById('adventurebutton').style.opacity = '0';
  if (dead == true) {
    eventBox.innerHTML = "<p>You're dead. You can't do things when you're dead.</p>";
    eventActive = true;
    document.getElementById('eventbutton').style.display = "block";
  }
  if (eventActive != true) {
    thisEvent = randomIntfromInterval(0, events.length-1);
    eventActive = true;
    window[events[thisEvent]]();
  }
}

function finalizeEvent() {
    document.getElementById('eventbutton').style.display = "block";
    eventYes = 0;
    result = 0;
}

function endEvent() {
  eventBox.innerHTML = "";
  thisSceneBy.innerHTML = "Nobody";
  document.getElementById('adventurebutton').style.opacity = '1';
  document.getElementById('eventbutton').style.display = "none";
  eventActive = false;
}