import React, { useEffect, useState } from "react";
import Field from "../Field/Field";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./Home.css";

const Home = () => {
  const [Fields, setFields] = useState([]);

  const handleAddField = () => {
    setFields([...Fields, { name: "person", type: "String", required: false }]);
  };

  const handleFieldsdata = (data, fIndex) => {
    const currentdata = [...Fields];
    if (data === "deletedata") {
      currentdata.splice(fIndex, 1);
    } else {
      currentdata[fIndex] = data;
    }
    setFields(currentdata);
  };
  return (
    <div className="Home">
      <div className="Home_top">
        <span>
          <p>Field name and type </p>{" "}
          <AiOutlinePlusCircle
            className="add_button"
            onClick={() => handleAddField()}
            size={40}
          />
        </span>
        <div className="allFields">
          {Fields.map((field, fieldsIndex) => (
            <Field
              field={field}
              fieldsIndex={fieldsIndex}
              key={fieldsIndex}
              setFieldsData={(data, fIndex) => handleFieldsdata(data, fIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
