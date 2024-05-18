import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import "./App.css";

const apiKey = process.env.ELEVEN_LABS_API_KEY ?? "no key found";

function App() {
  const [textInput, setTextInput] = useState<string>("");

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <code>voice-clone-tts</code>
        </p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 5, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  color: "white",
                },
              }}
              color="info"
              focused
              label="Text Input"
              multiline
              placeholder="Enter text to convert to speech"
              rows={8}
              variant="outlined"
              value={textInput}
              onChange={(event) => {
                setTextInput(event.target.value);
              }}
            />
          </div>
        </Box>
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          onClick={() => {
            alert(`Text Input: ${textInput}`);
          }}
        >
          Submit
        </Button>
      </header>
    </div>
  );
}

export default App;
