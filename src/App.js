import React, { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { firestore } from "./Firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function App() {
  const [vehicle, setVehicle] = useState(null);
  const [vehicleList, setVehicleList] = useState([]);
  const [lastSaturday, setLastSaturday] = useState(null);
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  function addVehicle(vehicle) {
    if (vehicle.to > lastSaturday) {
      setVehicle(vehicle);
      setVehicleList((prev) => [...prev, vehicle]);
    }
  }

  // add
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (vehicle) {
          const docRef = await addDoc(
            collection(firestore, "vehicles"),
            vehicle
          );
          console.log("Document written with ID: ", docRef.id);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    fetchData();
  }, [vehicle]);

  //get last saturday

  useEffect(() => {
    async function getLastSaturday() {
      // Get today's date
      var today = new Date();

      // Calculate the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      var dayOfWeek = today.getDay();

      // Calculate the number of days to subtract to get to the last Saturday
      var daysToSubtract = dayOfWeek + 1; // Add 1 to account for the current day

      // Create a new Date object for the last Saturday
      var lastSaturday = new Date(today);
      lastSaturday.setDate(today.getDate() - daysToSubtract);

      setLastSaturday(lastSaturday.getTime());
    }

    getLastSaturday();
  }, []);

  // Auth

  useEffect(()=>{

    const email = "amanvr2@gmail.com";
    const password = "Canadianvr2@";

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const us = userCredential.user;
        setUser(us);
      })
      .catch((error) => {
      
        console.log(error.message);
      });


  },[])

  // fetch

  useEffect(() => {
    
    async function getVehicles() {
      setIsLoading(true)
      const data = [];
      const vehicleRef = collection(firestore, "vehicles");
      const queryData = query(
        vehicleRef,
        where("to", ">", lastSaturday),
        orderBy("to", "asc")
      );
      const querySnapshot = await getDocs(queryData);

      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setVehicleList(data);
      setIsLoading(false)
    }

    if(user){
      getVehicles();
    }

  }, [lastSaturday, user]);

  return (
    <div className="App">
      <Header />
      <Dashboard addVehicle={addVehicle} vehicleData={vehicleList} isLoading = {isLoading}/>
    </div>
  );
}

export default App;
