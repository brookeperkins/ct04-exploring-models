const fs = require('fs');
const Venue = require('../lib/models/venues');
const pool = require('../lib/utils/pool');

describe('Venue model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  it('creates a venue with the insert method', () => {

  });
});
