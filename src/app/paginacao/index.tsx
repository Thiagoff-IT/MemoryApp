import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import PaginationTable from "../../components/PaginationTable";

interface Pagina {
  id: number;
  moldura: number;
}

export default function Paginacao() {
  const [paginas, setPaginas] = useState<Pagina[]>([
    { id: 0, moldura: 2 },
    { id: 1, moldura: 5 },
    { id: 2, moldura: 3 },
    { id: 3, moldura: 1 },
  ]);
  const [enderecoVirtual, setEnderecoVirtual] = useState<string>(""); // Endereço inserido pelo usuário
  const [resultado, setResultado] = useState<string | null>(null); // Resultado do cálculo

  const handleSimular = () => {
    const endereco = parseInt(enderecoVirtual);

    if (isNaN(endereco)) {
      alert("Por favor, insira um endereço válido.");
      return;
    }

    const pagina = Math.floor(endereco / 4096); // Calcular a página
    const deslocamento = endereco % 4096; // Calcular o deslocamento

    const entrada = paginas.find((p) => p.id === pagina);

    if (!entrada) {
      setResultado("Página não encontrada!");
      return;
    }

    const enderecoFisico = entrada.moldura * 4096 + deslocamento; // Calcular o endereço físico
    setResultado(`Endereço Virtual: ${endereco} => Página: ${pagina}, Deslocamento: ${deslocamento}, Endereço Físico: ${enderecoFisico}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulação de Paginação</Text>
      <Text style={styles.subtitle}>
        Insira um endereço virtual para calcular a tradução para o endereço físico.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Endereço Virtual"
        value={enderecoVirtual}
        onChangeText={setEnderecoVirtual}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSimular}>
        <Text style={styles.buttonText}>Simular</Text>
      </TouchableOpacity>

      {resultado && <Text style={styles.result}>{resultado}</Text>}
      
      <Text style={styles.subtitle}>Tabela de Páginas</Text>
      <PaginationTable
        data={paginas.map((p) => ({
          id: p.id.toString(),
          moldura: p.moldura.toString(),
        }))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f7f7f7" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10, color: "#333" },
  subtitle: { fontSize: 16, marginVertical: 10, color: "#555" },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 12, 
    marginBottom: 20, 
    borderRadius: 5, 
    backgroundColor: "#fff" 
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: "#4CAF50",
    fontWeight: "bold",
    backgroundColor: "#e7f5e7",
    padding: 10,
    borderRadius: 5,
  },
});
