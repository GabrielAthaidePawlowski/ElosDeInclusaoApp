import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AtribuicoesScreen() {
  const router = useRouter();

  // Mock com os dados completos (agora refletindo o que pegamos no cadastro!)
  const atribuicoes = [
    { 
      id: '1', 
      crianca: {
        nome: 'Lucas Silva',
        idade: '7 anos',
        nascimento: '11/05/2018',
        necessidade: 'Transtorno do Espectro Autista (TEA)'
      },
      responsavel: {
        nome: 'Família Silva',
        email: 'familiasilva@gmail.com'
      }
    }
  ];

  return (
    <SafeAreaView style={styles.safe}>
      {/* O Stack.Screen fica aqui no topo, fora da lista! */}
      <Stack.Screen 
        options={{ 
          title: 'Minhas Atribuições',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }} 
      />

      <FlatList
        data={atribuicoes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <View>
            {/* CARD 1: DADOS DA CRIANÇA */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="person" size={20} color="#2c5282" />
                <Text style={styles.cardTitle}>Criança atribuída</Text>
              </View>
              
              <View style={styles.fieldRow}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.value}>{item.crianca.nome}</Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Idade:</Text>
                <Text style={styles.value}>{item.crianca.idade}</Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Nascimento:</Text>
                <Text style={styles.value}>{item.crianca.nascimento}</Text>
              </View>

              <View style={[styles.fieldRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.label}>Necessidades especiais:</Text>
                <Text style={styles.value}>{item.crianca.necessidade}</Text>
              </View>
            </View>

            {/* CARD 2: DADOS DO RESPONSÁVEL */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="people" size={20} color="#198754" />
                <Text style={[styles.cardTitle, { color: '#198754' }]}>Responsável</Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.value}>{item.responsavel.nome}</Text>
              </View>

              <View style={[styles.fieldRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{item.responsavel.email}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { padding: 20, paddingBottom: 40 },
  
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 20, 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.05, 
    shadowRadius: 5 
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10, 
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#f1f5f9'
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2c5282' 
  },
  
  fieldRow: { 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f1f5f9' 
  },
  label: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#718096', 
    marginBottom: 4 
  },
  value: { 
    fontSize: 16, 
    color: '#2d3748' 
  },

  btnBack: { 
    backgroundColor: '#64748b', // Cor cinza azulado bem elegante
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  btnBackText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});