const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Venue = require('../lib/models/venues');
// const Venue = require('../lib/models/venues');

describe('04-exploring-models routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  
  it('create a new Venue via POST', async() => {
    const response = await request(app)
      .post('/api/venues')
      .send({ venueName: 'Moda Center', artistName: 'Neil Diamond', scheduledTime: '03-24-20 at 7:00 PM' });


    expect(response.body).toEqual({
      id: expect.any(String),
      venueName: 'Moda Center',
      artistName: 'Neil Diamond', 
      scheduledTime: '03-24-20 at 7:00 PM'
    });
  });

  it('gets a Venue by id via GET', async() => {
    const createdVenue = await Venue.insert({
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'
    });

    const response = await request(app)
      .get(`/api/venues/${createdVenue.id}`);

    expect(response.body).toEqual({
      id: createdVenue.id,
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'
    });

  });

  it('deletes a Venue by id via delete', async() => {
    const createdVenue = await Venue.insert({
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'
    });
    const response = await request(app)
      .delete(`/api/venues/${createdVenue.id}`);
    expect(response.body).toEqual({
      id: createdVenue.id,
      venueName: 'Moda Center',
      artistName: 'Neil Diamond',
      scheduledTime: '03-24-20 at 7:00 PM'
    });
  });
});
