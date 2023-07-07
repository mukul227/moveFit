import moment from "moment";

import {DeviceEventEmitter} from "react-native";

const WorkoutPlayerState = {
  EXERCISE_DURATION: 'exercise_duration',
  EXERCISE_REPS: 'exercise_reps',
  BREAK: 'break',
  AMRAP: 'amrap',
  ROUND: 'round',
  FINISHED: 'finished'
};

export const ItemType = {
  EXERCISE_DURATION: 'exercise_duration',
  EXERCISE_REPS: 'exercise_reps',
  BREAK: 'break',
  AMRAP: 'amrap',
  ROUND: 'round'
}

const WorkoutPlayerTimerType = {
  EXERCISE: 'exercise',
  AMRAP: 'amrap',
  BREAK: 'break'
};

class WorkoutPlayerService {
  // data
  name;
  defaultRestTime;
  workoutItems;

  // main control states
  mainState;
  subState;
  itemIndex;
  childItemIndex;
  roundNumber;

  // timers
  timer;
  secondsTimer;
  endTime;
  lastSeconds;

  amrapCompleted;

  workoutScreenItemsUpdateSubscription;
  workoutScreenNextItemSubscription;
  amrapTickSubscription;
  restartSubscription;

  constructor() {
  }

  initialize = (workout) => {
    this.workout = workout;

    // general workout information
    this.name = this.workout.name;
    this.defaultRestTime = this.workout.rest_time;
    this.workoutItems = this.workout.workoutItems;

    // TODO: error
    if (this.workoutItems.length < 1) return;

    // determine initial state
    this.itemIndex = 0;
    this.subState = null;
    this.childItemIndex = null;
    this.roundNumber = null;

    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
    if (this.secondsTimer) clearInterval(this.secondsTimer);
    this.secondsTimer = null;
    this.endTime = null;
    this.lastSeconds = null;
    this.amrapCompleted = false;
    this.amrapPaused = false;

    switch (this.workoutItems[this.itemIndex].type) {
      case ItemType.EXERCISE_DURATION: this.initializeState(WorkoutPlayerState.EXERCISE_DURATION); break;
      case ItemType.EXERCISE_REPS: this.initializeState(WorkoutPlayerState.EXERCISE_REPS); break;
      case ItemType.BREAK: this.initializeState(WorkoutPlayerState.BREAK); break;
      case ItemType.AMRAP: this.initializeState(WorkoutPlayerState.AMRAP); break;
      case ItemType.ROUND: this.initializeState(WorkoutPlayerState.ROUND); break;
    }

    DeviceEventEmitter.emit('workout-screen-items-update', this.getScreenItems());
  }

