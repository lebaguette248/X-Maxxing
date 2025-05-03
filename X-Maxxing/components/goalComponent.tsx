import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';


interface GoalBoxProps {
  title: string;
  description?: string;
}

const GoalBox: React.FC<GoalBoxProps> = ({ title, description }) => {
  return (
    <ThemedView style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : (
        <Text style={styles.descriptionPlaceholder}>No description provided.</Text>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  descriptionPlaceholder: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#999',
  },
});

export default GoalBox;
