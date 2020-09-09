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

  static async insert(venue) {
    const { rows } = await pool.query(
      'INSERT INTO venues (venue_name, artist_name, scheduled_time) VALUES ($1, $2, $3) RETURNING *', [venue.venueName, venue.artistName, venue.scheduledTime]
    );
    
    return new Venue(rows[0]);

  }
}

module.exports = Venue;
