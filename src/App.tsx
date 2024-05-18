import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import "./App.css";

const apiKey = process.env.ELEVENLABS_API_KEY ?? "no key found";

function App() {
  const [textInput, setTextInput] = useState<string>("");

  const getVoices = async () => {
    console.log("apiKey: ", apiKey);

    const options = {
      method: "GET",
      headers: { "xi-api-key": apiKey },
    };

    fetch("https://api.elevenlabs.io/v1/voices", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

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
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          onClick={() => {
            getVoices();
          }}
        >
          Get Voices
        </Button>
      </header>
    </div>
  );
}

export default App;
