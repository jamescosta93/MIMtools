import "./styles.css";
import { React, useState } from "react";
import Header from "./components/Header";
import CopyToClipboardButton from "./components/CopyToClipboard";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Button, IconButton } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function App() {
  const [userInput, setUserInput] = useState("");
  const [filteredONESCircuits, setFilteredONESCircuits] = useState("");
  const [filteredOpticalCircuits, setFilteredOpticalCircuits] = useState("");
  const [filteredLegacyOpticalCircuits, setFilteredLegacyOpticalCircuits] =
    useState("");

  const handleChange = (event) => {
    setUserInput(event.target.value);
    console.log(userInput);
  };

  const resetFields = () => {
    // Reset the user input and filtered values
    setUserInput("");
    setFilteredONESCircuits("");
    setFilteredOpticalCircuits("");
    setFilteredLegacyOpticalCircuits("");
  };

  const clipboardList = [
    filteredONESCircuits,
    filteredOpticalCircuits,
    filteredLegacyOpticalCircuits,
  ].join("\n");

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

    // Total number of impacted circuits for each corresponding array
    const totalNumberOptical =
      "Total number of 21CN Optical Connect circuits: " + OpticalList.length;
    const totalNumberONES = "Total number of ONES circuits: " + ONESList.length;
    const totalNumberlegacyOptical =
      "Total number of 20C Optical Connect circuits: " +
      legacyOpticalList.length;
    "Total number of 20C Optical Connect circuits: " + legacyOpticalList.length;

    // Will show the total number of impacted circuits if the arrays are not empty
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
export default App;
