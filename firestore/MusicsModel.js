import {firebase} from './Connect';
import 'firebase/firestore';
import { doc, query, collection, where, getDocs, setDoc, updateDoc  } from "firebase/firestore";
import { disableExpoCliLogging } from 'expo/build/logs/Logs';

const DB = firebase.firestore();
const artistColl    = DB.collection('artist');
const musicColl     = DB.collection('music');
const playlistColl  = DB.collection('playlist');
const testColl  = DB.collection('test');

// ADD DATA
export const addData = (data, success) => {
  playlistColl
    .add(data)
      .then((data) => {
        return success(true)
      })
      .catch((err) => {
        console.error(err)
      })
}
// change string to int
export const changeType = () => {
  playlistColl.get()
    .then((snapshot) => {
      snapshot.forEach((mydoc) => {
        // console.log(doc.id)
        var int_like = parseInt(mydoc.data().like)
        var int_view = parseInt(mydoc.data().view)
        console.log( int_like + ' ' +int_view)
        var data = {
          like : int_like,
          view : int_view
        }
        // const docRef = doc(DB, 'music', doc.id)
        setDoc(doc(DB, "playlistOfficial", mydoc.id), data, { merge: true });
      });
    })
}

export const getPopularPlaylist = (success) => {
  playlistColl.orderBy("view", "desc").get()
    .then((snapshot) => {
      var playlistData = []
      snapshot.forEach((doc) => {
        if (doc.data().official == null) {
          var playlist = doc.data()
          playlist.id  = doc.id
          playlistData.push(playlist)
        }
      })
      return success(playlistData)
    })
    .catch((err) => {
      console.error('Cannot get Playlist data')
    })
}
export const getPopularPlaylistOfficial = (success) => {
  playlistColl.orderBy("view", "desc").get()
    .then((snapshot) => {
      var playlistData = []
      snapshot.forEach((doc) => {
        if (doc.data().official == true) {
          var playlist = doc.data()
          playlist.id  = doc.id
          playlistData.push(playlist)
        }
      })
      return success(playlistData)
    })
    .catch((err) => {
      console.error('Cannot get Playlist Official data', err)
    })
}
export const getPopularArtist = (success) => {
  artistColl.orderBy("follower", "desc").get()
    .then((snapshot) => {
      var artistData = []
      snapshot.forEach((doc) => {
        // filter out podcast artist
        if (doc.data().podcast == null) {
          var artist = doc.data()
          artist.id  = doc.id
          artistData.push(artist)
        }
      })
      return success(artistData)
    })
    .catch((err) => {
      console.error('Cannot get Artist data', err)
    })
}

export const getArtist = (artist_name, success) => {
  console.info('FB : getArtist')
  artistColl.get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id == artist_name) {
          // console.log(doc.id)
          return success(doc.data())
        }
      })
    })
    .catch((err) => {
      console.error('Cannot get Artist data')
    })
}

export const getMusicFromArtist = (artist_name, success) => {
  console.info('FB : getMusicFromArtist')
  musicColl.where("artist", "==", artist_name).get()
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

export const getPopularPodcast = (success) => {
  artistColl.orderBy("follower", "desc").get()
    .then((snapshot) => {
      var podcastData = [];
      snapshot.forEach((doc) => {
        // filter out podcast artist
        if (doc.data().podcast == true) {
          var artist = doc.data();
          artist.id = doc.id;
          podcastData.push(artist);
        }
      });
      return success(podcastData);
    })
    .catch((err) => {
      console.error("Cannot get Artist data", err);
    });
};

export const getPodcast = (artist_name, success) => {
  artistColl
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id == artist_name) {
          // console.log(doc.id)
          return success(doc.data());
        }
      });
    })
    .catch((err) => {
      console.error("Cannot get Artist data");
    });
};

export const getPodcastFromArtist = (artist_name, success) => {
  podcastColl.where("artist", "==", artist_name).get().then((snapshot) => {
      var podcastData2 = [];
      snapshot.forEach((doc) => {
        podcastData2.push({
          id: doc.data().id,
          name: doc.data().name,
          image: doc.data().image,
          uri: doc.data().url,
          genre: doc.data().genre,
          like: doc.data().like,
          view: doc.data().view,
        });
      });
      return success(podcastData2);
    })
    .catch((err) => {
      console.error("Cannot");
    });
};