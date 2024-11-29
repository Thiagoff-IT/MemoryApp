import { View, Text, StyleSheet } from "react-native";

interface SubstitutionTableProps {
  data: { id: string; referenciada: boolean }[];
}

export default function SubstitutionTable({ data }: SubstitutionTableProps) {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Página</Text>
        <Text style={styles.headerCell}>Referenciada</Text>
      </View>
      {data.map((row, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.cell}>{row.id}</Text>
          <Text style={styles.cell}>{row.referenciada ? "Sim" : "Não"}</Text>
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
