import React, { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { firestore } from "./Firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";

function App() {
  const [vehicle, setVehicle] = useState(null);
  const [vehicleList, setVehicleList] = useState([]);
  const [lastSaturday, setLastSaturday] = useState(null);

  function addVehicle(vehicle) {
    if (vehicle.to > lastSaturday) {
      setVehicle(vehicle);
      setVehicleList((prev) => [vehicle, ...prev]);
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

      // Output the last Saturday's date
      console.log(lastSaturday.getTime());
      setLastSaturday(lastSaturday.getTime());
    }

    getLastSaturday();
  }, []);

  // fetch

  useEffect(() => {
    const data = [];
    async function getVehicles() {
      console.log(lastSaturday);
      const vehicleRef = collection(firestore, "vehicles");
      const queryData = query(
        vehicleRef,
        where("to", ">", lastSaturday),
        orderBy("to", "asc")
      );
      const querySnapshot = await getDocs(queryData);

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        data.push(doc.data());
      });

      setVehicleList(data);
    }

    if (lastSaturday !== null) {
      getVehicles();
    }
  }, [lastSaturday]);

  return (
    <div className="App">
      <Dashboard addVehicle={addVehicle} vehicleData={vehicleList} />
    </div>
  );
}

export default App;
