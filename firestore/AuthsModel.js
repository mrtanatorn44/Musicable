import firebaseApp from './Connect';
import 'firebase/firestore';

const DB = firebaseApp.firestore();
const userCollumn = DB.collection('user');

export const addUser = (key, success) => {
  const docRef = userCollumn
    .add(key)
      .then((user) => {
        // console.log(acc)
        success(user.id)
      })
      .catch((err) => {
        console.error(err)
      })
}

export const getUserByKey = (key, success) => {
  const docRef = userCollumn
    .get()
      .then((res) => {
        var temp = res.filter(user => user.data().key == key);
        console.log(res)
        return
        // console.log('Total users: ', res.size);
        var isKeyExist = false;
        console.log(res)
        res.forEach(user => {
          if (user.data().key == key) {
            var data = user.data()
            data.id = user.id;
            success(data)
            isKeyExist = true;
          }
          // console.log('User ID: ', user.id, user.data());
        });
        if (!isKeyExist) {
          success(false)
        }
      });
}

export const updatePosByKey = (data, success) => {
  const docRef = accountColl
    .doc(data.id)
      .update(
        {
          realtime_pos : {
            lat: data.lat,
            long: data.long
          }
        }
      )
        .then((res) => {
          success(true)
        })
        .catch((err) => {
          console.error(err)
        })
}