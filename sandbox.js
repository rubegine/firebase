// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAhLzeAe6Ms9E18xlHZ2v5xZ-p9OG69uII",
    authDomain: "prova-524ad.firebaseapp.com",
    databaseURL: "https://prova-524ad-default-rtdb.firebaseio.com",
    projectId: "prova-524ad",
    storageBucket: "prova-524ad.appspot.com",
    messagingSenderId: "1046121071909",
    appId: "1:1046121071909:web:adb75670d673d3024346cc",
    measurementId: "G-XCKSRB4YE4"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const list = document.querySelector('ul');
const addRecipe = recipe => {
    let formattedTime = recipe.created_at.toDate();
    let html = `
        <li>
            <div>${recipe.title}</div>
            <div>${formattedTime}</div>
            <div>${recipe.author}</div>
        </li>
    `;
    console.log(html);
    list.innerHTML += html;
};

const form = document.querySelector('form');

// from.addEventListenner('submit', 0 => {
//     e.preventDefault();
//     let now = new Date();
//     const recipe = {
//         title: form.recipe.value,
//         created_at: firebase.firestore.Timestamp.from
//     }
// }

db.collection('recipes').get()
    .then(snapshot => {
        // console.log(snapshot.docs[0].data());
        snapshot.forEach(doc => {
            // console.log(doc.data());
            addRecipe(doc.data());
        });
    })
    .catch(err => console.log(err));