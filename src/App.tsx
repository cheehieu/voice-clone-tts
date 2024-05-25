import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import KeyIcon from "@mui/icons-material/Key";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import "./App.css";
import {
  getGeneratedItems,
  getVoices,
  textToSpeech,
  textToSpeechStream,
} from "./voice-api";

// Add separate textfield for API key

function App() {
  const [textInput, setTextInput] = useState<string>("");
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState<string>("");

  const apiKey = elevenLabsApiKey
    ? elevenLabsApiKey
    : process.env.REACT_APP_ELEVENLABS_API_KEY_FREE
    ? process.env.REACT_APP_ELEVENLABS_API_KEY_FREE
    : "no key found";

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
              focused
              label="API Key"
              placeholder="Eleven Labs API Key"
              value={elevenLabsApiKey}
              onChange={(event) => {
                setElevenLabsApiKey(event.target.value);
              }}
            />
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
          startIcon={<PlayArrowIcon />}
          onClick={() => {
            alert(`Text Input: ${textInput}`);
            textToSpeech(apiKey, "eGBjFzfEhvOZOwtVD6wL", textInput);
          }}
        >
          Preview
        </Button>

        <Button
          variant="contained"
          startIcon={<GraphicEqIcon />}
          onClick={() => {
            textToSpeechStream(apiKey);
          }}
        >
          Stream
        </Button>

        <Button
          variant="contained"
          startIcon={<KeyIcon />}
          onClick={() => {
            console.log("process", process.env);
            console.log("apiKey: ", apiKey);
          }}
        >
          Check Key
        </Button>

        <Button
          variant="contained"
          startIcon={<RecordVoiceOverIcon />}
          onClick={() => {
            getVoices(apiKey);
          }}
        >
          Get Voices
        </Button>

        <Button
          variant="contained"
          startIcon={<AudioFileIcon />}
          onClick={() => {
            getGeneratedItems(apiKey);
          }}
        >
          Download Audio File
        </Button>
      </header>
    </div>
  );
}

export default App;
