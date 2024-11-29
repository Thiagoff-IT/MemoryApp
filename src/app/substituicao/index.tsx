import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import SubstitutionTable from "../../components/SubstitutionTable";

interface Pagina {
  id: string;
  referenciada: boolean;
}

export default function Substituicao() {
  const [memoria, setMemoria] = useState<Pagina[]>([]); // Estado da memória
  const [novaPagina, setNovaPagina] = useState<string>(""); // Entrada de nova página
  const [algoritmo, setAlgoritmo] = useState<string>("FIFO"); // Algoritmo selecionado
  const [log, setLog] = useState<string[]>([]); // Histórico de substituições

  // Adicionar uma nova página na memória
  const adicionarPagina = () => {
    if (novaPagina.trim() === "") {
      Alert.alert("Erro", "Por favor, insira um ID válido para a página.");
      return;
    }
    const novaPaginaObj = { id: novaPagina.trim(), referenciada: true };
    setMemoria((prev) => [...prev, novaPaginaObj]);
    setNovaPagina(""); // Limpa o campo de entrada
  };

  // Substituir a página com o algoritmo selecionado
  const substituirPagina = () => {
    let logTemp = [...log];
    let paginaSubstituida = "";

    if (algoritmo === "FIFO") {
      // FIFO: Remove a página mais antiga
      paginaSubstituida = memoria[0].id;
      setMemoria(memoria.slice(1));
    } else if (algoritmo === "LRU") {
      // LRU: Remove a página menos recentemente utilizada
      const paginaMenosUsada = memoria.reduce((prev, curr) => {
        return prev.referenciada === false ? prev : curr;
      });
      paginaSubstituida = paginaMenosUsada.id;
      setMemoria(memoria.filter((p) => p.id !== paginaMenosUsada.id));
    } else if (algoritmo === "NRU") {
      // NRU: Substitui a primeira página não referenciada
      const paginaNaoReferenciada = memoria.find((p) => !p.referenciada);
      if (paginaNaoReferenciada) {
        paginaSubstituida = paginaNaoReferenciada.id;
        setMemoria(memoria.filter((p) => p.id !== paginaNaoReferenciada.id));
      }
    } else if (algoritmo === "Segunda Chance") {
      // Segunda Chance: Similar ao FIFO, mas páginas com bit de referência 1 têm "segunda chance"
      const pagina = memoria.shift();
      if (pagina?.referenciada) {
        pagina.referenciada = false;
        memoria.push(pagina);
        paginaSubstituida = "Página com segunda chance!";
      } else {
        paginaSubstituida = pagina?.id || "Erro!";
      }
    }

    // Adiciona a substituição ao log
    logTemp.push(`Substituída a página ${paginaSubstituida}`);
    setLog(logTemp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Substituição de Páginas</Text>
      <TextInput
        style={styles.input}
        placeholder="ID da Página (ex: P1)"
        value={novaPagina}
        onChangeText={setNovaPagina}
      />
      <Button title="Adicionar Página" onPress={adicionarPagina} />
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, algoritmo === "FIFO" && styles.selectedButton]}
          onPress={() => setAlgoritmo("FIFO")}
        >
          <Text style={styles.buttonText}>FIFO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, algoritmo === "LRU" && styles.selectedButton]}
          onPress={() => setAlgoritmo("LRU")}
        >
          <Text style={styles.buttonText}>LRU</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, algoritmo === "NRU" && styles.selectedButton]}
          onPress={() => setAlgoritmo("NRU")}
        >
          <Text style={styles.buttonText}>NRU</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, algoritmo === "Segunda Chance" && styles.selectedButton]}
          onPress={() => setAlgoritmo("Segunda Chance")}
        >
          <Text style={styles.buttonText}>Segunda Chance</Text>
        </TouchableOpacity>
      </View>

      <Button title="Substituir Página" onPress={substituirPagina} />

      <Text style={styles.subtitle}>Memória Atual</Text>
      <SubstitutionTable data={memoria} />

      <Text style={styles.subtitle}>Histórico de Substituições</Text>
      <View style={styles.logContainer}>
        {log.map((entry, index) => (
          <Text key={index} style={styles.logText}>{entry}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f7f7f7" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#333" },
  subtitle: { fontSize: 18, marginVertical: 10, color: "#555" },
  input: { 
    borderWidth: 1, 
    padding: 12, 
    marginBottom: 20, 
    borderRadius: 5, 
    backgroundColor: "#fff" 
  },
  buttonsContainer: { flexDirection: "row", marginBottom: 20 },
  button: { 
    flex: 1, 
    backgroundColor: "#4CAF50", 
    padding: 15, 
    marginRight: 10, 
    borderRadius: 5,
    alignItems: "center" 
  },
  selectedButton: { backgroundColor: "#388E3C" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  logContainer: { marginTop: 20, padding: 10, backgroundColor: "#f1f1f1", borderRadius: 5 },
  logText: { fontSize: 16, color: "#333" },
});
