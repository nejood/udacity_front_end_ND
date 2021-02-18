// reference: https://github.com/visionmedia/supertest
import "babel-polyfill";
// Import the js file to test
import { app } from "../src/server/index"
const request = require('supertest')

describe('POST /data', function() {
    it('responds with json', function(done) {
      request(app)
        .post('/data')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });
