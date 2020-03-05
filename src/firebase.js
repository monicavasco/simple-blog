import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

//Configurações do seu projeto
  let firebaseConfig = {
    apiKey: "AIzaSyD2-YAsJ4nz2gWj99he7I2ynKm8DoknmD4",
    authDomain: "reactapp-234d9.firebaseapp.com",
    databaseURL: "https://reactapp-234d9.firebaseio.com",
    projectId: "reactapp-234d9",
    storageBucket: "reactapp-234d9.appspot.com",
    messagingSenderId: "703735909478",
    appId: "1:703735909478:web:5c09cd8406d3a4ad3671a7"
  };
  

  class Firebase{
    constructor(){
      app.initializeApp(firebaseConfig);

      this.app = app.database();
      this.storage = app.storage();
  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  logout(){
    return app.auth().signOut();
  }

  async register(nome, email, password){
    await app.auth().createUserWithEmailAndPassword(email, password)

    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome: nome
    })

  }

  isInitialized(){
    return new Promise(resolve =>{
        app.auth().onAuthStateChanged(resolve);
    })
}

  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email
  }

  getCurrentUid(){
    return app.auth().currentUser && app.auth().currentUser.uid
  }

  async getUserName(callback){
    if(!app.auth().currentUser){
      return null;
    }
    const uid = app.auth().currentUser.uid;
    await app.database().ref("usuarios").child(uid)
    .once('value').then(callback);
  }
}

export default new Firebase();