import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TextInput, 
  TouchableOpacity, Keyboard, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

interface FamilyRecord {
  id: string;
  name: string;
  time: string;
  status?: string;
  desc?: string;
}

export default function FamilyRecords() {
  const router = useRouter();
  const [tab, setTab] = useState<'meds' | 'events'>('meds');
  const [newMed, setNewMed] = useState('');

  const [meds, setMeds] = useState<FamilyRecord[]>([
    { id: '1', name: 'Ritalina', time: '08:00', status: 'Tomado' },
    { id: '2', name: 'Vitamina C', time: '12:00', status: 'Pendente' },
  ]);

  const [events] = useState<FamilyRecord[]>([
    { id: '1', name: 'Interação Social', desc: 'Brincou muito bem hoje.', time: '14:00' },
  ]);

  const handleAddMed = () => {
    if (!newMed) return;
    const newItem: FamilyRecord = { 
      id: Date.now().toString(), 
      name: newMed, 
      status: 'Enviado pela Família', 
      time: 'Agora' 
    };
    setMeds([newItem, ...meds]);
    setNewMed('');
    Keyboard.dismiss();
    Alert.alert("Sucesso", "Registro de medicação enviado para o tutor!");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Registros' }} />
        <Text style={styles.title}>Acompanhamento (Família)</Text>
        
        {/* Seleção de Abas */}
        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={[styles.tab, tab === 'meds' && styles.activeTab]} 
            onPress={() => setTab('meds')}
          >
            <Text style={tab === 'meds' ? styles.activeTabText : styles.tabText}>Medicação</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, tab === 'events' && styles.activeTab]} 
            onPress={() => setTab('events')}
          >
            <Text style={tab === 'events' ? styles.activeTabText : styles.tabText}>Ocorrências</Text>
          </TouchableOpacity>
        </View>

        {/* CAMPO DE ENTRADA NO TOPO (Apenas na aba de Medicação para a Família) */}
        {tab === 'meds' && (
          <View style={styles.topInputArea}>
            <Text style={styles.inputLabel}>Registrar remédio ministrado:</Text>
            <View style={styles.inputRow}>
              <TextInput 
                style={styles.input} 
                placeholder="Ex: Paracetamol 500mg..." 
                value={newMed}
                onChangeText={setNewMed}
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.btnAdd} onPress={handleAddMed}>
                <Ionicons name="add-circle" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* LISTA DE REGISTROS */}
        <FlatList
          data={tab === 'meds' ? meds : events}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardTime}>{item.time}</Text>
              </View>
              
              <Text style={styles.cardDesc}>
                {tab === 'meds' ? `Status: ${item.status}` : item.desc}
              </Text>
              
              {/* Botão de Chat (Sempre visível para a família tirar dúvidas) */}
              <TouchableOpacity 
                style={styles.chatBtn} 
                onPress={() => router.push('/(tabs)/messages' as any)}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={18} color="#2c5282" />
                <Text style={styles.chatBtnText}>Tirar dúvida no chat</Text>
              </TouchableOpacity>
            </View>
          )}
          ListHeaderComponent={
            <Text style={styles.sectionTitle}>
              {tab === 'meds' ? 'Histórico de Medicação' : 'Ocorrências do Tutor'}
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f4f4' },
  container: { flex: 1, paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2c5282', marginTop: 20, marginBottom: 15 },
  
  tabBar: { flexDirection: 'row', backgroundColor: '#e2e8f0', borderRadius: 12, marginBottom: 20, padding: 4 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10 },
  activeTab: { backgroundColor: '#fff', elevation: 2 },
  tabText: { color: '#64748b', fontWeight: '600' },
  activeTabText: { color: '#2c5282', fontWeight: 'bold' },

  // Área de input no topo para evitar bug do teclado
  topInputArea: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#2c5282'
  },
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: '#4a5568', marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  input: { 
    flex: 1, 
    backgroundColor: '#f8f9fa', 
    borderRadius: 10, 
    paddingHorizontal: 12, 
    height: 45,
    borderWidth: 1, 
    borderColor: '#e2e8f0',
    color: '#333'
  },
  btnAdd: { 
    backgroundColor: '#2c5282', 
    width: 45, 
    height: 45, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#718096', marginBottom: 10, marginTop: 5 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 12, elevation: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  cardTitle: { fontWeight: 'bold', fontSize: 16, color: '#2d3748' },
  cardTime: { fontSize: 12, color: '#a0aec0' },
  cardDesc: { color: '#4a5568', fontSize: 14, lineHeight: 20 },
  chatBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginTop: 12, 
    paddingTop: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#f1f5f9' 
  },
  chatBtnText: { color: '#2c5282', fontWeight: 'bold', fontSize: 14 }
});