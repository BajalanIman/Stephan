import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [Person, setPerson] = useState([]);

  useEffect(() => {
    const fetchAllperson = async () => {
      try {
        const res = await axios.get("http://localhost:8800/student");
        setPerson(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllperson();
  }, []);

  return (
    <>
      {Person.map((pers, index) => (
        <div key={index}>
          <div>
            <h3>
              {pers.name} {pers.lastname}
            </h3>
          </div>
          <img
            src={`/images/${pers.Picture}`}
            alt="My Image"
            style={{ width: "200px", height: "150px" }}
          />
        </div>
      ))}
      <p>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
