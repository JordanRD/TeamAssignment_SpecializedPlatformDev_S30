import { StyleSheet } from 'react-native';

export const cartStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 20 
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    marginTop: 60,
    color: '#000'
  },
  listContent: {
    paddingBottom: 120 
  },
  cartItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 25,
    marginHorizontal: 20,
  },
  checkbox: { 
    width: 22, 
    height: 22, 
    borderWidth: 2, 
    borderColor: '#004d40', 
    borderRadius: 6, 
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxActive: {
    backgroundColor: '#004d40',
  },
  productImage: { 
    width: 90, 
    height: 90, 
    borderRadius: 12, 
    backgroundColor: '#f5f5f5' 
  },
  detailsContainer: { 
    flex: 1, 
    marginLeft: 12,
    justifyContent: 'center' 
  },
  productName: { 
    fontSize: 16, 
    fontWeight: '700',
    color: '#333'
  },
  productSize: {
    fontSize: 12,
    color: '#999',
    marginTop: 2
  },
  productPrice: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#004d40',
    marginTop: 4 
  },
  quantityContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 10 
  },
  quantityText: { 
    marginHorizontal: 15, 
    fontWeight: 'bold',
    fontSize: 16
  },
  deleteBtn: { 
    padding: 8,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    marginLeft: 10
  },
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    padding: 20, 
    backgroundColor: '#fff', 
    borderTopWidth: 1, 
    borderTopColor: '#eee',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  totalRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 15 
  },
  totalLabel: { 
    fontSize: 14, 
    color: '#666' 
  },
  totalAmount: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#000'
  },
  checkoutBtn: { 
    backgroundColor: '#004d40', 
    padding: 18, 
    borderRadius: 15, 
    alignItems: 'center' 
  },
  checkoutText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 100
  },
  emptyText: { 
    marginTop: 15, 
    fontSize: 16,
    color: '#aaa',
    fontWeight: '500'
  }
});