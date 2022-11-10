import {firebase} from './Connect';
import 'firebase/firestore';
import { doc, query, collection, where, getDocs } from "firebase/firestore";
import { disableExpoCliLogging } from 'expo/build/logs/Logs';

const DB = firebase.firestore();
const artistColl    = DB.collection('artist');
const musicColl     = DB.collection('music');
const playlistColl  = DB.collection('playlist');

export const addMusic = (data, success) => {
  musicColl
    .add(data)
      .then((data) => {
        return success(true)
      })
      .catch((err) => {
        console.error(err)
      })
}

export const getPopularArtist = (success) => {
  artistColl.orderBy("follower", "desc").get()
    .then((snapshot) => {
      var artistData = []
      snapshot.forEach((doc) => {
        var artist = doc.data()
        artist.id  = doc.id
        artistData.push(artist)
      })
      return success(artistData)
    })
    .catch((err) => {
      console.error('Cannot get Artist data')
    })
}

export const getArtist = (artist_id, success) => {
  artistColl.get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id == artist_id) {
          // console.log(doc.id)
          return success(doc.data())
        }
      })
    })
    .catch((err) => {
      console.error('Cannot get Artist data')
    })
}

export const getMusicFromArtist = (artist_id, success) => {
  const artistDocRef = doc(DB, 'artist', artist_id)
  musicColl.where("artist", "==", artistDocRef).get()
    .then((snapshot) => {
      var musicData = []
      snapshot.forEach((doc) => {
        musicData.push({
          id    : doc.data().id,
          name  : doc.data().name,
          image : doc.data().image,
          uri   : doc.data().url,
          genre : doc.data().genre,
          like  : doc.data().like,
          view  : doc.data().view,
        })
      })
      return success(musicData)
    })
    .catch((err) => {
      console.error('Cannot get Artist data')
    })
}

export const getMusicTest = () => {
  musicColl.get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id + ','+ doc.data().name+'/')
      })
    })
    .catch((err) => {
      console.error('Cannot get Artist data')
    })
}

// export const updatePosByKey = (data, success) => {
//   const docRef = accountColl
//     .doc(data.id)
//       .update(
//         {
//           realtime_pos : {
//             lat: data.lat,
//             long: data.long
//           }
//         }
//       )
//         .then((res) => {
//           success(true)
//         })
//         .catch((err) => {
//           console.error(err)
//         })
// }