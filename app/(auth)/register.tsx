import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  ScrollView, Alert, KeyboardAvoidingView, Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  
  // Estados comuns (Responsável/Tutor)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tutor'); // 'tutor' ou 'familia'
  
  // Estado exclusivo do Tutor
  const [specialty, setSpecialty] = useState('');
  
  // Estados exclusivos da Família (Criança)
  const [childName, setChildName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState(''); // NOVO CAMPO!
  const [childNeeds, setChildNeeds] = useState('');

  const handleRegister = () => {
    // Validação básica de campos obrigatórios
    const isTutorValid = role === 'tutor' && specialty;
    const isFamilyValid = role === 'familia' && childName && childBirthDate; // Agora exige a data

    if (!name || !email || !password || (!isTutorValid && !isFamilyValid)) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    // Objeto de dados para envio (Pronto para o MongoDB futuramente)
    const userData = {
      name,
      email, // Este é o email do Responsável!
      password,
      role,
      specialty: role === 'tutor' ? specialty : null,
      child: role === 'familia' ? { 
        name: childName, 
        birthDate: childBirthDate, // Adicionado aqui!
        needs: childNeeds 
      } : null
    };

    console.log("Dados prontos para API:", userData);
    
    Alert.alert("Sucesso", `Cadastro de ${role === 'tutor' ? 'Tutor' : 'Família'} realizado!`, [
      { text: "OK", onPress: () => router.replace('/(auth)/login') }
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <Stack.Screen options={{ title: 'Registrar' }} />
            <Text style={styles.title}>Criar Nova Conta</Text>
            
            <Text style={styles.label}>Eu sou:</Text>
            <View style={styles.roleContainer}>
              <TouchableOpacity 
                style={[styles.roleButton, role === 'tutor' && styles.roleActive]} 
                onPress={() => setRole('tutor')}
              >
                <Text style={[styles.roleText, role === 'tutor' && styles.roleTextActive]}>Tutor</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.roleButton, role === 'familia' && styles.roleActive]} 
                onPress={() => setRole('familia')}
              >
                <Text style={[styles.roleText, role === 'familia' && styles.roleTextActive]}>Família</Text>
              </TouchableOpacity>
            </View>

            {/* Campos comuns (Para Família, este é o nome e email do Responsável) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome Completo </Text>
              <TextInput 
                style={styles.input} 
                value={name} 
                onChangeText={setName} 
                placeholder="Digite seu nome" 
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput 
                style={styles.input} 
                value={email} 
                onChangeText={setEmail} 
                placeholder="exemplo@email.com" 
                keyboardType="email-address" 
                autoCapitalize="none" 
              />
            </View>

            {/* CAMPO ESPECÍFICO: TUTOR */}
            {role === 'tutor' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Especialidade</Text>
                <TextInput 
                  style={styles.input} 
                  value={specialty} 
                  onChangeText={setSpecialty} 
                  placeholder="Ex: Educação Especial, Psicologia..." 
                />
              </View>
            )}

            {/* CAMPOS ESPECÍFICOS: FAMÍLIA (CRIANÇA) */}
            {role === 'familia' && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nome da Criança</Text>
                  <TextInput 
                    style={styles.input} 
                    value={childName} 
                    onChangeText={setChildName} 
                    placeholder="Nome do dependente" 
                  />
                </View>

                {/* NOVO CAMPO DE DATA DE NASCIMENTO */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Data de Nascimento da Criança</Text>
                  <TextInput 
                    style={styles.input} 
                    value={childBirthDate} 
                    onChangeText={setChildBirthDate} 
                    placeholder="DD/MM/AAAA" 
                    keyboardType="numeric"
                    maxLength={10}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Necessidades Especiais / Observações</Text>
                  <TextInput 
                    style={[styles.input, styles.textArea]} 
                    value={childNeeds} 
                    onChangeText={setChildNeeds} 
                    placeholder="Descreva as necessidades (TEA, TDAH, Alergias...)" 
                    multiline
                    numberOfLines={3}
                  />
                </View>
              </>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <TextInput 
                style={styles.input} 
                value={password} 
                onChangeText={setPassword} 
                placeholder="Crie uma senha" 
                secureTextEntry 
              />
            </View>

            <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister}>
              <Text style={styles.btnText}>Finalizar Cadastro</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 20 }} onPress={() => router.push('/(auth)/login')}>
              <Text style={{ textAlign: 'center', color: '#2c5282' }}>Já tem uma conta? Entre aqui</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f4f4' },
  container: { padding: 20, paddingBottom: 60 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 24, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2c5282', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  roleContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  roleButton: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, alignItems: 'center' },
  roleActive: { backgroundColor: '#2c5282', borderColor: '#2c5282' },
  roleText: { color: '#666', fontWeight: 'bold' },
  roleTextActive: { color: '#fff' },
  inputGroup: { marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, backgroundColor: '#f9f9f9', fontSize: 16 },
  textArea: { height: 80, textAlignVertical: 'top' },
  btnPrimary: { backgroundColor: '#198754', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});