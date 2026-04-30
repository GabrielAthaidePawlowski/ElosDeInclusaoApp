import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TextInput, 
  TouchableOpacity, Keyboard, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

interface TutorRecord {
  id: string;
  name: string;
  time: string;
  status?: string;
  desc?: string;
}

export default function TutorRecords() {
  const [tab, setTab] = useState<'meds' | 'events'>('meds');
  const [newEntry, setNewEntry] = useState('');

  // Agora as medicações podem ser alteradas
  const [meds, setMeds] = useState<TutorRecord[]>([
    { id: '1', name: 'Ritalina', time: '08:00', status: 'Pendente' },
    { id: '2', name: 'Vitamina C', time: '12:00', status: 'Pendente' },
  ]);

  const [events, setEvents] = useState<TutorRecord[]>([
    { id: '1', name: 'Interação Social', desc: 'Brincou muito bem hoje.', time: '14:00' },
  ]);

  // FUNÇÃO PARA ALTERAR STATUS E CONFIRMAR
  const handleToggleMedication = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Pendente' ? 'Tomado' : 'Pendente';
    
    Alert.alert(
      "Confirmar Medicação",
      `Deseja marcar "${meds.find(m => m.id === id)?.name}" como ${newStatus}? A família será notificada.`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar", 
          onPress: () => {
            const updatedMeds = meds.map(med => 
              med.id === id ? { ...med, status: newStatus } : med
            );
            setMeds(updatedMeds);
            Alert.alert("Sucesso", "Status atualizado e enviado para a família!");
          } 
        }
      ]
    );
  };

  const handleAddEntry = () => {
    if (!newEntry) return;
    const newItem: TutorRecord = { 
      id: Date.now().toString(), 
      name: 'Ocorrência', 
      desc: newEntry, 
      time: 'Agora' 
    };
    setEvents([newItem, ...events]);
    setNewEntry('');
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Registros' }} />
        <Text style={styles.title}>Diário (Tutor)</Text>

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

        {tab === 'events' && (
          <View style={styles.topInputArea}>
            <Text style={styles.inputLabel}>Relatar nova ocorrência:</Text>
            <View style={styles.inputRow}>
              <TextInput 
                style={styles.input} 
                placeholder="Descreva o que aconteceu..." 
                value={newEntry}
                onChangeText={setNewEntry}
                multiline
              />
              <TouchableOpacity style={styles.btnAdd} onPress={handleAddEntry}>
                <Ionicons name="send" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <FlatList
          data={tab === 'meds' ? meds : events}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity 
              // Se for medicação, o card inteiro é clicável para mudar o status
              disabled={tab !== 'meds'} 
              onPress={() => handleToggleMedication(item.id, item.status || '')}
              style={[
                styles.card, 
                tab === 'meds' && item.status === 'Tomado' && styles.cardSuccess
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardTime}>{item.time}</Text>
              </View>
              
              <View style={styles.statusRow}>
                <Text style={styles.cardDesc}>
                  {tab === 'meds' ? `Status: ` : item.desc}
                </Text>
                {tab === 'meds' && (
                  <View style={[
                    styles.statusBadge, 
                    item.status === 'Tomado' ? styles.badgeSuccess : styles.badgePending
                  ]}>
                    <Text style={styles.badgeText}>{item.status}</Text>
                  </View>
                )}
              </View>

              {tab === 'meds' && item.status === 'Pendente' && (
                <Text style={styles.tapTip}>Toque para marcar como tomado</Text>
              )}
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <Text style={styles.sectionTitle}>
              {tab === 'meds' ? 'Medicações de Hoje' : 'Registros do Dia'}
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
  activeTab: { backgroundColor: '#fff' },
  tabText: { color: '#64748b', fontWeight: '600' },
  activeTabText: { color: '#2c5282', fontWeight: 'bold' },
  
  topInputArea: { backgroundColor: '#fff', borderRadius: 15, padding: 15, marginBottom: 20, elevation: 3 },
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: '#4a5568', marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  input: { flex: 1, backgroundColor: '#f8f9fa', borderRadius: 10, paddingHorizontal: 12, minHeight: 45, borderWidth: 1, borderColor: '#e2e8f0' },
  btnAdd: { backgroundColor: '#2c5282', width: 45, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#718096', marginBottom: 10 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 12, elevation: 1 },
  cardSuccess: { borderLeftWidth: 5, borderLeftColor: '#38a169' }, // Verde quando tomado
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardTime: { fontSize: 12, color: '#a0aec0' },
  cardDesc: { color: '#4a5568', fontSize: 14 },
  
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginLeft: 5 },
  badgePending: { backgroundColor: '#feebc8' }, // Laranja clarinho
  badgeSuccess: { backgroundColor: '#c6f6d5' }, // Verde clarinho
  badgeText: { fontSize: 12, fontWeight: 'bold', color: '#2d3748' },
  tapTip: { fontSize: 11, color: '#2c5282', fontStyle: 'italic', marginTop: 10, textAlign: 'right' }
});