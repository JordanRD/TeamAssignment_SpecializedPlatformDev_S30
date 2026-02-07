import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const homeStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 20, 
    marginBottom: 10,
    paddingHorizontal: 20 
  },
  greetText: { 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  iconBtn: { 
    backgroundColor: '#f5f5f5', 
    padding: 10, 
    borderRadius: 12 
  },
  
  // BANNER PROMO
  promoCard: { 
    backgroundColor: '#000', 
    borderRadius: 20, 
    height: 200, 
    flexDirection: 'row', 
    alignItems: 'center', 
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 10,
    marginHorizontal: 20 
  },
  promoImage: { 
    position: 'absolute', 
    right: 0, 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover',
    zIndex: 0 
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1 
  },
  promoTextGroup: { 
    padding: 25, 
    zIndex: 2, 
    flex: 1,
    justifyContent: 'center'
  },
  promoTitle: { 
    color: '#fff', 
    fontSize: 32, 
    fontWeight: 'bold', 
    lineHeight: 38 
  },
  shopBtn: { 
    borderWidth: 1, 
    borderColor: '#fff', 
    paddingHorizontal: 15, 
    paddingVertical: 6, 
    borderRadius: 5, 
    marginTop: 15, 
    alignSelf: 'flex-start' 
  },
  shopText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 14 
  },

  // SECTION HEADER
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
    paddingHorizontal: 20 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
  },
  viewAllText: {
    color: '#004d40',
    fontWeight: 'bold',
    fontSize: 14
  },

  // PRODUCT GRID
  productGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
    paddingBottom: 20 
  },
  productCard: { 
    width: '47%', 
    marginBottom: 20 
  },

  imageWrapper: {
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    width: '100%',
    marginTop: 20,
    fontSize: 14,
  },

  productImg: { 
    width: '100%', 
    height: 180, 
    resizeMode: 'cover'
  },
  productName: { 
    fontSize: 15, 
    fontWeight: '600', 
    marginTop: 5 
  },
  productPrice: { 
    fontSize: 14, 
    color: '#004d40', 
    marginTop: 4, 
    fontWeight: 'bold' 
  }
});