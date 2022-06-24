import { firebaseApp, FieldValue, storage } from '../lib/firebase'

export const isUserExist = async (number) => {
  const result = await firebaseApp
    .firestore()
    .collection('users')
    .where('number', '==', number)
    .get()
  return result.docs.length !== 0
}

// Get single Data
export const getDataByUid = async (uid, col) => {
  const result = await firebaseApp.firestore().collection(col).doc(uid).get()
  if (result.exists) {
    return result.data()
  }
}

export const fetchConnectionData = async (uid, type) => {
  const query = await firebaseApp.firestore().collection(type).doc(uid).get()
  // const data = query.map((doc) => doc.data());
  if (query.exists) {
    const waitdata = await query.data()
    const data = waitdata.data
    return data
  }
}

export const removeRequest = async (uid, deleteId) => {
  const newdata1 = await fetchConnectionData(uid, 'requested')
  const newdata2 = await fetchConnectionData(deleteId, 'requested')
  await firebaseApp
    .firestore()
    .collection('requested')
    .doc(uid)
    .update({
      data: newdata1.filter((item) => item.uid !== deleteId),
    })
  await firebaseApp
    .firestore()
    .collection('requested')
    .doc(deleteId)
    .update({
      data: newdata2.filter((item) => item.uid !== uid),
    })
}

export const removeConnection = async (uid, deleteId) => {
  const data1 = await fetchConnectionData(uid, 'connections')
  const data2 = await fetchConnectionData(deleteId, 'connections')
  await firebaseApp
    .firestore()
    .collection('connections')
    .doc(uid)
    .update({
      data: data1.filter((item) => item.uid !== deleteId),
    })
  await firebaseApp
    .firestore()
    .collection('connections')
    .doc(deleteId)
    .update({
      data: data2.filter((item) => item.uid !== uid),
    })
}

export const addToConnect = async (
  uid,
  userName,
  userImg,
  connectId,
  connectName,
  connectImg
) => {
  await firebaseApp
    .firestore()
    .collection('requested')
    .doc(uid)
    .set(
      {
        data: FieldValue.arrayUnion({
          uid: connectId,
          name: connectName,
          img: connectImg,
          type: 'sent',
        }),
      },
      { merge: true }
    )
  await firebaseApp
    .firestore()
    .collection('requested')
    .doc(connectId)
    .set(
      {
        data: FieldValue.arrayUnion({
          uid: uid,
          name: userName,
          img: userImg,
          type: 'request',
        }),
      },
      {
        merge: true,
      }
    )
  alert('Done')
}

export const acceptConnect = async (
  uid,
  userName,
  userImg,
  connectId,
  connectName,
  connectImg
) => {
  await firebaseApp
    .firestore()
    .collection('connections')
    .doc(uid)
    .set(
      {
        data: FieldValue.arrayUnion({
          uid: connectId,
          name: connectName,
          img: connectImg,
        }),
      },
      {
        merge: true,
      }
    )
  await firebaseApp
    .firestore()
    .collection('connections')
    .doc(connectId)
    .set(
      {
        data: FieldValue.arrayUnion({
          uid,
          name: userName,
          img: userImg,
        }),
      },
      {
        merge: true,
      }
    )
  removeRequest(uid, connectId)
}

export const registerUser = async (data) => {
  const {
    name,
    email,
    city,
    age,
    employement,
    profileFor,
    gender,
    userId,
    number,
  } = data
  let profileUrl = ''
  if (gender === 'male') {
    profileUrl = '/male.png'
  } else {
    profileUrl = '/female.png'
  }
  await firebaseApp.firestore().collection('users').doc(userId).set({
    userId,
    number,
    name,
    city: city.trim().toLowerCase(),
    age,
    gender,
    employement,
    profileFor,
    profileUrl,
    plan: 'basic',
    email: email.trim().toLowerCase(),
    dateCreated: Date.now(),
    // connection: [],
    // favourite: [],
  })

  await firebaseApp.auth().currentUser.updateProfile({
    displayName: name,
  })
}

