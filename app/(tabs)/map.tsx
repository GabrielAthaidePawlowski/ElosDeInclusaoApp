import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MapScreen() {
  // Lógica de Perfil - Mude para 'familia' para ver a diferença na tela
  const params = useLocalSearchParams();
  const userRole = params.role === 'familia' ? 'familia' : 'tutor';

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<{latitude: number, longitude: number}[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [subscription, setSubscription] = useState<Location.LocationSubscription | null>(null);

  const mapRef = useRef<MapView>(null);

  const startTracking = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de acesso à localização para o rastreio.');
      return;
    }

    setIsTracking(true);
    
    const sub = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000, 
        distanceInterval: 10, 
      },
      (newLocation) => {
        const { latitude, longitude } = newLocation.coords;
        setLocation(newLocation);
        setRouteCoordinates((prev) => [...prev, { latitude, longitude }]);
        
        mapRef.current?.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }, 1000);

        console.log('Tutor enviando posição:', latitude, longitude);
      }
    );
    setSubscription(sub);
  };

  const stopTracking = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
    setIsTracking(false);
    Alert.alert('Rastreio', 'Rastreio finalizado com sucesso.');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: userRole === 'tutor' ? 'Meu Trajeto' : 'Trajeto do Tutor',
          headerTitleAlign: 'center'
        }} 
      />
      
      <MapView 
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={userRole === 'tutor'} 
        loadingEnabled={true}
        initialRegion={{
          latitude: -23.5505, 
          longitude: -46.6333,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {location && (
          <Marker 
            coordinate={location.coords} 
            title={userRole === 'tutor' ? "Você" : "Tutor"} 
          >
            <View style={styles.markerContainer}>
              <Ionicons name="person-circle" size={30} color="#2c5282" />
            </View>
          </Marker>
        )}

        <Polyline 
          coordinates={routeCoordinates} 
          strokeWidth={4} 
          strokeColor="#2c5282" 
        />
      </MapView>

      {/* RENDERIZAÇÃO CONDICIONAL CORRIGIDA */}
      {userRole === 'tutor' ? (
        // Se for Tutor, renderiza os botões
        <View style={styles.floatingContainer}>
          {!isTracking ? (
            <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={startTracking}>
              <Ionicons name="play" size={20} color="#fff" />
              <Text style={styles.btnText}>Iniciar Trajeto</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={stopTracking}>
              <Ionicons name="stop" size={20} color="#fff" />
              <Text style={styles.btnText}>Finalizar Trajeto</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        // Se NÃO for Tutor (ou seja, Família), renderiza o card informativo
        <View style={styles.floatingContainer}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.pulseIndicator} />
              <Text style={styles.infoTitle}>Acompanhando ao vivo</Text>
            </View>
            <Text style={styles.infoSubtitle}>Tutor: Carlos Silva</Text>
            <Text style={styles.infoSubtitle}>Status: Em movimento com Joãozinho</Text>
          </View>
        </View>
      )}

    </View>
  );
}

// ... manter o mesmo objeto styles que já tínhamos ...
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  markerContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 2, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 2 },
  floatingContainer: { position: 'absolute', bottom: 30, width: '100%', paddingHorizontal: 20 },
  btn: { flexDirection: 'row', gap: 10, padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  btnPrimary: { backgroundColor: '#2c5282' },
  btnDanger: { backgroundColor: '#dc3545' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  infoCard: { backgroundColor: '#fff', borderRadius: 12, padding: 20, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, borderLeftWidth: 5, borderLeftColor: '#2c5282' },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  pulseIndicator: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#38a169' }, 
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: '#1a202c' },
  infoSubtitle: { fontSize: 14, color: '#4a5568', marginTop: 2 }
});