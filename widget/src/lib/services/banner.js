import { db } from '../firebase';

export function getBanner(id) {
  return db
    .collection('banners')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        throw new Error('No banner found with that id');
      }
    });
}
