var React   = require('react'),
    Client  = require('./client'),
    _ = require('underscore'),
    Fluxxor = require('fluxxor');

var constants = {
  SYNC_SLOTS : 'SYNC_SLOTS'
};

/**
 * Slots can run without games being assigned to them.
 * I've included a nested 'game' attribute for a slot for when game data is available.
 */
var GameStore = Fluxxor.createStore({
  initialize : function () {
    this.game = null;

    this.bindActions(
      constants.SYNC_SLOTS, this.onSlotsSync
    );
  },

  onSlotsSync : function (res) {
    var game = res.slot.game;

    if(!this.game || (game && game.id !== this.game.id)) {
      this.game = game;
      console.log('playing game', res.slot.game);
    }
  }
});

var SlotStore = Fluxxor.createStore({
  initialize : function () {
    this.slots = [];

    this.bindActions(
      constants.SYNC_SLOTS, this.onSlotsSync
    );
  },

  /**
   * Sync broadcasts are sent by the server at regular intervals but
   * can also be requested through the client. 
   *
   * The store should decide if it should use the slot data or not by checking if its current 
   * state matches the server window.
   */
  onSlotsSync : function (res) {
    var current = _.first(this.slots);

    if(!current || current.id !== res.slot.id) {
      console.log('adding slot ' + res.slot.id + ' to the queue.');
      this.slots.unshift(res.slot);
    } else {
      console.log('using slot id: ' + current.id);
    }
  }
});

var actions = {
  syncSlots : function (slot) {
    this.dispatch(constants.SYNC_SLOTS, slot);
  }  
};

/**
 * Wireup and bindings.
 */ 
var flux = new Fluxxor.Flux({
  SlotStore : new SlotStore(),
  GameStore : new GameStore()
}, actions);

window.flux = flux;

/**
 * Main component and entry.
 */
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Bingo = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('SlotStore')],

  getStateFromFlux : function() {
    var slotStore = this.getFlux().store('SlotStore');
    
    return {
      slots  : slotStore.slots
    };
  },

  render : function() {
    return (
      <div></div>
    );
  },

  componentDidMount : function () {
    var bingo = new Client();

    bingo.initialize({
      flux : this.getFlux()
    });
  }
});

React.render(<Bingo flux={flux} />, document.getElementById('bingo'));