// components/BillPDF.js
import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Optional: Embed custom font if needed
// Font.register({ family: 'Roboto', src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxP.ttf' });

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1 solid #000',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  col: {
    flex: 1,
    paddingRight: 5,
  },
  footer: {
    marginTop: 20,
    borderTop: '1 solid #000',
    paddingTop: 10,
    fontSize: 12,
  },
});

const BillPDF = ({ order }) => {
  const { customer, items, totalPrice, createdAt } = order;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>Order Invoice</Text>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.bold}>Customer Details</Text>
          <Text>Name: {customer.name}</Text>
          <Text>Email: {customer.email}</Text>
          <Text>Phone: {customer.Phone}</Text>
          <Text>
            Address: {customer.address.street}, {customer.address.city} -{' '}
            {customer.address.postalCode}
          </Text>
        </View>

        {/* Order Date */}
        <View style={styles.section}>
          <Text>Order Date: {new Date(createdAt).toLocaleDateString()}</Text>
          <Text>Order ID: {order._id}</Text>
        </View>

        {/* Items Table */}
        <View style={styles.section}>
          <Text style={styles.bold}>Order Items</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.col, { flex: 3 }]}>Item</Text>
            <Text style={styles.col}>Qty</Text>
            <Text style={styles.col}>Price</Text>
            <Text style={styles.col}>Total</Text>
          </View>

          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.col, { flex: 3 }]}>
                {item.food.foodname}
              </Text>
              <Text style={styles.col}>{item.quantity}</Text>
              <Text style={styles.col}>₹{item.food.price}</Text>
              <Text style={styles.col}>₹{item.food.price * item.quantity}</Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.section}>
          <Text style={styles.bold}>Total Amount: ₹{totalPrice}</Text>
          <Text>Status: {order.status}</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Thank you for your order!</Text>
      </Page>
    </Document>
  );
};

export default BillPDF;