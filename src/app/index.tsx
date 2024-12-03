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
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f9f9f9" 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "600", 
    marginBottom: 20, 
    textAlign: "center", 
    color: "#1c1c1e" 
  },
  card: { 
    padding: 20, 
    backgroundColor: "#ffffff", 
    marginBottom: 15, 
    borderRadius: 12, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: "600", 
    color: "#1c1c1e" 
  },
  cardDescription: { 
    fontSize: 16, 
    color: "#3a3a3c", 
    marginTop: 5 
  },
  link: { 
    textDecorationLine: "none" 
  },
});