import { View, Text, StyleSheet } from "react-native";

interface PaginationTableProps {
  data: { id: string; moldura: string }[];
}

export default function PaginationTable({ data }: PaginationTableProps) {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Página</Text>
        <Text style={styles.headerCell}>Moldura</Text>
      </View>
      {data.map((row, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.cell}>{row.id}</Text>
          <Text style={styles.cell}>{row.moldura}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: { marginTop: 20, borderRadius: 8, overflow: "hidden" },
  headerRow: { flexDirection: "row", padding: 15, backgroundColor: "#4CAF50" },
  headerCell: { flex: 1, fontWeight: "bold", textAlign: "center", color: "#fff" },
  row: { flexDirection: "row", padding: 15, borderBottomWidth: 1, borderColor: "#ddd" },
  cell: { flex: 1, textAlign: "center", fontSize: 14 },
});
