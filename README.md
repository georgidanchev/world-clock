# World Clock

This is a small portfolio project which was build using webpack. This web app allows you to see the time current at any capital city around the world. You can add as many timezones/cities as you would like and they are persistent, kept safely in your browser's local storage. You can also move the clocks around or delete any to suit your needs. The webapp is also responsive and it's tweaked to look well on mobile as well. I am surprised you have read this text this far, go ahead and give a try, it's fun! The webpack setup can/will be found on my GitHub page, if you are interested in how it works please check for it there and I will not cover it here.

Technologies used: 
* My webpack setup
* Luxon (momentsjs)
* ES6 Modules
* ES6
* SCSS

Things that I like:
* Luxon API is pretty cool
* The search functionality
* Result pull and highlight
* Persistence w/t local storage
* Hover effects on the clock

Things that can be improved:
* Results list limited to only 5ish entries (performance).
* No duplicate clocks, should be filtered on input.
* Hover states on mobile should use touch w/t js.
* On mobile, one or two clocks per screen strictly (100vh).
* When you click on a result - scroll down to new clock.
* Screen readers - do they even work on this?
* digital clock should scale up and down the resolution.
* Donts should scale up and down with resolution.
* On 4k everything should scale the same as HD.

To view the project please click [here](https://w3althambition.github.io/world-clock/dist/index.html).