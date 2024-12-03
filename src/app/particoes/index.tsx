import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Picker } from "react-native";

interface Particao {
  id: string;
  tamanho: number;
  disponivel: boolean;
  ocupadoAte?: number; // Tempo até quando a partição está ocupada
}

interface Processo {
  id: string;
  chegada: number;
  tamanho: number;
  duracao: number;
}

export default function AlocacaoMemoria() {
  const [particoes, setParticoes] = useState<Particao[]>([]);
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [inputParticao, setInputParticao] = useState({ id: "", tamanho: "", estado: "livre" });
  const [inputProcesso, setInputProcesso] = useState({ id: "", chegada: "", tamanho: "", duracao: "" });

  const handleAdicionarParticao = () => {
    const { id, tamanho, estado } = inputParticao;
    if (!id || isNaN(Number(tamanho))) {
      alert("Insira um ID e tamanho válidos.");
      return;
    }
    setParticoes([
      ...particoes,
      { id: id.trim(), tamanho: parseFloat(tamanho), disponivel: estado === "livre" },
    ]);
    setInputParticao({ id: "", tamanho: "", estado: "livre" });
  };

  const handleAdicionarProcesso = () => {
    const { id, chegada, tamanho, duracao } = inputProcesso;
    if (!id || isNaN(Number(chegada)) || isNaN(Number(tamanho)) || isNaN(Number(duracao))) {
      alert("Insira um ID, chegada, tamanho e duração válidos.");
      return;
    }
    setProcessos([
      ...processos,
      {
        id: id.trim(),
        chegada: parseInt(chegada),
        tamanho: parseFloat(tamanho),
        duracao: parseInt(duracao),
      },
    ]);
    setInputProcesso({ id: "", chegada: "", tamanho: "", duracao: "" });
  };

  const simularAlocacao = (estrategia: "First-Fit" | "Best-Fit" | "Worst-Fit") => {
    const timeline: { [key: number]: Particao[] } = {};
    const particoesCopy = JSON.parse(JSON.stringify(particoes));

    for (let tempo = 0; tempo <= 10; tempo++) {
      // Liberar partições ocupadas
      particoesCopy.forEach((particao) => {
        if (particao.ocupadoAte === tempo) {
          particao.disponivel = true;
          particao.ocupadoAte = undefined;
        }
      });

      // Alocar processos que chegam no tempo atual
      processos.forEach((processo) => {
        if (processo.chegada === tempo) {
          let particaoEscolhida;
          if (estrategia === "First-Fit") {
            particaoEscolhida = particoesCopy.find(
              (p) => p.disponivel && p.tamanho >= processo.tamanho
            );
          } else if (estrategia === "Best-Fit") {
            particaoEscolhida = particoesCopy
              .filter((p) => p.disponivel && p.tamanho >= processo.tamanho)
              .sort((a, b) => a.tamanho - b.tamanho)[0];
          } else if (estrategia === "Worst-Fit") {
            particaoEscolhida = particoesCopy
              .filter((p) => p.disponivel && p.tamanho >= processo.tamanho)
              .sort((a, b) => b.tamanho - a.tamanho)[0];
          }

          if (particaoEscolhida) {
            particaoEscolhida.disponivel = false;
            particaoEscolhida.ocupadoAte = tempo + processo.duracao;
          }
        }
      });

      // Salvar estado das partições no tempo atual
      timeline[tempo] = JSON.parse(JSON.stringify(particoesCopy));
    }

    return timeline;
  };

  const timelineFirstFit = simularAlocacao("First-Fit");
  const timelineBestFit = simularAlocacao("Best-Fit");
  const timelineWorstFit = simularAlocacao("Worst-Fit");

  const renderTimeline = (timeline: { [key: number]: Particao[] }) => {
    return (
      <View style={styles.tableContainer}>
        <View style={styles.row}>
          <Text style={styles.headerCell}>Tempo</Text>
          {particoes.map((particao) => (
            <Text key={particao.id} style={styles.headerCell}>
              Partição {particao.id}
            </Text>
          ))}
        </View>
        {Object.keys(timeline).map((tempo) => (
          <View key={tempo} style={styles.row}>
            <Text style={styles.cell}>{tempo}</Text>
            {timeline[tempo].map((particao) => (
              <Text key={particao.id} style={styles.cell}>
                {particao.disponivel ? "Livre" : `Ocupado (${particao.ocupadoAte})`}
              </Text>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Alocação de Memória</Text>
      <Text style={styles.subtitle}>Adicionar Partição</Text>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="ID"
          value={inputParticao.id}
          onChangeText={(text) => setInputParticao({ ...inputParticao, id: text })}
          placeholderTextColor="#8e8e93"
        />
        <TextInput
          style={styles.input}
          placeholder="Tamanho (GB)"
          value={inputParticao.tamanho}
          onChangeText={(text) => setInputParticao({ ...inputParticao, tamanho: text })}
          placeholderTextColor="#8e8e93"
        />
        <Picker
          selectedValue={inputParticao.estado}
          style={styles.picker}
          onValueChange={(itemValue) => setInputParticao({ ...inputParticao, estado: itemValue })}
        >
          <Picker.Item label="Livre" value="livre" />
          <Picker.Item label="Ocupado" value="ocupado" />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleAdicionarParticao}>
          <Text style={styles.buttonText}>Adicionar Partição</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Adicionar Processo</Text>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="ID"
          value={inputProcesso.id}
          onChangeText={(text) => setInputProcesso({ ...inputProcesso, id: text })}
          placeholderTextColor="#8e8e93"
        />
        <TextInput
          style={styles.input}
          placeholder="Chegada (seg)"
          value={inputProcesso.chegada}
          onChangeText={(text) => setInputProcesso({ ...inputProcesso, chegada: text })}
          placeholderTextColor="#8e8e93"
        />
        <TextInput
          style={styles.input}
          placeholder="Tamanho (GB)"
          value={inputProcesso.tamanho}
          onChangeText={(text) => setInputProcesso({ ...inputProcesso, tamanho: text })}
          placeholderTextColor="#8e8e93"
        />
        <TextInput
          style={styles.input}
          placeholder="Duração (seg)"
          value={inputProcesso.duracao}
          onChangeText={(text) => setInputProcesso({ ...inputProcesso, duracao: text })}
          placeholderTextColor="#8e8e93"
        />
        <TouchableOpacity style={styles.button} onPress={handleAdicionarProcesso}>
          <Text style={styles.buttonText}>Adicionar Processo</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Simulação - First-Fit</Text>
      <Text style={styles.description}>Procura a primeira partição que caiba.</Text>
      {renderTimeline(timelineFirstFit)}
      <Text style={styles.subtitle}>Simulação - Best-Fit</Text>
      <Text style={styles.description}>Procura a menor partição disponível que caiba.</Text>
      {renderTimeline(timelineBestFit)}
      <Text style={styles.subtitle}>Simulação - Worst-Fit</Text>
      <Text style={styles.description}>Procura a maior partição disponível que caiba.</Text>
      {renderTimeline(timelineWorstFit)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f7",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#1c1c1e",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#1c1c1e",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#1c1c1e",
  },
  inputGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#d1d1d6",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    marginBottom: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007aff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    flex: 1,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  tableContainer: {
    flexDirection: "column",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#d1d1d6",
    textAlign: "center",
    fontWeight: "700",
    backgroundColor: "#e5e5ea",
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#d1d1d6",
    textAlign: "center",
  },
});