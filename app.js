// Check if the browser supports the Web Speech API
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
    alert("Sorry, your browser doesn't support the Web Speech API required for this feature.");
} else {
    // Get the HTML elements
    const startButton = document.getElementById('start-btn');
    const outputDiv = document.getElementById('recognition-output');

    // Create a new SpeechRecognition object
    const recognition = new SpeechRecognition();
    
    // --- Configuration ---
    // Should the recognition be continuous? true means it keeps listening after a pause.
    recognition.continuous = false; 
    // Should the intermediate results be returned?
    recognition.interimResults = false; 
    // Language to recognize (e.g., 'en-US' for American English, 'es-ES' for Spanish)
    recognition.lang = 'en-US'; 

    // --- Event Handlers ---

    // Event fired when recognition successfully returns a result
    recognition.onresult = function(event) {
        // The results object is an array of SpeechRecognitionResult objects.
        const current = event.results.length - 1;
        const transcript = event.results[current][0].transcript;

        // Display the recognized text
        outputDiv.textContent = transcript;
        console.log('Confidence: ' + event.results[current][0].confidence);
    }

    // Event fired when the recognition service has disconnected
    recognition.onend = function() {
        console.log('Speech recognition service disconnected.');
        startButton.textContent = 'Start Listening'; // Reset button text
        startButton.disabled = false; // Enable button
    }

    // Event fired when an error occurs
    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        outputDiv.textContent = 'ERROR: ' + event.error;
        startButton.textContent = 'Start Listening'; // Reset button text
        startButton.disabled = false; // Enable button
    }

    // --- Button Click Listener ---

    startButton.addEventListener('click', () => {
        try {
            outputDiv.textContent = "Listening... Speak now.";
            startButton.textContent = 'Listening...';
            startButton.disabled = true; // Disable button while listening
            
            // Start the recognition process
            recognition.start();
            
        } catch (error) {
            console.error('Error starting recognition:', error);
            outputDiv.textContent = 'Could not start recognition. Check console for details.';
            startButton.textContent = 'Start Listening';
            startButton.disabled = false;
        }
    });
}