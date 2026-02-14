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

        // Try to select a good default voice (English, female, natural sounding)
        const preferredVoice = availableVoices.find(
          voice => voice.lang.startsWith('en') && voice.name.includes('Female')
        ) || availableVoices.find(
          voice => voice.lang.startsWith('en')
        ) || availableVoices[0];

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

    // Configure voice
    if (selectedVoice) {
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
