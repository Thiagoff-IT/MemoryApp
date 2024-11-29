import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

interface Pagina {
  id: number;
  referenciada: boolean;
}

export default function Substituicao() {
  const [paginas, setPaginas] = useState<Pagina[]>([]);
  const [novaPagina, setNovaPagina] = useState<string>("");

  const handleAdicionarPagina = () => {
    const id = parseInt(novaPagina);
    if (isNaN(id)) {
      alert("Insira um número válido para o ID da Página!");
      return;
    }
    setPaginas([...paginas, { id, referenciada: false }]);
    setNovaPagina("");
  };

  const handleSubstituir = () => {
    // Simulação com FIFO
    if (paginas.length > 0) {
      const removida = paginas.shift();
      alert(`Página ${removida?.id} foi substituída.`);
      setPaginas([...paginas]);
    } else {
      alert("Nenhuma página para substituir.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Substituição de Páginas</Text>
      <TextInput
        style={styles.input}
        placeholder="ID da Página"
        value={novaPagina}
        onChangeText={setNovaPagina}
      />
      <Button title="Adicionar Página" onPress={handleAdicionarPagina} />
      <Button title="Substituir Página (FIFO)" onPress={handleSubstituir} />
      <Text style={styles.result}>Páginas na memória: {paginas.map((p) => p.id).join(", ")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 20 },
  result: { marginTop: 20, fontSize: 16 },
});
