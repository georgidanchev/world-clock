
# World Clock

This small portfolio project which was build using webpack and utilized the Luxon API. Using this web app you can view the current time at most if not all capital cities around the world. You can view each time in an analog clock format, you can move these clocks around, delete any and they are all stored in your local storage, so when you come back to this site and your configuration sates the same. For full disclosure, this project was inspired by Wes Boss's [JS30 course]([https://www.javascript30.com/](https://www.javascript30.com/)), specifically the video on clocks, I ended up redoing the whole code as it's all different, but the inspiration came from there.

The web app is response, you have hover states which let you view the controls on each clock and also puts the digital clock above the needles so that if it's being covered you can still view the time. There was one irritation with luxon and that was that you cannot pull all of the timezones that It can use. So, I made a JSON list using momentjs which is what luxon is based on. That list is used when you do searches. I ended up using luxon over momentjs as it's newer and simpler to use. 

To view the project please click [here](https://w3althambition.github.io/world-clock/dist/index.html).

## Technologies Used
* My [webpack setup](https://github.com/w3althambition/webpack-framework)
* Luxon (momentsjs)
* JS - ES6
* ES6 Modules
* SCSS
* BEM

### Things that I like
* Luxon API is pretty cool
* The search functionality
* Result pull and highlight
* Persistence w/t local storage
* Hover effects on the clock

### Things that can be improved
* Results list limited to only 5ish entries (performance).
* No duplicate clocks, should be filtered on input.
* Hover states on mobile should use touch w/t js.
* On mobile, one or two clocks per screen strictly (100vh).
* When you click on a result - scroll down to new clock.
* Screen readers - do they even work on this?
* digital clock should scale up and down the resolution.
* Donts should scale up and down with resolution.
* On 4k everything should scale the same as HD.
