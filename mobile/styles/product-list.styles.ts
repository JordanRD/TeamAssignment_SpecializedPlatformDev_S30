import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 50) / 2; 

export const listStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 50, 
    marginBottom: 20 
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  grid: { justifyContent: 'space-between' },
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden'
  },
  image: { width: '100%', height: 180, backgroundColor: '#f9f9f9' },
  info: { padding: 12 },
  name: { fontSize: 14, fontWeight: '600', color: '#333' },
  price: { fontSize: 15, fontWeight: 'bold', color: '#004d40', marginTop: 5 },
  discountTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ff8a80',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5
  },
  discountText: { color: '#fff', fontSize: 10, fontWeight: 'bold' }
});