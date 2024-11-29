import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  const sections = [
    { title: "Partições de Memória", route: "/particoes", description: "Simule alocação de processos em memória fixa." },
    { title: "Paginação", route: "/paginacao", description: "Traduza endereços virtuais para físicos." },
    { title: "Substituição de Páginas", route: "/substituicao", description: "Resolva problemas de substituição de páginas." },
    { title: "Escalonamento de Disco", route: "/escalonamento", description: "Simule FCFS, SSTF e SCAN com cálculo detalhado." },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Provas de SO</Text>
      {sections.map((section, index) => (
        <TouchableOpacity key={index} style={styles.card}>
          <Link href={section.route} style={styles.link}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            <Text style={styles.cardDescription}>{section.description}</Text>
          </Link>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f4f9" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  card: { padding: 20, backgroundColor: "#fff", marginBottom: 15, borderRadius: 10, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  cardDescription: { fontSize: 14, color: "#666", marginTop: 5 },
  link: { textDecorationLine: "none" },
});
