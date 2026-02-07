import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 15 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  iconBtn: { 
    backgroundColor: '#f5f5f5', 
    padding: 8, 
    borderRadius: 10 
  },
  profileSection: { 
    alignItems: 'center', 
    marginVertical: 20 
  },
  avatarWrapper: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: '#f5f5f5', 
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee'
  },
  avatar: { 
    width: '100%', 
    height: '100%' 
  },
  userName: { 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  userEmail: { 
    color: '#888', 
    marginTop: 4 
  },
  editBtn: { 
    marginTop: 20, 
    backgroundColor: '#004d40', 
    paddingHorizontal: 30, 
    paddingVertical: 12, 
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  editBtnText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 15
  },
  menuSection: { 
    paddingHorizontal: 20, 
    marginTop: 10 
  },
  menuItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 18, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f8f8f8' 
  },
  menuLeft: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  menuText: { 
    marginLeft: 15, 
    fontSize: 16, 
    fontWeight: '500' 
  }
});