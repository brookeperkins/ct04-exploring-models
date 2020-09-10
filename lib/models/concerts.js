const pool = require('../utils/pool');

class Concert {
  id;
  venueId;
  artistName;
  rescheduledTime;

  constructor(row) {
    this.id = row.id;
    this.venueId = row.venue_id;
    this.artistName = row.artist_name;
    this.rescheduledTime = row.rescheduled_time;
  }

  static async insert(concert) {
    const { rows } = await pool.query(
      'INSERT INTO concerts (venue_id, artist_name, rescheduled_time) VALUES ($1, $2, $3) RETURNING *', [concert.venueId, concert.artistName, concert.rescheduledTime]
    );
    
    return new Concert(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM concerts WHERE id = $1', [id]
    );
    if(!rows[0]) return null;
    else return new Concert(rows[0]);
  }

  static async find(){
    const { rows } = await pool.query(
      'SELECT * FROM concerts '
    );
    return rows.map(row => new Concert(row));
    
  }
  static async update(id, updatedConcert){

    const { rows } = await pool.query(
      `UPDATE concerts
       SET venue_id = $1,
           artist_name = $2,
           rescheduled_time = $3
        WHERE id = $4
        RETURNING *
        `, [updatedConcert.venueId, updatedConcert.artistName, updatedConcert.rescheduledTime, id]
    );

    return new Concert(rows[0]);
  }

  
  static async delete(id){
    const { rows } = await pool.query(
      'DELETE FROM concerts WHERE id = $1 RETURNING *', [id]
    );
    return new Concert(rows[0]);
  }
}

module.exports = Concert;
