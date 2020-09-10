const fs = require('fs');
const Venue = require('../lib/models/venues');
const pool = require('../lib/utils/pool');
// const { create } = require('domain');

describe('Venue model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  it('creates a venue with the insert method', async() => {
    const createdVenue = await Venue.insert({
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'
    });
    const { rows } = await pool.query(
      'SELECT * FROM venues WHERE id = $1', [createdVenue.id]);

    expect(rows[0]).not.toBeUndefined();
    expect(createdVenue).toEqual({
      id: expect.any(String),
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'
    });
  });



  it('finds a venue by id', async() => {
    const createdVenue = await Venue.insert({
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'

    });
   
    const foundVenue = await Venue.findById(createdVenue.id);
    
    expect(foundVenue).toEqual({
      id: createdVenue.id,
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'

    });
  });

  it('it returns null if it cannot find a venue by id', async() => {
    const createdVenue = await Venue.findById(666);
    expect(createdVenue).toEqual(null);
  });
  
  it('finds all venues', async() => {
    await Promise.all([
      Venue.insert({
        venueName: 'Moda Center',
        artistName: 'Neil Diamond',
        scheduledTime: '03-24-20 at 7:00 PM'
      }),
      Venue.insert({
        venueName: 'Mississippi Studios',
        artistName: 'Big Business',
        scheduledTime: '03-20-20 at 7:00 PM'
      }),

      Venue.insert({
        venueName: 'Moda Center',
        artistName: 'Tool',
        scheduledTime: '04-24-20 at 9:00 PM'
      })


    ]);

    const venues = await Venue.find();

    expect(venues).toEqual(expect.arrayContaining([
      {  id: expect.any(String),
        venueName: 'Moda Center',
        artistName: 'Neil Diamond',
        scheduledTime: '03-24-20 at 7:00 PM' 
      },
      {  id: expect.any(String),
        venueName: 'Mississippi Studios',
        artistName: 'Big Business',
        scheduledTime: '03-20-20 at 7:00 PM' 
      },
      {  id: expect.any(String),
        venueName: 'Moda Center',
        artistName: 'Tool',
        scheduledTime: '04-24-20 at 9:00 PM' 
      }
    ]));

  });
  it('updates a row by id', async() => {

    const createdVenue = await Venue.insert({
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'

    });
    const updatedVenue = await Venue.update(createdVenue.id, { 
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '04-20-21 at 7:00 PM'
    });

    expect(updatedVenue).toEqual({
      id: createdVenue.id,
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '04-20-21 at 7:00 PM'
    });

  
  });

  it('deletes a row by id', async() => {
    const createdVenue = await Venue.insert({
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'
    });
    const deletedVenue = await Venue.delete(createdVenue.id);
    expect(deletedVenue).toEqual({
      id: createdVenue.id,
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'

    });


  });

});
