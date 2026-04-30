import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function FamilyDashboard() {
  const router = useRouter();

  const childData = {
    name: "Joãozinho",
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen 
        options={{ 
          title: 'Início',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }} 
      />

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Cabeçalho de Boas-vindas */}
        <View style={styles.header}>
          <Text style={styles.welcome}>Olá, Família</Text>
          <Text style={styles.childInfo}>Acompanhando: <Text style={styles.bold}>{childData.name}</Text></Text>
        </View>

        {/* Menu Principal (Grid reorganizada para espelhar o Tutor) */}
        <View style={styles.grid}>
          
          {/* Buscar Tutor (Posição 1 - Azul) */}
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push('/(tabs)/search_tutor' as any)}
          >
            <View style={[styles.iconBox, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="search" size={30} color="#1976D2" />
            </View>
            <Text style={styles.menuLabel}>Buscar Tutor</Text>
          </TouchableOpacity>

          {/* Mensagens (Posição 2 - Laranja) */}
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push('/(tabs)/messages' as any)}
          >
            <View style={[styles.iconBox, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="chatbubbles" size={30} color="#F57C00" />
            </View>
            <Text style={styles.menuLabel}>Mensagens</Text>
          </TouchableOpacity>

          {/* Registros (Posição 3 - Verde) */}
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push('/(tabs)/family_records' as any)}
          >
            <View style={[styles.iconBox, { backgroundColor: '#F1F8E9' }]}>
              <Ionicons name="clipboard" size={30} color="#388E3C" />
            </View>
            <Text style={styles.menuLabel}>Registros</Text>
          </TouchableOpacity>

          {/* Trajeto (Posição 4 - Roxo) */}
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push('/(tabs)/map?role=familia' as any)}
          >
            <View style={[styles.iconBox, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="map" size={30} color="#7B1FA2" />
            </View>
            <Text style={styles.menuLabel}>Trajeto</Text>
          </TouchableOpacity>

        </View>

        {/* Botão de Gerenciamento Padrão no Rodapé */}
        <TouchableOpacity 
          style={styles.manageBtn}
          onPress={() => router.push('/(tabs)/family_profile' as any)}
        >
          <Text style={styles.manageBtnText}>Gerenciar Perfil </Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { padding: 20 },
  header: { marginBottom: 30, marginTop: 10 },
  welcome: { fontSize: 26, fontWeight: 'bold', color: '#1a202c' },
  childInfo: { fontSize: 16, color: '#718096', marginTop: 5 },
  bold: { color: '#2c5282', fontWeight: 'bold' },
  
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    marginBottom: 30
  },
  menuItem: { 
    backgroundColor: '#fff', 
    width: '47%', // Alterado para 47% igual ao do tutor para não estourar
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 16, 
    alignItems: 'center', 
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  iconBox: { 
    width: 65, 
    height: 65, 
    borderRadius: 35, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  menuLabel: { 
    fontWeight: '600', 
    color: '#2d3748',
    fontSize: 15,
    textAlign: 'center'
  },

  manageBtn: { 
    backgroundColor: '#2c5282', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 18,
    paddingHorizontal: 20, 
    borderRadius: 12, 
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  manageBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});