export const addAdditionalData = async (uid, data) => {
  let isSocial = ''
  let isVideo = ''
  const { twitter, instagram, facebook, linkedin, videolink } = data
  if (
    twitter !== '' ||
    instagram !== '' ||
    facebook !== '' ||
    linkedin !== ''
  ) {
    isSocial = 'yes'
  }
  if (videolink !== '') {
    isVideo = 'yes'
  }

  await firebaseApp
    .firestore()
    .collection('additional')
    .doc(uid)
    .set(
      {
        ...data,
        userId: uid,
      },
      { merge: true }
    )
  if (isSocial || isVideo) {
    await firebaseApp.firestore().collection('users').doc(uid).update({
      isSocial,
      isVideo,
    })
  }
}

export const uploadProfile = async (uid, file) => {
  const uploadTask = storage.ref(`profile/${uid}`).put(file)
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
    },
    (err) => console.error(err),
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        return downloadURL
      })
    }
  )
}

export const updateProfilePic = async (uid, url) => {
  await firebaseApp.firestore().collection('users').doc(uid).update({
    profileUrl: url,
  })
}

export const addAdditionalFile = async (uid, url) => {
  await firebaseApp.firestore().collection('users').doc(uid).set(
    {
      additonalFileUrl: url,
    },
    {
      merge: true,
    }
  )
}

export const getProfilePic = async (uid) => {
  const result = await firebaseApp
    .firestore()
    .collection('users')
    .where('userId', '==', uid)
    .get()

  if (!result.empty) {
    return result.docs[0].data().profileUrl
  } else {
    return ''
  }
}

export const isServiceExist = async (number) => {
  const result = await firebaseApp
    .firestore()
    .collection('serviceProvider')
    .where('number', '==', number)
    .get()
  return result.docs.length !== 0
}

export const createServiceProvider = async (data) => {
  await firebaseApp.firestore().collection('serviceProvider').add(data)
}

// Fetching all search Data
export const fetchAllUsers = async (uid) => {
  const data = await firebaseApp
    .firestore()
    .collection('users')
    .where('userId', '!=', uid)
    .get()
  if (data.empty) {
    return []
  } else {
    const result = data.docs.map((item) => item.data())
    return result
  }
}

// Fetching filter Data
export const fetchFilterData = async (
  age,
  city,
  employement,
  profileFor,
  gender,
  isSocial,
  isVideo,
  uid
) => {
  let query = firebaseApp.firestore().collection('users')

  if (gender) {
    query = query.where('gender', '==', gender)
  }
  if (employement) {
    query = query.where('employement', '==', employement)
  }
  if (gender) {
    query = query.where('gender', '==', gender)
  }
  if (profileFor) {
    query = query.where('profileFor', '==', profileFor)
  }
  if (city) {
    query = query.where('city', '==', city)
  }
  if (isSocial) {
    query = query.where('isSocial', '==', isSocial)
  }
  if (isVideo) {
    query = query.where('isVideo', '==', isVideo)
  }

  if (age) {
    const [min, max] = age.split('-')
    query = query.where('age', '>=', min)
    query = query.where('age', '<=', max)
  }

  const data = await query.get()
  if (!data.empty) {
    const result = data.docs
      .map((item) => item.data())
      .filter((item) => item.userId !== uid)
    return result
  } else {
    return []
  }
}

// Check Fav
export const checkFav = async (userUid, targetUid) => {
  const result = await firebaseApp
    .firestore()
    .collection('users')
    .doc(userUid)
    .collection('favourite')
    .doc(targetUid)
    .get()
  return result.exists
}
export const addToFav = async (
  userId,
  targetUid,
  name,
  profileUrl,
  age,
  city,
  employement
) => {
  await firebaseApp
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('favourite')
    .doc(targetUid)
    .set(
      {
        name,
        profileUrl,
        age,
        city,
        employement,
        userId: targetUid,
      },
      {
        merge: true,
      }
    )
}

export const removeFav = async (userId, targetUid) => {
  await firebaseApp
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('favourite')
    .doc(targetUid)
    .delete()
}
export const getFavList = async (userId) => {
  const result = await firebaseApp
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('favourite')
    .get()
  if (!result.empty) {
    return result.docs.map((item) => item.data())
  } else {
    return []
  }
}
