process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js'
import jest from 'jest';

import redis from 'redis-mock'



import conn from '../config/db.js'
// jest.mock('redis', () => redis)
// jest.mock('redis', () => jest.requireActual('redis-mock'));


console.log(conn);

describe('GET all trips' , () => {
var token;
var redisClient;
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err));


       redisClient = redis.createClient();
       (async() => {

       await redisClient.connect().then(console.log("connect"))
       })();

      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieW9nZXNoa2hhdHJpMjY1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDg1NiIsIl9pZCI6IjYzYTQ0MWE5NWM0NTVjZWViMWRmZDg4MiIsImNyZWF0ZWRBdCI6IjIwMjItMTItMjJUMTE6Mzg6MTcuNjUxWiIsInVwZGF0ZWRBdCI6IjIwMjItMTItMjJUMTE6Mzg6MTcuNjUxWiIsIl9fdiI6MH0sImlhdCI6MTY3MTcwOTA5N30.gNgfFs7Ht3nrgy4o8oItBK9K-D2Q6WFl90X8w1bXOIg'
  })

  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  })

  it('OK, getting trips', async() => {
    await request(app).post('/api/trip/getUserTrips')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      "trip_name": "Maldives",
      "Route": "Mumbai to Maldives",
      "itinerary": [
        {

          "name" : " Maaya Thila",
          "done" : [

            {
              "date" : "27 dec 2019",
              "point" : "Arrive into Auckland and get transferred to your hotel. Rest of the day at leisure."

          }, {
              "date" : "29 dec 2019",
              "point" : "Scuba Diving at Maaya Thila"

           }]
    } ,
          {

              "name" : "Vaadhoo Island",
              "done" : [

                {
                  "date" : "27 dec 2019",
                  "point" : "Surfing in the Maldives"

              }]

            }

            ]


  ,

      "activities":  [{

              "point" : "Visit Glowing Beach on Vaadhoo Island",
               "duration" : "1 day"

          }, {
              "point" : "Surfing in the Maldives",
               "duration" : "1 day"

          }]

      }).
      then((res) => {


      })



    await request(app).get('/api/trip/')
      .then((res) => {
        const body = res.body;
      console.log(res.body.length);
        expect(body.length).to.equal(1);

      })
      .catch((err) => console.log(err));

  });

  it('OK, creating Tripol', async() => {

      await request(app).post('/api/trip/getUserTrips')
          .set({ Authorization: `Bearer ${token}` })
      .send({
        "trip_name": "Maldives",
        "Route": "Mumbai to Maldives",
        "itinerary": [
          {

            "name" : " Maaya Thila",
            "done" : [

              {
                "date" : "27 dec 2019",
                "point" : "Arrive into Auckland and get transferred to your hotel. Rest of the day at leisure."

            }, {
                "date" : "29 dec 2019",
                "point" : "Scuba Diving at Maaya Thila"

             }]
      } ,
            {

                "name" : "Vaadhoo Island",
                "done" : [

                  {
                    "date" : "27 dec 2019",
                    "point" : "Surfing in the Maldives"

                }]

              }

              ]


    ,

        "activities":  [{

                "point" : "Visit Glowing Beach on Vaadhoo Island",
                 "duration" : "1 day"

            }, {
                "point" : "Surfing in the Maldives",
                 "duration" : "1 day"

            }]

        })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('trip_name');
        expect(body).to.contain.property('Route');
        expect(body).to.contain.property('itinerary');

      })
      .catch((err) => console.log(err));
  });


})