  getScreenItems = () => {
    let upperScreenItem;
    let middleScreenItem;
    let lowerScreenItem;

    switch (this.mainState) {
      case WorkoutPlayerState.EXERCISE_DURATION:
      case WorkoutPlayerState.EXERCISE_REPS:
      case WorkoutPlayerState.BREAK:
        upperScreenItem = this.itemIndex > 0 ? this.getFormattedItem(this.workoutItems[this.itemIndex - 1]) : null;
        middleScreenItem = this.getFormattedItem(this.workoutItems[this.itemIndex]);
        lowerScreenItem = this.itemIndex < this.workoutItems.length - 1 ? this.getFormattedItem(this.workoutItems[this.itemIndex + 1]) : null;
        break;

      case WorkoutPlayerState.ROUND:
        // check if first round
        if (this.roundNumber === 1) {
          // check if first child item
          if (this.childItemIndex === 0) {
            // get main item before that if exists!!!
            if (this.itemIndex > 0) {
              upperScreenItem = this.getFormattedItem(this.workoutItems[this.itemIndex - 1]);
            } else {
              upperScreenItem = null;
            }
          } else {
            upperScreenItem = this.formatRound(this.workoutItems[this.itemIndex], this.workoutItems[this.itemIndex].round.items[this.childItemIndex - 1]);
          }
        } else {
          // not the first round
          // check if first child item
          if (this.childItemIndex === 0) {
            // get the last child item
            upperScreenItem = this.formatRound(this.workoutItems[this.itemIndex], this.workoutItems[this.itemIndex].round.items[this.workoutItems[this.itemIndex].round.items.length - 1]);
          } else {
            upperScreenItem = this.formatRound(this.workoutItems[this.itemIndex], this.workoutItems[this.itemIndex].round.items[this.childItemIndex - 1]);
          }
        }



        middleScreenItem = this.formatRound(this.workoutItems[this.itemIndex], this.workoutItems[this.itemIndex].round.items[this.childItemIndex]);

        // check if last round
        if (this.roundNumber === this.workoutItems[this.itemIndex].round.value) {
          // check if last item
          if (this.childItemIndex === this.workoutItems[this.itemIndex].round.items.length - 1) {
            // get next item if it exists
            if (this.itemIndex < this.workoutItems.length - 1) {
              // next main item
              lowerScreenItem = this.getFormattedItem(this.workoutItems[this.itemIndex + 1]);
            } else {
              // reached the end
              lowerScreenItem = null;
            }
          } else {
            lowerScreenItem = this.formatRound(this.workoutItems[this.itemIndex], this.workoutItems[this.itemIndex].round.items[this.childItemIndex + 1]);
          }
        } else {
          // not the last round
          // TODO: switch to Round X / Y completed if they want that instead of starting next round
          const nextChildItemIndex = (this.childItemIndex + 1) % this.workoutItems[this.itemIndex].round.items.length;
          lowerScreenItem = this.formatRound(this.workoutItems[this.itemIndex], this.workoutItems[this.itemIndex].round.items[nextChildItemIndex]);
        }
        break;

      case WorkoutPlayerState.AMRAP:
        upperScreenItem = this.itemIndex > 0 ? this.getFormattedItem(this.workoutItems[this.itemIndex - 1]) : null;
        middleScreenItem = this.formatAmrap(this.workoutItems[this.itemIndex], this.workoutItems[this.itemIndex].amrap.items[this.childItemIndex]);
        if (this.amrapCompleted) {
          lowerScreenItem = this.itemIndex < this.workoutItems.length - 1 ? this.getFormattedItem(this.workoutItems[this.itemIndex + 1]) : null;
        } else {
          lowerScreenItem = this.formatAmrap(this.workoutItems[this.itemIndex], this.workoutItems[this.itemIndex].amrap.items[(this.childItemIndex + 1) % this.workoutItems[this.itemIndex].amrap.items.length]);
        }

        break;

      case WorkoutPlayerState.FINISHED:
        // TODO: signal workout end
        upperScreenItem = null;
        middleScreenItem = null;
        lowerScreenItem = null;
        break;
    }

    return {
      upperScreenItem,
      middleScreenItem,
      lowerScreenItem
    }
  }

  formatAmrap = (parentItem, childItem) => {
    return {
      type: ItemType.AMRAP,
      name: parentItem.amrap.name,
      item: childItem
    };
  }

  formatRound = (parentItem, childItem) => {
    return {
      type: ItemType.ROUND,
      name: parentItem.round.name,
      currentRound: this.roundNumber,
      totalRounds: parentItem.round.value,
      item: childItem
    };
  }

  getFormattedItem = (item) => {
    if (item.type === ItemType.AMRAP) {
      return this.formatAmrap(item, item.amrap.items[0]);
    }

    if (item.type === ItemType.ROUND) {
      return this.formatRound(item, item.round.items[0]);
    }

    return {
      type: item.type,
      item: item
    };
  }

  setAmrapPaused = (paused) => {
    this.amrapPaused = paused;
  }

  initializeState = (state) => {
    this.mainState = state;
    this.amrapCompleted = false;
    this.amrapPaused = false;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (this.secondsTimer) {
      clearInterval(this.secondsTimer);
    }

    switch (state) {
      case WorkoutPlayerState.EXERCISE_DURATION:
        // TODO: start timer
        break;

      case WorkoutPlayerState.EXERCISE_REPS:
        // nothing;
        break;

      case WorkoutPlayerState.BREAK:
        // TODO: start timer
        break;

      case WorkoutPlayerState.ROUND:
        // TODO: initialize round
        this.childItemIndex = 0;
        this.roundNumber = 1;
        break;

      case WorkoutPlayerState.AMRAP:
        // TODO: initalize ARMAP start timer
        this.childItemIndex = 0;
        this.lastSeconds = this.workoutItems[this.itemIndex].amrap.time * 60;
        let amrapDuration = this.workoutItems[this.itemIndex].amrap.time * 60;
        // set end time
        this.endTime = moment(new Date()).add(amrapDuration, 'seconds');
        // start timer

        DeviceEventEmitter.emit('amrap-tick', { seconds: this.lastSeconds });

        this.secondsTimer = setInterval(() => {
          if (!this.amrapPaused) {
            amrapDuration--;
            if (amrapDuration <= 0) {
              amrapDuration = 0;
              if (this.secondsTimer) clearInterval(this.secondsTimer);
              this.secondsTimer = null;
              this.amrapFinished();
              amrapDuration = 0;
            }

            DeviceEventEmitter.emit('amrap-tick', {seconds: amrapDuration});
          }
        }, 1000);
        break;

      case WorkoutPlayerState.FINISHED:
        // TODO: signal workout end
        break;
    }
  }

  initializeSubState = () => {
    let childItem;

    switch (this.mainState) {
      case WorkoutPlayerState.ROUND:
        childItem = this.workoutItems[this.itemIndex].round.items[this.childItemIndex];
        break;
      case WorkoutPlayerState.AMRAP:
        childItem = this.workoutItems[this.itemIndex].amrap.items[this.childItemIndex];
        break;
    }

    // TODO: handle error
    if (!childItem) return;

    switch (childItem.type) {
      case ItemType.EXERCISE_DURATION:
        this.subState = WorkoutPlayerState.EXERCISE_DURATION;
        // TODO: start timer
        break;

      case ItemType.EXERCISE_REPS:
        this.subState = WorkoutPlayerState.EXERCISE_REPS;
        // nothing;
        break;

      case ItemType.BREAK:
        this.subState = WorkoutPlayerState.BREAK;
        // TODO: start timer
        break;
    }
  }

  goToNextMainState = () => {
    if (this.itemIndex >= this.workoutItems.length) {
      // fire finish
      return;
    }

    this.itemIndex++;
    this.childItemIndex = null;
    this.roundNumber = null;
    this.subState = null;

    switch (this.workoutItems[this.itemIndex].type) {
      case ItemType.EXERCISE_DURATION: this.initializeState(WorkoutPlayerState.EXERCISE_DURATION); break;
      case ItemType.EXERCISE_REPS: this.initializeState(this.mainState = WorkoutPlayerState.EXERCISE_REPS); break;
      case ItemType.BREAK: this.initializeState(this.mainState = WorkoutPlayerState.BREAK); break;
      case ItemType.AMRAP: this.initializeState(this.mainState = WorkoutPlayerState.AMRAP); break;
      case ItemType.ROUND: this.initializeState(WorkoutPlayerState.ROUND); break;
    }
  }

  goToPreviousMainState = () => {
    this.itemIndex--;
    this.childItemIndex = null;
    this.roundNumber = null;
    this.subState = null;

    switch (this.workoutItems[this.itemIndex].type) {
      case ItemType.EXERCISE_DURATION: this.initializeState(WorkoutPlayerState.EXERCISE_DURATION); break;
      case ItemType.EXERCISE_REPS: this.initializeState(this.mainState = WorkoutPlayerState.EXERCISE_REPS); break;
      case ItemType.BREAK: this.initializeState(this.mainState = WorkoutPlayerState.BREAK); break;
      case ItemType.AMRAP: this.initializeState(this.mainState = WorkoutPlayerState.AMRAP); break;
      case ItemType.ROUND: this.initializeState(WorkoutPlayerState.ROUND); break;
    }
  }

  next = () => {
    switch (this.mainState) {
      case WorkoutPlayerState.EXERCISE_DURATION:
      case WorkoutPlayerState.EXERCISE_REPS:
      case WorkoutPlayerState.BREAK:
        // check if last item
        if (this.itemIndex >= this.workoutItems.length - 1) {
          this.initializeState(WorkoutPlayerState.FINISHED);

          return;
        }

        this.goToNextMainState();

        break;

      case WorkoutPlayerState.ROUND:
        if (this.childItemIndex < this.workoutItems[this.itemIndex].round.items.length - 1) {
          // not the last sub item
          this.childItemIndex++;
          this.initializeSubState();
        } else {
          // last sub item
          if (this.roundNumber >= this.workoutItems[this.itemIndex].round.value) {
            // all rounds completed
            this.goToNextMainState();
          } else {
            this.childItemIndex = 0;
            this.roundNumber++;
            this.initializeSubState();
          }
        }
        break;

      case WorkoutPlayerState.AMRAP:
        if (this.amrapCompleted) {
          this.goToNextMainState();
        } else {
          this.childItemIndex = (this.childItemIndex + 1) % this.workoutItems[this.itemIndex].amrap.items.length;
          this.initializeSubState();
        }
        break;

      case WorkoutPlayerState.FINISHED:
        console.error("Workout has finished, there's no next")
        break;
    }

    DeviceEventEmitter.emit('workout-screen-items-update', this.getScreenItems());
  }

