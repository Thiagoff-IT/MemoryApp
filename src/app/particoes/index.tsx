import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import Table from "../../components/Table";

interface Particao {
  id: string;
  tamanho: number;
  disponivel: boolean;
}

interface Processo {
  id: string;
  tamanho: number;
  detalhes?: string; // Explicação do cálculo
  alocado?: string; // ID da partição alocada
}

export default function Particoes() {
  const [particoes, setParticoes] = useState<Particao[]>([
    { id: "A", tamanho: 1, disponivel: true },
    { id: "B", tamanho: 0.5, disponivel: true },
    { id: "C", tamanho: 2, disponivel: true },
  ]);
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [resultado, setResultado] = useState<Processo[]>([]);
  const [input, setInput] = useState<string>("");

  const handleAdicionarProcesso = () => {
    const [id, tamanho] = input.split(",");
    if (!id || isNaN(Number(tamanho))) {
      alert("Insira um ID e tamanho válidos. Exemplo: P1,0.5");
      return;
    }
    setProcessos([...processos, { id: id.trim(), tamanho: parseFloat(tamanho) }]);
    setInput("");
  };

  const handleSimular = (estrategia: "First-Fit" | "Best-Fit" | "Worst-Fit") => {
    const resultadoAlocacao = processos.map((processo) => {
      let particaoEscolhida: Particao | undefined;
      let detalhes = "";

      if (estrategia === "First-Fit") {
        detalhes = "Procura a primeira partição que caiba.";
        particaoEscolhida = particoes.find(
          (p) => p.disponivel && p.tamanho >= processo.tamanho
        );
      } else if (estrategia === "Best-Fit") {
        detalhes = "Procura a menor partição disponível que caiba.";
        particaoEscolhida = particoes
          .filter((p) => p.disponivel && p.tamanho >= processo.tamanho)
          .sort((a, b) => a.tamanho - b.tamanho)[0];
      } else if (estrategia === "Worst-Fit") {
        detalhes = "Procura a maior partição disponível que caiba.";
        particaoEscolhida = particoes
          .filter((p) => p.disponivel && p.tamanho >= processo.tamanho)
          .sort((a, b) => b.tamanho - a.tamanho)[0];
      }

      if (particaoEscolhida) {
        particaoEscolhida.disponivel = false;
        detalhes += ` Partição ${particaoEscolhida.id} selecionada (${particaoEscolhida.tamanho}GB).`;
        return { ...processo, alocado: particaoEscolhida.id, detalhes };
      } else {
        detalhes += " Nenhuma partição disponível.";
        return { ...processo, alocado: "Não Alocado", detalhes };
      }
    });

    setResultado(resultadoAlocacao);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Partições de Memória</Text>
      <TextInput
        style={styles.input}
        placeholder="ID,Tamanho (ex: P1,0.5)"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Adicionar Processo" onPress={handleAdicionarProcesso} />
      <Button title="Simular (First-Fit)" onPress={() => handleSimular("First-Fit")} />
      <Button title="Simular (Best-Fit)" onPress={() => handleSimular("Best-Fit")} />
      <Button title="Simular (Worst-Fit)" onPress={() => handleSimular("Worst-Fit")} />
      <Table
        data={resultado.map((r) => ({
          id: r.id,
          tamanho: `${r.tamanho} GB`,
          particao: r.alocado,
          detalhes: r.detalhes,
        }))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20 },
});
