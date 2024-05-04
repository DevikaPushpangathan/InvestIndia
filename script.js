const startRecordingBtn = document.getElementById('startRecording');
const stopRecordingBtn = document.getElementById('stopRecording');
const generateMinutesBtn = document.getElementById('generateMinutes');
const meetingMinutesTextarea = document.getElementById('meetingMinutes');

let recognition;

startRecordingBtn.addEventListener('click', () => {
    startRecording();
});

stopRecordingBtn.addEventListener('click', () => {
    stopRecording();
});

generateMinutesBtn.addEventListener('click', () => {
    generateMeetingMinutes();
});

function startRecording() {
    // Create a new SpeechRecognition object
    recognition = new webkitSpeechRecognition();
    
    // Set recognition parameters
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // Set language to English
    
    // Define what to do when speech is recognized
    recognition.onresult = function(event) {
        let transcript = '';
        // Loop through results to concatenate the recognized text
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                transcript += event.results[i][0].transcript;
            }
        }
        // Update the textarea with the recognized text
        meetingMinutesTextarea.value = transcript;
    };

    // Define what to do in case of recognition error
    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
    };

    // Start speech recognition
    recognition.start();
}

function stopRecording() {
    // Stop speech recognition
    if (recognition) {
        recognition.stop();
    }
}

function generateMeetingMinutes() {
    // Additional logic to save or process meeting minutes
    alert('Meeting minutes generated successfully!');
}