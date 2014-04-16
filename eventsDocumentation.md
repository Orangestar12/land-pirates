#Affecting Player Variables:

Use `hpUpdate(#)` to add or remove HP.

Use `numberUpdate(#)` to add or remove spits. TODO: Rename to `lootUpdate()`.

#Affecting output:

Use `moneyTitle()` to generate a random, humorous name for money. "You find 7 greenbacks!"

#Event structure:

When the first button is pressed, `eventOccurance()` is called. `eventOccurance()` starts with these three things:

 - If the player is dead, a "pseudo-event" is started reminding the player of this fact.
  - This raises the `eventActive` flag, which carries over into the next check.
 - If an event is currently happening, the occurance immediately fails.

It will then get a random event from the array. For readability, events are structured like so:

    events[events.length] = "<Event Name>";
    function <Event Name>() {
        //Code goes here.
    }
    
    function <Event Name>2() {
        //If you need a function, do this.
    }

The event number is always `events.length`. The `.length` property is always 1 more than the last numbered event (since [0]-[3] is 4 events total.)

All events should run their course, but the very last line should be `finalizeEvent()`. This code makes the "OK" button that ends an event appear. After that button is clicked, `endEvent()` is called.

##Some global variables and functions that may be useful for event design:

`eventBox.innerHTML` is the variable that holds what's currently written in the main page. This is in HTML code. Here are some uses:

    eventBox.innerHTML = "<p>You suddenly are transformed into a potato!</p>";

This would completely remove what is written on the page and replace it with "_You suddenly are transformed into a potato!_"

    eventBox.innerHTML += "<p>You suddenly are transformed into a potato!</p>";

Note the +. This would _append_ the text to what is written on the page. For example, if the page already said the following:

_You take a bite from the potato..._

This code would change it to say this:

_You take a bite from the potato..._

_You suddenly are transformed into a potato!_

--------------------

The end of every event should call the `finalizeEvent()` function. If your code is leaving you with unclickable buttons and lingering text, check to make sure that you called `finalizeEvent()`. It's a neat little cleanup script to fix the playing area back up. Note that the Options menu and Debug Options are never affected by `eventActive`, since they have options to get out of a jam if one is occurred.

--------------------

If you need a random number, don't code it yourself. We have `randomIntfromInterval(min, max)` (Hi, Stack Overflow!) To use it, just do `(randomIntfromInterval(30, 60) == 35)`, or what have you.

--------------------

`eventYes` is a variable that is used to store responses. `finalizeEvent()` resets this var to 0. An example of using `eventYes` is in the first event: `quarryHunt()`. On run, it adds two new buttons that call `quarryHunt2()`, but each sets `eventYes` differently beforehand. Whichever one sets `eventYes` determines how `quarryHunt2()` handles the event.

--------------------

`result` can be used for instances where a "Yes/No" response is innapropriate (for example, generating a random number.) This is reset to 0 on `finalizeEvent()`.

--------------------

`thisSceneBy.innerHTML` is a variable that can be used (and called, for whatever reason you may have) to set who wrote this scene. _(Fun fact: It was actually inspired by TiTs of all things.)_ This value is reset to "Nobody" on `endEvent()`.

#Doing Combat

It's an RPG, so let's do some fighting! 