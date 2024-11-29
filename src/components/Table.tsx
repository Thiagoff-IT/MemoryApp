import { View, Text, StyleSheet } from "react-native";

interface TableProps {
  data: { id: string; tamanho: string; particao?: string; detalhes?: string }[];
}

export default function Table({ data }: TableProps) {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.header}>ID</Text>
        <Text style={styles.header}>Tamanho</Text>
        <Text style={styles.header}>Partição</Text>
        <Text style={styles.header}>Cálculo</Text>
      </View>
      {data.map((row, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.cell}>{row.id}</Text>
          <Text style={styles.cell}>{row.tamanho}</Text>
          <Text style={styles.cell}>{row.particao || "N/A"}</Text>
          <Text style={styles.cell}>{row.detalhes || "N/A"}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", padding: 10, borderBottomWidth: 1 },
  header: { flex: 1, fontWeight: "bold", textAlign: "center" },
  cell: { flex: 1, textAlign: "center", fontSize: 12 },
});
