import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HERO SECTION */}
        <View style={styles.hero}>
          <Image 
            source={require('../assets/images/logoElos.png')} 
            style={styles.mainLogo} 
            resizeMode="contain"
          />
          <Text style={styles.title}>Bem-vindo ao Elos de Inclusão</Text>
          <Text style={styles.subtitle}>
            A ponte de confiança entre famílias e tutores, garantindo segurança e transparência no cuidado infantil.
          </Text>
          
          <View style={styles.btnGroup}>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity style={styles.buttonPrimary}>
                <Text style={styles.buttonTextPrimary}>Cadastrar</Text>
              </TouchableOpacity>
            </Link>
            
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity style={styles.buttonSecondary}>
                <Text style={styles.buttonTextSecondary}>Entrar</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* SOBRE SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o Projeto</Text>
          <Text style={styles.sectionDescription}>
            Nosso aplicativo nasceu da necessidade de criar um ambiente seguro e confiável para o acompanhamento de crianças. Conectamos famílias a tutores qualificados, oferecendo ferramentas essenciais para a tranquilidade de todos.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingBottom: 40 },
  hero: {
    backgroundColor: '#2c5282',
    padding: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  mainLogo: { width: 140, height: 140, marginBottom: 20 },
  title: { color: '#fff', fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#fff', opacity: 0.9, textAlign: 'center', marginTop: 12, fontSize: 16, lineHeight: 22 },
  btnGroup: { width: '100%', marginTop: 35, gap: 15 },
  buttonPrimary: { 
    backgroundColor: '#fff', padding: 16, borderRadius: 10, alignItems: 'center',
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2,
  },
  buttonTextPrimary: { color: '#2c5282', fontWeight: 'bold', fontSize: 16 },
  buttonSecondary: { borderWidth: 2, borderColor: '#fff', padding: 16, borderRadius: 10, alignItems: 'center' },
  buttonTextSecondary: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  section: { padding: 30, alignItems: 'center' },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#2c5282', marginBottom: 15 },
  sectionDescription: { textAlign: 'center', color: '#555', lineHeight: 24, fontSize: 16 }
});