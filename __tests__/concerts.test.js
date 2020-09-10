const fs = require('fs');
const Concert = require('../lib/models/concerts');
const pool = require('../lib/utils/pool');
const Venue = require('../lib/models/venues');
// const { create } = require('domain');

describe('Concert model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  it('creates a rescheduled concert with the insert method', async() => {
    const venue = await Venue.insert({
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'
    });

    const createdConcert = await Concert.insert({
      venueId: venue.id,
      artistName: 'Neil Diamond',
      rescheduledTime: '03-24-21 at 7:00 PM'
    });

    const { rows } = await pool.query(
      'SELECT * FROM venues WHERE id = $1', [createdConcert.id]);

    expect(rows[0]).not.toBeUndefined();
    expect(createdConcert).toEqual({
      id: expect.any(String),
      venueId: venue.id,
      artistName: 'Neil Diamond',
      rescheduledTime: '03-24-21 at 7:00 PM'
    });
  });


  it('finds all concerts linked to a venue by Id', async() => {
    const venue = await Venue.insert({
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'
    });

    const createdConcert = await Concert.insert({
      venueId: venue.id,
      artistName: 'Neil Diamond',
      rescheduledTime: '03-24-21 at 7:00 PM'
    });
   
    const foundConcert = await Concert.findById(createdConcert.id);
    
    expect(foundConcert).toEqual({
      id: createdConcert.id,
      venueId: venue.id,
      artistName: 'Neil Diamond',
      rescheduledTime: '03-24-21 at 7:00 PM'

    });
  });

  it('it returns null if it cannot find a concert by id', async() => {
    const createdConcert = await Concert.findById(666);
    expect(createdConcert).toEqual(null);
  });
  

  it('finds all venues', async() => {
    const venue = await Venue.insert({
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'
    });

    await Promise.all([
      Concert.insert({
        venueId: venue.id,
        artistName: 'Neil Diamond',
        rescheduledTime: '03-24-21 at 7:00 PM'
      }),
      Concert.insert({
        venueId: venue.id,
        artistName: 'Big Business',
        rescheduledTime: '03-20-21 at 7:00 PM'
      }),

      Concert.insert({
        venueId: venue.id,
        artistName: 'Tool',
        rescheduledTime: '04-24-21 at 9:00 PM'
      })
    ]);

    const venues = await Concert.find();

    expect(venues).toEqual(expect.arrayContaining([
      {  id: expect.any(String),
        venueId: venue.id,
        artistName: 'Neil Diamond',
        rescheduledTime: '03-24-21 at 7:00 PM' 
      },
      {  id: expect.any(String),
        venueId: venue.id,
        artistName: 'Big Business',
        rescheduledTime: '03-20-21 at 7:00 PM' 
      },
      {  id: expect.any(String),
        venueId: venue.id,
        artistName: 'Tool',
        rescheduledTime: '04-24-21 at 9:00 PM' 
      }
    ]));

  });


  it('updates a row by id', async() => {
    const venue = await Venue.insert({
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'
    });

    const createdConcert = await Concert.insert({
      venueId: venue.id,
      artistName: 'Neil Diamond',
      rescheduledTime: '03-24-21 at 7:00 PM'

    });
    const updatedConcert = await Concert.update(createdConcert.id, { 
      venueId: venue.id,
      artistName: 'Neil Diamond',
      rescheduledTime: '04-20-21 at 7:00 PM'
    });

    expect(updatedConcert).toEqual({
      id: createdConcert.id,
      venueId: venue.id,
      artistName: 'Neil Diamond',
      rescheduledTime: '04-20-21 at 7:00 PM'
    });

  
  });

  it('deletes a row by id', async() => {
    const venue = await Venue.insert({
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'
    });

    const createdConcert = await Concert.insert({
      venueId: venue.id,
      artistName: 'Neil Diamond',
      rescheduledTime: '03-24-21 at 7:00 PM'
    });

    const deletedConcert = await Concert.delete(createdConcert.id);

    expect(deletedConcert).toEqual({
      id: createdConcert.id,
      venueId: venue.id,
      artistName: 'Neil Diamond',
      rescheduledTime: '03-24-21 at 7:00 PM'
    });
  });

});
