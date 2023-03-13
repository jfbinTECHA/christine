import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { OpenAI } from 'openai-api';

const openai = new OpenAI('YOUR_API_KEY');

export default function App() {
  const [generatedText, setGeneratedText] = useState('');

  useEffect(() => {
    // Generate text using ChatGPT on component mount
    openai.complete({
      engine: 'davinci',
      prompt: 'Hello, ChatGPT!',
      maxTokens: 64,
    }).then(response => {
      setGeneratedText(response.choices[0].text);
    });
  }, []);

  function handleSpeak() {
    // Speak the generated text using Expo's Text-to-Speech API
    const options = {
      language: 'en-US',
      voice: 'com.apple.ttsbundle.Samantha-compact',
      pitch: 1.0,
      rate: 0.8,
    };

    Speech.speak(generatedText, options);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{generatedText}</Text>
      <Button title="Speak" onPress={handleSpeak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    margin: 16,
  }
});
