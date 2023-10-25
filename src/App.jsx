// Import necessary styles and libraries
import "./styles.css";
import { React, useState } from "react";
import Header from "./components/Header";
import CopyToClipboardButton from "./components/CopyToClipboard";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Button, IconButton } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Define the main component, App
function App() {
  // Define and initialize states for user input and filtered circuits
  const [userInput, setUserInput] = useState("");
  const [filteredONESCircuits, setFilteredONESCircuits] = useState("");
  const [filteredOpticalCircuits, setFilteredOpticalCircuits] = useState("");
  const [filteredLegacyOpticalCircuits, setFilteredLegacyOpticalCircuits] =
    useState("");

  // Event handler for user input changes
  const handleChange = (event) => {
    setUserInput(event.target.value);
    console.log(userInput);
  };

  // Function to reset all fields
  const resetFields = () => {
    // Reset the user input and filtered values
    setUserInput("");
    setFilteredONESCircuits("");
    setFilteredOpticalCircuits("");
    setFilteredLegacyOpticalCircuits("");
  };

  // Combine filtered circuits into a single string for clipboard copying
  const clipboardList = [
    filteredONESCircuits,
    filteredOpticalCircuits,
    filteredLegacyOpticalCircuits,
  ].join("\n");

  // Function to filter and categorize circuits based on input
  const handleFilter = () => {
    const ONESList = [];
    const OpticalList = [];
    const legacyOpticalList = [];
    const newList = userInput
      .trim()
      .replace(/\t/g, " ")
      .replace(/\n/g, " ")
      .split(" ");

    newList.forEach((word) => {
      if (word.includes("ONES") && !word.includes("(")) {
        if (!ONESList.includes(word)) {
          ONESList.push(word);
        }
      } else if (
        (word.includes("OPGS") && !word.includes("(")) ||
        (word.includes("OPWS") && !word.includes("("))
      ) {
        if (!OpticalList.includes(word)) {
          OpticalList.push(word);
        }
      } else if (
        (word.includes("BTWX") && !word.includes("(")) ||
        (word.includes("WRGB") && !word.includes("("))
      ) {
        if (!legacyOpticalList.includes(word)) {
          legacyOpticalList.push(word);
        }
      }
    });

    // Convert arrays of circuits into string format
    const ONESString = ONESList.join(", ");
    const OpticalString = OpticalList.join(", ");
    const legacyOpticalString = legacyOpticalList.join(", ");

    // Total number of impacted circuits for each category
    const totalNumberOptical =
      "Total number of 21CN Optical Connect circuits: " + OpticalList.length;
    const totalNumberONES = "Total number of ONES circuits: " + ONESList.length;
    const totalNumberlegacyOptical =
      "Total number of 20C Optical Connect circuits: " +
      legacyOpticalList.length;

    // Set filtered circuit states and log results if they are not empty
    if (ONESList.length > 0) {
      console.log(ONESString);
      console.log(totalNumberONES + "\n");
      setFilteredONESCircuits(ONESString);
    }

    if (OpticalList.length > 0) {
      console.log(OpticalString);
      console.log(totalNumberOptical + "\n");
      setFilteredOpticalCircuits(OpticalString);
    }

    if (legacyOpticalList.length > 0) {
      console.log(legacyOpticalString);
      console.log(totalNumberlegacyOptical + "\n");
      setFilteredLegacyOpticalCircuits(legacyOpticalString);
    }
  };

  // Render the main application
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="textbox-and-return-values-container">
        <div className="text-area-box">
          <TextareaAutosize
            style={{ width: "100%", height: "100%" }}
            aria-label="minimum height"
            minRows={24}
            maxRows={30}
            placeholder="Paste circuits into here..."
            value={userInput}
            className="text-box"
            type="textarea"
            onChange={handleChange}
          />
        </div>
        <div className="return-values-container">
          <p className="ones-return-value">{filteredONESCircuits}</p>
          <br></br>
          <p className="optical-return-value">{filteredOpticalCircuits}</p>
          <br></br>
          <p className="legacy-return-value">{filteredLegacyOpticalCircuits}</p>
        </div>
      </div>
      <div className="button-group">
        <div className="format-button">
          <Button
            size="large"
            variant="contained"
            color="success"
            className={`primary-btn ${
              filteredONESCircuits ||
              filteredOpticalCircuits ||
              filteredLegacyOpticalCircuits
                ? "active"
                : ""
            }`}
            onClick={handleFilter}
            disabled={!userInput}
          >
            Click to Format
          </Button>

          <CopyToClipboardButton dataToCopy={clipboardList} />
          <IconButton onClick={resetFields}>
            <RestartAltIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

// Export the App component for use in other parts of the application
export default App;
