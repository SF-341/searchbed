import firebaseConfig, { firestore } from '../config'

class GetUserprofile {
    constructor() {
        this.Auth = firebaseConfig.auth();
        this.user = this.Auth.currentUser;
        this.id = '';
        this.ListUser = {};
        this.refUser = firestore.collection("User")
    }



    getUser(Temp) {
        this.refUser.onSnapshot(querySnapshot => {
            const ListSnapshot = querySnapshot.docs;
            ListSnapshot.forEach(doc => {
                if (doc.data().email === Temp) {
                    this.id = doc.id;
                    this.ListUser = doc.data();
                }
            })
        })
    }
}
export default new GetUserprofile();