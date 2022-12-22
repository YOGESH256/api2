import mongoose from 'mongoose';
const DB_URI = 'mongodb://localhost:27017/trip';
  import  {Mockgoose } from 'mockgoose';


function connect() {
  return new Promise((resolve, reject) => {

    if (process.env.NODE_ENV === 'test') {

    let mockgoose = new Mockgoose(mongoose);


      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(DB_URI)
            .then((res, err) => {
              if (err) return reject(err);
              resolve();
            })
        })
    } else {
        mongoose.connect(DB_URI)
          .then((res, err) => {
            if (err) return reject(err);
            resolve('connected');
          })
    }
  });
}

function close() {
  return mongoose.disconnect();
}

export  default { connect, close };
