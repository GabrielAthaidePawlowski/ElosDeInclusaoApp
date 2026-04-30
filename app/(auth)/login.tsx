import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    // --- LÓGICA DE DIRECIONAMENTO (O segredo para não cair na tela errada) ---
    // No futuro, o seu Backend (Node/MongoDB) retornará se o usuário é 'tutor' ou 'familia'
    
    // Simulação temporária para você testar os dois fluxos agora:
    const userRole = email.toLowerCase().includes('tutor') ? 'tutor' : 'familia';

    if (userRole === 'tutor') {
      console.log("Entrando como Tutor...");
      router.replace('/(tabs)/dashboard' as any);
    } else  {
      console.log("Entrando como Família...");
      // Direciona para o Dashboard da Família que criamos
      router.replace('/(tabs)/family_dashboard' as any); 
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <Stack.Screen options={{ title: 'Login' }} />
            <Text style={styles.title}>Bem-vindo de volta</Text>
            <Text style={styles.subtitle}>Acesse sua conta no Elos</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput 
                style={styles.input} 
                placeholder="seu@email.com" 
                value={email} 
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Sua senha" 
                secureTextEntry 
                value={password} 
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
              <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Ainda não tem conta?</Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text style={styles.link}> Cadastre-se aqui</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={{ marginTop: 15 }} 
              onPress={() => router.replace('/')}
            >
              <Text style={{ textAlign: 'center', color: '#666', fontSize: 12 }}>Voltar ao Início</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f4f4' },
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 24, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 10 
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2c5282', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30, marginTop: 5 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  inputGroup: { marginBottom: 20 },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 10, 
    padding: 14, 
    backgroundColor: '#f9f9f9', 
    fontSize: 16 
  },
  btnPrimary: { 
    backgroundColor: '#2c5282', 
    padding: 16, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10 
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  footerText: { color: '#666' },
  link: { color: '#2c5282', fontWeight: 'bold' }
});