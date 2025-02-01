import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [moodLog, setMoodLog] = useState([]);
  const [moodCounts, setMoodCounts] = useState({});
  const moods = ['😊', '😢', '😠', '😴', '🤩']; // Mood options

  const logMood = (mood) => {
    const newLog = {
      mood,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    };
    setMoodLog([newLog, ...moodLog]);
    setMoodCounts((prevCounts) => ({
      ...prevCounts,
      [mood]: (prevCounts[mood] || 0) + 1,
    }));
  };

  const clearLog = () => {
    setMoodLog([]);
    setMoodCounts({});
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Moodify - Mood Tracker</Text>

      {/* Total Logs */}
      <Text style={styles.totalLogs}>
        Total Moods Logged: {moodLog.length}
      </Text>

      {/* Mood Buttons */}
      <View style={styles.moodContainer}>
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={styles.moodButton}
            onPress={() => logMood(mood)}
          >
            <Text style={styles.moodText}>{mood}</Text>
            <Text style={styles.moodCount}>
              Count: {moodCounts[mood] || 0}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Clear Log Button */}
      {moodLog.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearLog}>
          <Text style={styles.clearButtonText}>Clear Mood Log</Text>
        </TouchableOpacity>
      )}

      {/* Mood Log */}
      <FlatList
        data={moodLog}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.logText}>
              {item.mood} - Logged on {item.date} at {item.time}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No mood logged yet. Start tracking!</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 8,
    marginTop:26,
  },
  totalLogs: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 16,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  moodButton: {
    backgroundColor: '#FFEB3B',
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  moodText: {
    fontSize: 24,
  },
  moodCount: {
    fontSize: 12,
    marginTop: 4,
    color: '#555',
  },
  clearButton: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
});
