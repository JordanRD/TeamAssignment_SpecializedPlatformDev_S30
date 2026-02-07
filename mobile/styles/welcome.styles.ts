import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

export const welcomeStyles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: COLORS.primary, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4BDAC', 
  },

  container: { 
    flex: 1, 
    backgroundColor: 'white'
  },
  backgroundImage: { 
    position: 'absolute', 
    top: 0,
    left: 0,
    width: '100%', 
    height: '100%', 
    zIndex: -1,     
    resizeMode: 'cover' 
  },
  bottomCard: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  welcomeTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  welcomeSub: { fontSize: 14, color: COLORS.gray, textAlign: 'center', marginVertical: 15 },
  buttonGroup: { flexDirection: 'row', gap: 15, width: '100%' },
  btnOutline: { flex: 1, padding: 15, borderRadius: 12, backgroundColor: '#F5F5F5', alignItems: 'center' },
  btnPrimary: { flex: 1, padding: 15, borderRadius: 12, backgroundColor: COLORS.primary, alignItems: 'center' },
  btnTextBlack: { fontWeight: 'bold', color: COLORS.black },
  btnTextWhite: { fontWeight: 'bold', color: COLORS.white },
});