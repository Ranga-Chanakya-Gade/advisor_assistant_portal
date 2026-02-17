import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for Text-to-Speech using Web Speech API
 * Provides voice output functionality similar to Siri/Alexa
 */
export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const synthRef = useRef(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      // Load available voices
      const loadVoices = () => {
        const availableVoices = synthRef.current.getVoices();
        setVoices(availableVoices);

        // Log available voices for debugging
        console.log('Available voices:', availableVoices.map(v => ({ name: v.name, lang: v.lang })));

        // Try to select British English female voice with explicit name matching
        const preferredVoice =
          // Try specific British female voice names
          availableVoices.find(voice => voice.name === 'Google UK English Female') ||
          availableVoices.find(voice => voice.name === 'Microsoft Hazel Desktop - English (Great Britain)') ||
          availableVoices.find(voice => voice.name === 'Microsoft Susan Desktop - English (Great Britain)') ||
          availableVoices.find(voice => voice.name.includes('Karen')) ||
          // Try any en-GB female voice
          availableVoices.find(voice =>
            voice.lang === 'en-GB' && (
              voice.name.toLowerCase().includes('female') ||
              voice.name.toLowerCase().includes('woman') ||
              voice.name.toLowerCase().includes('susan') ||
              voice.name.toLowerCase().includes('hazel') ||
              voice.name.toLowerCase().includes('karen')
            )
          ) ||
          // Try any en-GB voice that's not male
          availableVoices.find(voice =>
            voice.lang === 'en-GB' && !voice.name.toLowerCase().includes('male') && !voice.name.toLowerCase().includes('daniel') && !voice.name.toLowerCase().includes('george')
          ) ||
          // Try any English female voice
          availableVoices.find(voice =>
            voice.lang.startsWith('en') && (
              voice.name.toLowerCase().includes('female') ||
              voice.name.toLowerCase().includes('woman') ||
              voice.name.toLowerCase().includes('zira') ||
              voice.name.toLowerCase().includes('samantha')
            )
          ) ||
          availableVoices.find(voice => voice.lang.startsWith('en')) ||
          availableVoices[0];

        console.log('Selected voice:', preferredVoice?.name, preferredVoice?.lang);
        setSelectedVoice(preferredVoice);
      };

      loadVoices();

      // Chrome loads voices asynchronously
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  /**
   * Speak text with optional configuration
   * @param {string} text - The text to speak
   * @param {object} options - Optional speech parameters
   */
  const speak = (text, options = {}) => {
    if (!synthRef.current || !isEnabled) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Get fresh voices list and select female voice
    const currentVoices = synthRef.current.getVoices();

    // Force select a female voice (Zira or any non-male voice)
    const femaleVoice = currentVoices.find(v => v.name.includes('Zira')) ||
                       currentVoices.find(v => v.name.toLowerCase().includes('female')) ||
                       currentVoices.find(v => !v.name.includes('David') && !v.name.includes('Mark') && !v.name.includes('George'));

    console.log('Speaking with voice:', femaleVoice?.name);

    // Configure voice - use femaleVoice instead of selectedVoice
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    } else if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Apply options
    utterance.rate = options.rate || 1.0; // Speed (0.1 to 10)
    utterance.pitch = options.pitch || 1.0; // Pitch (0 to 2)
    utterance.volume = options.volume || 1.0; // Volume (0 to 1)

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  /**
   * Stop current speech
   */
  const stop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  /**
   * Pause current speech
   */
  const pause = () => {
    if (synthRef.current && isSpeaking) {
      synthRef.current.pause();
    }
  };

  /**
   * Resume paused speech
   */
  const resume = () => {
    if (synthRef.current) {
      synthRef.current.resume();
    }
  };

  /**
   * Toggle voice enabled/disabled
   */
  const toggleEnabled = () => {
    setIsEnabled(!isEnabled);
    if (isSpeaking) {
      stop();
    }
  };

  /**
   * Check if speech synthesis is supported
   */
  const isSupported = 'speechSynthesis' in window;

  /**
   * Get random item from array for varied responses
   */
  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return {
    speak,
    stop,
    pause,
    resume,
    toggleEnabled,
    isSpeaking,
    isEnabled,
    isSupported,
    voices,
    selectedVoice,
    setSelectedVoice,
    getRandomResponse
  };
};

export default useSpeech;
