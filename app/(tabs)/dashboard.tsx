import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {Stack, useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ title: 'Início' }} />
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Text style={styles.title}>Bem-vindo, Tutor</Text>
          <Text style={styles.subtitle}>Painel de Controle Elos</Text>
        </View>

        {/* GRID DE BOTÕES COLORIDOS */}
        <View style={styles.grid}>
          
          {/* Minhas Atribuições (Azul) */}
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push('/(tabs)/atribuicoes' as any)} // Ajuste a rota se precisar
          >
            <View style={[styles.iconCircle, { backgroundColor: '#e6f2ff' }]}>
              <Ionicons name="people" size={32} color="#1d78d4" />
            </View>
            <Text style={styles.cardText}>Minhas{'\n'}Atribuições</Text>
          </TouchableOpacity>

          {/* Mensagens (Laranja) */}
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push('/(tabs)/messages' as any)} // Ajuste a rota se precisar
          >
            <View style={[styles.iconCircle, { backgroundColor: '#fff3e0' }]}>
              <Ionicons name="chatbubbles" size={32} color="#e65100" />
            </View>
            <Text style={styles.cardText}>Mensagens</Text>
          </TouchableOpacity>

          {/* Registrar Informações (Verde) */}
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push('/(tabs)/tutor_records' as any)} // Apontando pro novo arquivo!
          >
            <View style={[styles.iconCircle, { backgroundColor: '#e8f5e9' }]}>
              <Ionicons name="clipboard" size={32} color="#2e7d32" />
            </View>
            <Text style={styles.cardText}>Registrar{'\n'}Informações</Text>
          </TouchableOpacity>

          {/* Mapa de Rotas (Roxo) */}
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push('/(tabs)/map?role=tutor' as any )} // Ajuste a rota se precisar
          >
            <View style={[styles.iconCircle, { backgroundColor: '#f3e5f5' }]}>
              <Ionicons name="map" size={32} color="#6a1b9a" />
            </View>
            <Text style={styles.cardText}>Mapa de Rotas</Text>
          </TouchableOpacity>

        </View>

        {/* BOTÃO DE EDIÇÃO/GERENCIAMENTO PADRONIZADO (Estilo da Família) */}
        <TouchableOpacity style={styles.editButton} onPress={() => router.push('/(tabs)/tutor_profile' as any )}>
          <Text style={styles.editButtonText}>Gerenciar Meu Perfil</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  container: { 
    padding: 20,
    paddingBottom: 40
  },
  header: { 
    marginBottom: 30,
    marginTop: 10
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#1a202c' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#718096', 
    marginTop: 5 
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 30
  },
  card: {
    backgroundColor: '#fff',
    width: '47%', // Deixa duas colunas certinhas
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // Sombra suave no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  iconCircle: {
    width: 65,
    height: 65,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  cardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2d3748',
    textAlign: 'center',
    lineHeight: 20
  },
  
  // Estilo do Botão Azul Escuro no Rodapé
  editButton: {
    backgroundColor: '#2c5282',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});