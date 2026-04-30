import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  ScrollView, KeyboardAvoidingView, Platform, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function FamilyProfileScreen() {
  const router = useRouter();

  // Estados da Família
  const [name, setName] = useState('Família Silva');
  const [email, setEmail] = useState('familiasilva@email.com');
  
  const [childName, setChildName] = useState('Joãozinho');
  const [childBirth, setChildBirth] = useState('15/08/2017');
  const [childNeeds, setChildNeeds] = useState('TEA - Necessita de suporte visual');

  const handleSave = () => {
    Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
  };

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: () => router.replace('/(auth)/login' as any) }
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ title: 'Perfil da Família', headerTitleAlign: 'center', headerShadowVisible: false }} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Ionicons name="people" size={50} color="#2c5282" />
            </View>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userRoleBadge}>Conta Responsável</Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Dados do Responsável</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput style={styles.input} value={name} onChangeText={setName} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
            </View>

            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Dados da Criança</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>
              <TextInput style={styles.input} value={childName} onChangeText={setChildName} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Data de Nascimento</Text>
              <TextInput style={styles.input} value={childBirth} onChangeText={setChildBirth} keyboardType="numeric" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Necessidades Especiais</Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                value={childNeeds} 
                onChangeText={setChildNeeds} 
                multiline 
              />
            </View>

            <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
              <Text style={styles.btnSaveText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#dc3545" />
            <Text style={styles.btnLogoutText}>Sair da Conta</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Estilos idênticos ao do Tutor
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8f9fa' }, container: { padding: 20, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', marginBottom: 25 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center', elevation: 3 },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#1a202c', marginTop: 12 },
  userRoleBadge: { fontSize: 13, color: '#2c5282', backgroundColor: '#e6f2ff', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginTop: 5, fontWeight: 'bold' },
  formCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 2, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2c5282', marginBottom: 15, textTransform: 'uppercase' },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 20 },
  inputGroup: { marginBottom: 15 }, label: { fontSize: 13, fontWeight: 'bold', color: '#718096', marginBottom: 6 },
  input: { backgroundColor: '#f8f9fa', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, paddingHorizontal: 15, minHeight: 48, fontSize: 15, color: '#2d3748' },
  textArea: { paddingTop: 12, minHeight: 80, textAlignVertical: 'top' },
  btnSave: { backgroundColor: '#198754', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnSaveText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  btnLogout: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingVertical: 15, backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#fed7d7' },
  btnLogoutText: { color: '#dc3545', fontWeight: 'bold', fontSize: 16 }
});