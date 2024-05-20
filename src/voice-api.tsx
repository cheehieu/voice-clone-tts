const audioContext = new AudioContext();

/**
 * TEXT TO SPEECH
 * {@link https://elevenlabs.io/docs/api-reference/text-to-speech}
 */
type VoiceSettings = {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
};

export const textToSpeech = (
  apiKey: string,
  voice_id: string,
  input_text: string,
  model_id: string = "eleven_multilingual_v2",
  voice_settings: VoiceSettings = {
    stability: 0.5,
    similarity_boost: 0.75,
    style: 0,
    use_speaker_boost: true,
  }
) => {
  const { stability, similarity_boost, style, use_speaker_boost } =
    voice_settings;
  const options = {
    method: "POST",
    headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
    body: `{"text":"${input_text}","model_id":"${model_id}","voice_settings":{"stability":${stability},"similarity_boost":${similarity_boost},"style":${style},"use_speaker_boost":${use_speaker_boost}}}`,
  };

  fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`, options)
    // .then((response) => console.log(response))
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      return audioContext.decodeAudioData(arrayBuffer);
    })
    .then((audioBuffer) => {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
    })
    .catch((err) => console.error(err));
};

export const textToSpeechStream = (apiKey: string) => {
  const options = {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: '{"text":"hey there, this is mack","voice_settings":{"stability":0.5,"similarity_boost":0.75}}',
  };

  fetch(
    "https://api.elevenlabs.io/v1/text-to-speech/eGBjFzfEhvOZOwtVD6wL/stream",
    options
  )
    // .then((response) => console.log(response))
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      return audioContext.decodeAudioData(arrayBuffer);
    })
    .then((audioBuffer) => {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
    })
    .catch((err) => console.error(err));
};

/**
 * VOICES
 * {@link https://elevenlabs.io/docs/api-reference/get-voices}
 */
export const getVoices = (apiKey: string) => {
  const options = {
    method: "GET",
    headers: { "xi-api-key": apiKey },
  };

  fetch("https://api.elevenlabs.io/v1/voices", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export const getDefaultVoiceSettings = (apiKey: string) => {
  const options = {
    method: "GET",
    headers: { "xi-api-key": apiKey },
  };

  fetch("https://api.elevenlabs.io/v1/voices/settings/default", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export const getVoiceSettings = (apiKey: string, voice_id: string) => {
  const options = {
    method: "GET",
    headers: { "xi-api-key": apiKey },
  };

  fetch(`https://api.elevenlabs.io/v1/voices/${voice_id}/settings`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export const getVoiceMetadata = (apiKey: string, voice_id: string) => {
  const options = {
    method: "GET",
    headers: { "xi-api-key": apiKey },
  };

  fetch(`https://api.elevenlabs.io/v1/voices/${voice_id}`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

/**
 * HISTORY
 * {@link https://elevenlabs.io/docs/api-reference/get-generated-items}
 */

export const getGeneratedItems = (apiKey: string) => {
  const options = {
    method: "GET",
    headers: { "xi-api-key": apiKey },
  };

  fetch("https://api.elevenlabs.io/v1/history", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export const getHistoryItemById = (apiKey: string, history_item_id: string) => {
  const options = {
    method: "GET",
    headers: { "xi-api-key": apiKey },
  };

  fetch(`https://api.elevenlabs.io/v1/history/${history_item_id}`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export const deleteHistoryItem = (apiKey: string, history_item_id: string) => {
  const options = {
    method: "DELETE",
    headers: { "xi-api-key": apiKey },
  };

  fetch(`https://api.elevenlabs.io/v1/history/${history_item_id}`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export const getAudioFromHistoryItem = (
  apiKey: string,
  history_item_id: string
) => {
  const options = {
    method: "GET",
    headers: { "xi-api-key": apiKey },
  };

  fetch(
    `https://api.elevenlabs.io/v1/history/${history_item_id}/audio`,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export const downloadHistoryItems = (
  apiKey: string,
  history_item_ids: string[]
) => {
  const options = {
    method: "POST",
    headers: { "xi-api-key": "123", "Content-Type": "application/json" },
    body: `{"history_item_ids":${history_item_ids}}`,
  };

  fetch("https://api.elevenlabs.io/v1/history/download", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

/**
 * USER
 * {@link https://elevenlabs.io/docs/api-reference/get-user-info}
 */

export const getUserInfo = (apiKey: string) => {
  const options = { method: "GET", headers: { "xi-api-key": apiKey } };

  fetch("https://api.elevenlabs.io/v1/user", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

/**
 * MODELS
 * {@link https://elevenlabs.io/docs/api-reference/get-models}
 */

export const getModels = (apiKey: string) => {
  const options = {
    method: "GET",
    headers: { "xi-api-key": apiKey },
  };

  fetch("https://api.elevenlabs.io/v1/models", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
