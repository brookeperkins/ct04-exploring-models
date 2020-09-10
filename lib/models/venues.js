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
  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM venues WHERE id = $1', [id]
    );
    if(!rows[0]) return null;
    else return new Venue(rows[0]);
  }

  static async find(){
    const { rows } = await pool.query(
      'SELECT * FROM venues '
    );
    return rows.map(row => new Venue(row));
    
  }
  static async update(id, updatedVenue){

    const { rows } = await pool.query(
      `UPDATE venues
       SET venue_name = $1,
           artist_name = $2,
           scheduled_time = $3
        WHERE id = $4
        RETURNING *
        `, [updatedVenue.venueName, updatedVenue.artistName, updatedVenue.scheduledTime, id]


    );
    return new Venue(rows[0]);
  }


}

module.exports = Venue;
