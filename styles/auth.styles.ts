import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export const authStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, padding: 25 },
  headerSection: { marginTop: 60, marginBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.black },
  subtitle: { fontSize: 14, color: COLORS.gray, marginTop: 8, lineHeight: 20 },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 55,
  },
  inputActive: { borderColor: COLORS.primary }, 
  icon: { marginRight: 10 },
  inputText: { flex: 1, fontSize: 14, color: COLORS.black },

  forgotPass: { 
    color: COLORS.primary, 
    textAlign: 'right', 
    fontWeight: 'bold', 
    marginBottom: 20 
  },

  primaryBtn: { 
    backgroundColor: COLORS.primary, 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  primaryBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },

  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E5E5E5' },
  dividerText: { marginHorizontal: 10, color: COLORS.gray, fontSize: 12 },

  socialBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: 15,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  }
});