import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD1xYhA1h0BAi-o5a2H0SW1DbQbBERGaww",
  authDomain: "fire9db-b7020.firebaseapp.com",
  projectId: "fire9db-b7020",
  storageBucket: "fire9db-b7020.firebasestorage.app",
  messagingSenderId: "794714821296",
  appId: "1:794714821296:web:34b86fe309ffe43c956175",
  measurementId: "G-KWXGN0RT2S"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Hent HTML-elementer
const nameBox = document.getElementById("nameBox");
const rollBox = document.getElementById("rollBox");
const secBox = document.getElementById("secBox");
const genBox = document.getElementById("genBox");

const insertBtn = document.getElementById("insertBtn");
const setBtn = document.getElementById("setBtn");
const selectBtn = document.getElementById("selectBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

// 1a. Legg til dokument med automatisk ID (addDoc)
async function addAutoId() {
  try {
    const colRef = collection(db, "students");
    const docRef = await addDoc(colRef, {
      name: nameBox.value,
      roll: rollBox.value,
      section: secBox.value,
      gender: genBox.value
    });
    console.log("Auto-ID opprettet:", docRef.id);
    alert("Data lagt til!");
  } catch (error) {
    console.error(error);
    alert("Feil ved lagring: " + error.message);
  }
}

// 1b. Legg til eller overskriv dokument med egendefinert ID (setDoc)
async function addCustomId() {
  if (!rollBox.value) {
    alert("Skriv inn et rollenummer som ID.");
    return;
  }
  try {
    const docRef = doc(db, "students", rollBox.value);
    await setDoc(docRef, {
      name: nameBox.value,
      roll: rollBox.value,
      section: secBox.value,
      gender: genBox.value
    });
    alert("Data lagret med ID!");
  } catch (error) {
    console.error(error);
    alert("Feil ved lagring: " + error.message);
  }
}

// 2. Hent dokument basert på rollenummer (getDoc)
async function getDocument() {
  if (!rollBox.value) {
    alert("Skriv inn rollenummeret du vil hente.");
    return;
  }
  try {
    const docRef = doc(db, "students", rollBox.value);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      nameBox.value = data.name || "";
      secBox.value = data.section || "";
      genBox.value = data.gender || "";
      alert("Data hentet!");
    } else {
      alert("Fant ingen dokument med dette rollenummeret.");
    }
  } catch (error) {
    console.error(error);
    alert("Feil ved henting: " + error.message);
  }
}

// 3. Oppdater felter i eksisterende dokument (updateDoc)
async function updateDocument() {
  if (!rollBox.value) {
    alert("Skriv inn rollenummeret du vil oppdatere.");
    return;
  }
  try {
    const docRef = doc(db, "students", rollBox.value);
    await updateDoc(docRef, {
      name: nameBox.value,
      section: secBox.value,
      gender: genBox.value
    });
    alert("Data oppdatert!");
  } catch (error) {
    console.error(error);
    alert("Feil ved oppdatering: " + error.message);
  }
}

// 4. Slett dokument etter å ha sjekket om det finnes (deleteDoc)
async function deleteDocument() {
  if (!rollBox.value) {
    alert("Skriv inn rollenummeret du vil slette.");
    return;
  }
  try {
    const docRef = doc(db, "students", rollBox.value);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      alert("Dokumentet finnes ikke.");
      return;
    }

    await deleteDoc(docRef);
    alert("Dokument slettet!");
  } catch (error) {
    console.error(error);
    alert("Feil ved sletting: " + error.message);
  }
}

// Koble funksjoner til knappene
insertBtn.addEventListener("click", addAutoId);
setBtn.addEventListener("click", addCustomId);
selectBtn.addEventListener("click", getDocument);
updateBtn.addEventListener("click", updateDocument);
deleteBtn.addEventListener("click", deleteDocument);