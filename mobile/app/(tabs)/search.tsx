import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

export default function SearchPage() {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />

      <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Search</Text>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }} 
      >
        <View style={styles.searchBarWrapper}>
          <Ionicons name="search" size={20} color={COLORS.gray} />
          <TextInput 
            placeholder="Search items..." 
            style={styles.input}
            autoFocus={true} 
          />
        </View>

        <View style={styles.recentWrapper}>
          <Text style={styles.subTitle}>Recent Searches</Text>
          <Text style={{ color: COLORS.gray }}>No recent searches yet.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { paddingHorizontal: 20, paddingBottom: 10, marginTop: 10 }, 
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  searchBarWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F5F5F5', 
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 12, 
    borderRadius: 12 
  },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
  recentWrapper: { paddingHorizontal: 20 },
  subTitle: { fontWeight: 'bold', marginBottom: 10 }
});