const pool = require('../utils/pool');

class Venue {
  id;
  venueName;
  artistName;
  scheduledTime;

  constructor(row) {
    this.id = row.id;
    this.venueName = row.venue_name;
    this.artistName = row.artist_name;
    this.scheduledTime = row.scheduled_time;
  }
}

module.exports = Venue;