  previous = () => {
    switch (this.mainState) {
      case WorkoutPlayerState.EXERCISE_DURATION:
      case WorkoutPlayerState.EXERCISE_REPS:
      case WorkoutPlayerState.BREAK:
        if (this.itemIndex === 0) {
          // can't go back WTF
          console.error("There's no previous. impossible state");
          return;
        }

        this.goToPreviousMainState();

        break;

      case WorkoutPlayerState.ROUND:
        if (this.childItemIndex > 0) {
          // not the first sub item
          this.childItemIndex--;
          this.initializeSubState();
        } else {
          // first sub item
          if (this.roundNumber <= 1) {
            // this was the first round, fetch previous main state
            // TODO ???
            this.goToPreviousMainState();
          } else {
            this.childItemIndex = this.workoutItems[this.itemIndex].round.items.length - 1;
            this.roundNumber--;
            this.initializeSubState();
          }
        }
        break;

      case WorkoutPlayerState.AMRAP:
        // old logic
        // this.childItemIndex = this.childItemIndex - 1 < 0 ? this.workoutItems[this.itemIndex].amrap.items.length - 1 : this.childItemIndex - 1;
        // this.initializeSubState();

        // new logic - reset back!
        if (this.itemIndex === 0) {
          // can't go back WTF
          console.error("There's no previous. impossible state");
          return;
        }

        this.goToPreviousMainState();
        break;

      case WorkoutPlayerState.FINISHED:
        console.error("Workout has finished, there's no next")
        break;
    }

    DeviceEventEmitter.emit('workout-screen-items-update', this.getScreenItems());
  }

  handleScreenItemsUpdate = (handler) => {
    this.workoutScreenItemsUpdateSubscription = DeviceEventEmitter.addListener('workout-screen-items-update', handler);
  }

  handleNextItem = (handler) => {
    this.workoutScreenNextItemSubscription = DeviceEventEmitter.addListener('workout-screen-next-item', handler);
  }

  handleAmrapTick = (handler) => {
    this.amrapTickSubscription = DeviceEventEmitter.addListener('amrap-tick', handler);
  }

  handleRestart = (handler) => {
    this.restartSubscription = DeviceEventEmitter.addListener('restart', handler);
  }

  cleanupHandlers = () => {
    if (this.workoutScreenItemsUpdateSubscription) this.workoutScreenItemsUpdateSubscription.remove();
    if (this.workoutScreenNextItemSubscription) this.workoutScreenNextItemSubscription.remove();
    if (this.amrapTickSubscription) this.amrapTickSubscription.remove();
    if (this.restartSubscription) this.restartSubscription.remove();
  }

  restart = () => {
    DeviceEventEmitter.emit('restart');
  }

  goToNextItem = () => {
    if (!this.canSwipeUp) return;
    DeviceEventEmitter.emit('workout-screen-next-item');
  }

  finishAmrap = () => {
    if (this.secondsTimer) clearInterval(this.secondsTimer);
    this.secondsTimer = null;
    this.amrapFinished();
  }

  amrapFinished = () => {
    this.amrapCompleted = true;
    this.amrapPaused = false;
    DeviceEventEmitter.emit('workout-screen-items-update', this.getScreenItems());
    DeviceEventEmitter.emit('workout-screen-next-item');
  }

  canSwipeDown = () => {
    // swiping down = going to previous

    if (this.itemIndex > 0) return true;

    switch (this.mainState) {
      case WorkoutPlayerState.EXERCISE_DURATION:
      case WorkoutPlayerState.EXERCISE_REPS:
      case WorkoutPlayerState.BREAK:
        return false;

      case WorkoutPlayerState.ROUND:
        if (this.childItemIndex <= 0) {
          // first sub item
          if (this.roundNumber <= 1) {
            return false;
          }
        }
        break;

      case WorkoutPlayerState.AMRAP:
        return false;

      case WorkoutPlayerState.FINISHED:
        return false;
    }

    return true;
  }

  canSwipeUp = () => {
    // swiping up = going to next
    if (this.itemIndex < this.workoutItems.length - 1) return true;

    switch (this.mainState) {
      case WorkoutPlayerState.EXERCISE_DURATION:
      case WorkoutPlayerState.EXERCISE_REPS:
      case WorkoutPlayerState.BREAK:
        return false;
        break;

      case WorkoutPlayerState.ROUND:
        if (this.childItemIndex >= this.workoutItems[this.itemIndex].round.items.length - 1) {
          // last sub item
          if (this.roundNumber >= this.workoutItems[this.itemIndex].round.value) {
            // all rounds completed
            return false;
          }
        }
        break;

      case WorkoutPlayerState.AMRAP:
        if (this.amrapCompleted) {
          return this.itemIndex < this.workoutItems.length - 1;
        } else {
          return true;
        }
        break;

      case WorkoutPlayerState.FINISHED:
        return false;
        break;
    }

    return true;
  }
}

export const workoutPlayerService = new WorkoutPlayerService();
