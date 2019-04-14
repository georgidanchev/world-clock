// Global clocks manager. Uses both
// luxon and our clock module.
import { DateTime } from 'luxon';
import Clock from './clock';

export default class Manager {
  constructor(_target) {
    this.body = document.body;
    this.clockTarget = _target;
    this.timezones = [];
  }

  // Save data to local storage.
  saveData(allData, data) {
    // we either save all data or just one entry.
    // IF we save all the data we just do it, but
    // if we save just on entry we push it to our
    // array first then we save the whole array.
    if (allData === true) {
      this.timezones = data;
      localStorage.setItem('timezones', JSON.stringify(this.timezones));
    } else {
      this.timezones.push(data);
      localStorage.setItem('timezones', JSON.stringify(this.timezones));
    }
  }

  // Load data from local storage.
  loadData() {
    // If we don't have any data.
    // Then find out our current
    // timezone and save it.
    if (localStorage.getItem('timezones') != null) {
      const getLocalData = JSON.parse(localStorage.getItem('timezones'));
      this.timezones = [...getLocalData];
    } else {
      this.saveData(false, DateTime.local().zoneName);
    }
  }

  // Initialize all clocks
  initAllClocks() {
    // load the saved data.
    this.loadData();
    // find out where the clocks should be injected.
    document.querySelector(this.clockTarget).innerHTML = '';
    // loop over the array, if we have entries.
    if (this.timezones.length > 0) {
      this.timezones.forEach((e) => {
        new Clock(this.clockTarget).onLoad(e);
      });
    }
  }

  // Move clock in the array order.
  moveArryEntry(data, forward) {
    // I am sure there must be a better way
    // of doing this but I am doing it in a
    // easy way. I just get the entry above
    // or below and save it as temp. Then I
    // overwrite the entry and save the temp
    // on the old position.

    // Make a copy of the array.
    const timezones = [...this.timezones];
    // Find the index of the thing
    // we want to move.
    const index = timezones.indexOf(data);

    // if we are moving it down the array.
    if (forward === true) {
      // Get the entry of the new pos.
      let temp = timezones[index + 1];

      // If it's not empty it means it
      // our entry can go there. Else
      // it has to go on the other end.
      if (temp != null) {
        // Replace the entry with the new one.
        timezones[index + 1] = timezones[index];
        // Put the temp in the old one's place.
        timezones[index] = temp;
      } else {
        // If we cannot move it down any further
        // it means we are at the end of the array
        // so the entry has to go at the beginning.

        // Get ref of the first item.
        [temp] = [timezones[0]];
        // Set the first item to our item.
        timezones[0] = timezones[index];
        // Place temp item at the back.
        timezones[index] = temp;
      }

      // Going in the other direction, the process
      // is essentially the same, just in reverse.
    } else {
      let temp = timezones[index - 1];
      if (temp != null) {
        timezones[index - 1] = timezones[index];
        timezones[index] = temp;
      } else {
        [temp] = [timezones[timezones.length - 1]];
        timezones[timezones.length - 1] = timezones[index];
        timezones[index] = temp;
      }
    }

    // Save the new data.
    this.saveData(true, timezones);
    // Overwrite the clocks.
    this.initAllClocks();

    // p.s. this is the ugliest part of this project
    // I am sure there is much better way to do this.
  }

  // Remove a clock from the array.
  removeClock(data) {
    // Create temp array with all entries
    // except the one we don't want.
    const newArry = this.timezones.filter(item => item !== data);
    // Save the new data.
    this.saveData(true, newArry);
    // overwrite the clocks.
    this.initAllClocks();
  }

  onLoad() {
    // Load all clocks.
    this.initAllClocks();

    // If we get addNewClock event.
    this.body.addEventListener('addNewClock', (e) => {
      // Save that clock, passing the timezone.
      this.saveData(false, e.detail.string);
      // Add that new clock to the page.
      new Clock(this.clockTarget).onLoad(e.detail.string);
    });

    // Add event listener on the body to
    // listen for all the icons on page.
    this.body.addEventListener('click', (e) => {
      // Essentially what happens here is when you click an icon we
      // call the appropriate method and also pass the timezone.

      if (e.target.hasAttribute('data-removezone')) {
        this.removeClock(e.target.dataset.removezone);
      }
      if (e.target.hasAttribute('data-moveleft')) {
        this.moveArryEntry(e.target.dataset.moveleft, false);
      }

      if (e.target.hasAttribute('data-moveright')) {
        this.moveArryEntry(e.target.dataset.moveright, true);
      }
    });
  }
}
