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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.collection('recipes');

const list = document.querySelector('ul');
const form = document.querySelector('form');
const unsubscribeBtn = document.querySelector('.unsubscribe');

// add recipes
const addRecipe = (recipe, id) => {
   let dataGuardada = recipe.created_at.toDate();
   let diaData = dataGuardada.getDate();
   let mesData = dataGuardada.getMonth() + 1;
   let anyData = dataGuardada.getFullYear();
   diaData = (diaData < 10) ? "0" + diaData : diaData;
   mesData = (mesData < 10) ? "0" + mesData : mesData;
   let dataAMostrar = diaData + "/"
      + mesData + "/"
      + anyData;

   let html = `
         <li data-id="${id}">
            <b>${recipe.title}</b> (${dataAMostrar})
            <button class="btn btn-danger btn-sm my-2">delete</button>
        </li>
    `;

   list.innerHTML += html;
};

const deleteRecipe = id => {
   const recipes = document.querySelectorAll('li');
   recipes.forEach(recipe => {
      if (recipe.getAttribute('data-id') === id) {
         recipe.remove();
      }
   });
};

// get recipes
// db.collection('recipes').get()
//     .then(snapshot => {
//         snapshot.forEach(doc => {
//             // console.log(doc.data());
//             // console.log("doc.id = " + doc.id);
//             addRecipe(doc.data(), doc.id);
//         });
//     })
//     .catch(err => console.log(err));

// real time listener
const unsubscribe = db.collection('recipes').onSnapshot(snapshot => {
   // console.log(snapshot.docChanges());
   snapshot.docChanges().forEach(change => {
      // console.log(change);
      const doc = change.doc;
      // console.log(doc);
      if (change.type === 'added') {
         addRecipe(doc.data(), doc.id);
      } else if (change.type === 'removed') {
         deleteRecipe(doc.id);
      }
   });
});


// add documents
form.addEventListener('submit', e => {
   e.preventDefault();
   let now = new Date();

   const recipe = {
      title: form.recipe.value,
      author: "Joan",
      created_at: firebase.firestore.Timestamp.fromDate(now)
   };
   form.recipe.value = "";
   // form.formEntradaAutor.value = "";
   db.collection('recipes').add(recipe)
      .then(() => console.log('Recepta afegida!'))
      .catch(err => console.log(err))
});

// delete documents
// delete documents
list.addEventListener('click', e => {
   // console.log(e);
   if (e.target.tagName === 'BUTTON') {
      const id = e.target.parentElement.getAttribute('data-id');
      // console.log(id);
      db.collection('recipes').doc(id).delete()
         .then(() => console.log('recipe deleted!'))
         .catch((err) => console.log(err));
   }
});

// // unsubscribe from database changes
// unsubscribeBtn.addEventListener('click', () => {
//    unsubscribe();
//    console.log('you unsubscribed from all changes');
// });