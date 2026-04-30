import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function SearchTutorScreen() {
  // Simulação da lista que vinha do seu banco (tutores.forEach no EJS)
  const [tutores, setTutores] = useState([
    { id: '1', name: 'Carlos Henrique', specialty: 'TEA', college: 'UFMG', age: 24, obs: 'Experiência com crianças não-verbais.' },
    { id: '2', name: 'Ana Beatriz', specialty: 'TDAH', college: 'PUC', age: 29, obs: 'Especialista em reforço escolar.' },
  ]);

  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);

  const handleSelect = (tutor: any) => {
    Alert.alert(
      "Confirmar Tutor",
      `Deseja selecionar ${tutor.name}? Lembre-se que haverá um período de carência para troca.`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar", 
          onPress: () => {
            setSelectedTutorId(tutor.id);
            Alert.alert("Sucesso", "Tutor vinculado à sua família!");
            // Aqui você enviaria o tutorId para o MongoDB via Axios
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Buscar Tutores' }} />
      <Text style={styles.title}>Tutores Disponíveis</Text>
      
      <FlatList
        data={tutores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, selectedTutorId === item.id && styles.selectedCard]}>
            <View style={styles.info}>
              <Text style={styles.tutorName}>{item.name}</Text>
              <Text style={styles.tutorDetail}>🎓 {item.college}</Text>
              <Text style={styles.tutorDetail}>🎂 {item.age} anos</Text>
              <Text style={styles.tutorDetail}>✨ {item.specialty}</Text>
              <Text style={styles.obs}>"{item.obs}"</Text>
            </View>

            {selectedTutorId === item.id ? (
              <View style={styles.pillActive}>
                <Text style={styles.pillText}>Já Selecionado</Text>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.btnSelect} 
                onPress={() => handleSelect(item)}
                disabled={selectedTutorId !== null} // Bloqueia se já tiver um
              >
                <Text style={styles.btnText}>Selecionar</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2c5282', marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 15, elevation: 3 },
  selectedCard: { borderLeftWidth: 5, borderLeftColor: '#198754' },
  info: { marginBottom: 12 },
  tutorName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  tutorDetail: { fontSize: 14, color: '#666', marginTop: 2 },
  obs: { fontSize: 13, fontStyle: 'italic', color: '#888', marginTop: 8 },
  btnSelect: { backgroundColor: '#2c5282', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  pillActive: { backgroundColor: '#d1e7dd', padding: 10, borderRadius: 8, alignItems: 'center' },
  pillText: { color: '#0f5132', fontWeight: 'bold' }
});