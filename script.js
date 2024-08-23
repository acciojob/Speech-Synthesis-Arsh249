// Your script here.
// Initialize a SpeechSynthesisUtterance object
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Function to populate the voice options
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set the selected voice for the SpeechSynthesisUtterance object
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
}

// Set the rate and pitch for the SpeechSynthesisUtterance object
function setOption() {
  msg[this.name] = this.value;
}

// Start speaking the text in the textarea
function startSpeech() {
  speechSynthesis.cancel(); // Stop any ongoing speech
  msg.text = document.querySelector('[name="text"]').value;
  speechSynthesis.speak(msg);
}

// Stop the speech
function stopSpeech() {
  speechSynthesis.cancel();
}

// Event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', startSpeech);
stopButton.addEventListener('click', stopSpeech);
