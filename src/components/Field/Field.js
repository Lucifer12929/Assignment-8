import React, { useState } from "react";
import "./Field.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Field = ({ field, fieldsIndex, setFieldsData }) => {
  const [data, setFieldData] = useState(field);

  const Options = ["String", "Number", "Boolean", "Object"];

  const handleFieldNameChange = (e) => {
    setFieldData({ ...data, name: e.target.value });
    setFieldsData(data, fieldsIndex);
  };
  const handleTypeChange = (e) => {
    const type = e.target.value;
    if (type === "Object") {
      setFieldData({
        ...data,
        type: type,
        objectData: [{ name: "name", type: "String", required: false }],
      });
    } else {
      if (data.objectData) {
        delete data.objectData;
      }
      setFieldData({ ...data, type: type });
    }
    setFieldsData(data, fieldsIndex);
  };
  const handleRequiredChange = () => {
    setFieldData({ ...data, required: !data.required });
    setFieldsData(data, fieldsIndex);
  };
  const handleDeleteField = () => {
    setFieldsData("deletedata", fieldsIndex);
  };
  const handleFieldsdata = (fobjectFeldData, objectFieldIndex) => {
    if (fobjectFeldData === "deletedata") {
      const currentdata = [...data.objectData];
      currentdata.splice(objectFieldIndex, 1);
      setFieldData({ ...data, objectData: currentdata });
      setFieldsData(data, fieldsIndex);
    } else {
      const currentdata = [...data.objectData];
      currentdata[objectFieldIndex] = fobjectFeldData;
      setFieldData({ ...data, objectData: currentdata });
      setFieldsData(data, fieldsIndex);
    }
  };

  const handleAddObjectField = () => {
    setFieldData({
      ...data,
      objectData: [
        ...data.objectData,
        { name: "name", type: "String", required: false },
      ],
    });
    setFieldsData(data, fieldsIndex);
  };

  return (
    <div className="field">
      <div className="field_component">
        <h1>{fieldsIndex + 1} </h1>
        <span>
          <div className="name">
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleFieldNameChange(e)}
            />
            <select
              name="type"
              value={data.type}
              onChange={(e) => handleTypeChange(e)}
              size={1}
            >
              {Options.map((option, optionIndex) => (
                <option key={optionIndex} value={option} className="option">
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="field_options">
            <div
              className="required_button"
              onClick={() => handleRequiredChange()}
            >
              Required:
              <span
                style={{
                  justifyContent: data.required ? "flex-end" : "flex-start",
                  backgroundColor: data.required ? "#16e9a2" : "#cccccc68",
                }}
                className="required_button-slider"
              >
                {" "}
                <span />{" "}
              </span>
            </div>
            {data.type === "Object" && (
              <AiOutlinePlusCircle
                className="add_button"
                onClick={() => handleAddObjectField()}
                size={40}
              />
            )}
            <button
              className="delete_button"
              onClick={() => handleDeleteField()}
            >
              {" "}
              Delete
            </button>
          </div>
        </span>
      </div>
      {data.type === "Object" &&
        data.objectData.length > 0 &&
        data.objectData.map((objectField, objectFieldIndex) => (
          <div className="object-field" key={objectFieldIndex}>
            <Field
              field={objectField}
              fieldsIndex={objectFieldIndex}
              key={objectFieldIndex}
              setFieldsData={(val, fIndex) => handleFieldsdata(val, fIndex)}
            />
          </div>
        ))}
    </div>
  );
};

export default Field;
