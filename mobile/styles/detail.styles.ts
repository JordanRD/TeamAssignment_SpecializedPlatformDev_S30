import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const detailStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageContainer: { position: 'relative' },
  productImg: { width: width, height: 450, resizeMode: 'cover' },
  backBtn: { 
    position: 'absolute', top: 50, left: 20, 
    backgroundColor: '#fff', padding: 10, borderRadius: 25,
    elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5
  },
  infoContainer: { padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  productName: { fontSize: 24, fontWeight: 'bold', flex: 1 },
  priceRow: { flexDirection: 'row', alignItems: 'center' },
  price: { fontSize: 20, fontWeight: 'bold', color: '#004d40' },
  discountTag: { backgroundColor: '#004d40', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 8 },
  discountText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  description: { color: '#888', lineHeight: 22, marginVertical: 15 },
  
  brandSection: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 15 },
  brandInfo: { flexDirection: 'row', alignItems: 'center' },
  brandLogo: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#f5f5f5' },
  brandName: { fontWeight: 'bold', fontSize: 16 },
  brandHandle: { color: '#aaa', fontSize: 12 },
  followBtn: { backgroundColor: '#f5f5f5', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 10 },
  
  sizeSection: { marginVertical: 15 },
  sizeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  sizeItem: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15, borderWidth: 1, borderColor: '#eee' },
  sizeActive: { borderColor: '#000', borderWidth: 2 },
  sizeText: { fontWeight: 'bold', color: '#ccc' },
  sizeTextActive: { color: '#000' },
  sizeGuide: { marginLeft: 'auto', color: '#004d40', textDecorationLine: 'underline', fontSize: 12 },

  bottomAction: { flexDirection: 'row', padding: 20, borderTopWidth: 1, borderTopColor: '#eee', alignItems: 'center' },
  cartBtn: { padding: 15, borderRadius: 15, backgroundColor: '#f5f5f5', marginRight: 15 },
  addBtn: { flex: 1, backgroundColor: '#004d40', padding: 18, borderRadius: 15, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});