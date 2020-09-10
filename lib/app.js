const express = require('express');
const app = express();
const Venue = require('./models/venues');

app.use(express.json());

app.post('/api/venues', async(req, res, next) => {
  try {
    const createdVenue = await Venue.insert(req.body);
    res.send(createdVenue);
  } catch(error) {
    next(error);
  }
});

app.get('/api/venues/:id', async(req, res, next) => {
  try {
    const venueId = await Venue.findById(req.params.id);

    res.send(venueId);

  } catch (error) {
    next(error);
  }
});

app.put('/api/venues/:id', async(req, res, next) => {
  try {
    const updatedVenue = await Venue.update(req.params.id, req.body);

    res.send(updatedVenue);

  } catch (error) {
    next(error);
  }
});

app.delete('/api/venues/:id', async(req, res, next) => {
  try {
    const deletedVenue = await Venue.delete(req.params.id);
    res.send(deletedVenue);
  } catch(error) {
    next(error);
  }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
