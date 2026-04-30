import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TextInput, 
  TouchableOpacity, Platform, Keyboard, Animated 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

export default function MessagesScreen() {
  const insets = useSafeAreaInsets(); 
  const flatListRef = useRef<FlatList>(null);
  const [inputText, setInputText] = useState('');
  
  // 1. ANIMAÇÃO DO TECLADO: A solução definitiva para Android
  const [keyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        Animated.timing(keyboardHeight, {
          duration: 250,
          toValue: e.endCoordinates.height,
          useNativeDriver: false,
        }).start();
        // Rola para baixo quando o teclado abre
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(keyboardHeight, {
          duration: 250,
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
      
    };
  }, []);

  const userRole = 'tutor' as string; 
  const chatTitle = userRole === 'tutor' ? 'Família do Joãozinho' : 'Tutor (Prof. Carlos)';

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Olá! Como o Joãozinho está hoje?', sender: 'other', time: '14:00' },
    { id: '2', text: 'Oi! Ele está ótimo. Participou bem das atividades lúdicas.', sender: 'me', time: '14:05' },
    { id: '3', text: 'Que maravilha! A medicação das 12h foi tranquila?', sender: 'other', time: '14:08' },
    { id: '4', text: 'Sim, registrei lá no diário. Sem problemas!', sender: 'me', time: '14:10' },
  ]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    // 2. TIREI O SafeAreaView e coloquei View normal. O paddingBottom animado empurra tudo!
    <Animated.View style={[styles.safe, { paddingBottom: keyboardHeight }]}>
      
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <View style={styles.avatar}>
            <Stack.Screen options={{ title: 'Mensagens' }} />
            <Ionicons name="person" size={24} color="#2c5282" />
          </View>
          <View>
            <Text style={styles.headerName}>{chatTitle}</Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#2c5282" />
        </TouchableOpacity>
      </View>

      {/* LISTA DE MENSAGENS */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }} // Importante para preencher o espaço
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => {
          const isMe = item.sender === 'me';
          return (
            <View style={[styles.messageWrapper, isMe ? styles.wrapperMe : styles.wrapperOther]}>
              <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
                <Text style={[styles.messageText, isMe ? styles.textMe : styles.textOther]}>
                  {item.text}
                </Text>
                <Text style={[styles.messageTime, isMe ? styles.timeMe : styles.timeOther]}>
                  {item.time}
                </Text>
              </View>
            </View>
          );
        }}
      />

      {/* BARRA DE DIGITAÇÃO */}
      <View style={[
        styles.inputArea, 
        // Garante que a barra não fique atrás dos botões virtuais do Android quando o teclado fechar
        { paddingBottom: Math.max(insets.bottom, 15) } 
      ]}>
        <View style={styles.inputWrapper}>
          <TextInput 
            style={styles.input} 
            placeholder="Digite sua mensagem..." 
            value={inputText}
            onChangeText={setInputText}
            multiline
            placeholderTextColor="#999"
          />
          <TouchableOpacity 
            style={[styles.btnSend, !inputText.trim() && styles.btnSendDisabled]} 
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0f2f5' },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  headerInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center' },
  headerName: { fontSize: 16, fontWeight: 'bold', color: '#1a202c' },
  headerStatus: { fontSize: 12, color: '#38a169', fontWeight: '600' },
  
  messageList: { padding: 15, paddingBottom: 20 },
  messageWrapper: { marginBottom: 15, flexDirection: 'row' },
  wrapperMe: { justifyContent: 'flex-end' },
  wrapperOther: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 18, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 },
  bubbleMe: { backgroundColor: '#2c5282', borderBottomRightRadius: 4 },
  bubbleOther: { backgroundColor: '#fff', borderBottomLeftRadius: 4 },
  messageText: { fontSize: 15, lineHeight: 22 },
  textMe: { color: '#fff' },
  textOther: { color: '#2d3748' },
  messageTime: { fontSize: 11, marginTop: 5, alignSelf: 'flex-end' },
  timeMe: { color: '#a0aec0' },
  timeOther: { color: '#a0aec0' },
  
  inputArea: { 
    backgroundColor: '#fff', 
    paddingHorizontal: 15, 
    paddingTop: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#e2e8f0' 
  },
  inputWrapper: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  input: { flex: 1, backgroundColor: '#f8f9fa', borderRadius: 20, paddingHorizontal: 15, paddingTop: 10, paddingBottom: 10, minHeight: 45, maxHeight: 100, borderWidth: 1, borderColor: '#e2e8f0', color: '#333' },
  btnSend: { backgroundColor: '#2c5282', width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginBottom: 2 },
  btnSendDisabled: { backgroundColor: '#a0aec0' }
});