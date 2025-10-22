import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card, Checkbox } from "react-native-paper";
import ReceitaService from "../services/receitaService";

export default function ReceitaListView() {
  const router = useRouter();
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);

  const receitas = ReceitaService.getAll();

  const todosIngredientes = useMemo(() => {
    const set = new Set();
    receitas.forEach((r) => r.ingredientes.forEach((i) => set.add(i)));
    return Array.from(set);
  }, [receitas]);

  const receitasFiltradas = useMemo(() => {
    if (ingredientesSelecionados.length === 0) return receitas;
    return receitas.filter((r) =>
      ingredientesSelecionados.every((i) => r.ingredientes.includes(i))
    );
  }, [receitas, ingredientesSelecionados]);

  const toggleIngrediente = (item) => {
    setIngredientesSelecionados((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Receitas</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtros}>
        {todosIngredientes.map((i) => (
          <View key={i} style={styles.checkboxContainer}>
            <Checkbox
              status={ingredientesSelecionados.includes(i) ? "checked" : "unchecked"}
              onPress={() => toggleIngrediente(i)}
            />
            <Text>{i}</Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView style={{ flex: 1 }}>
        {receitasFiltradas.map((r) => (
          <Pressable
            key={r.id}
            onPress={() => router.push(`/view/receitaDetailView?id=${r.id}`)}
          >
            <Card style={styles.card}>
              <Card.Title title={r.nome} />
              <Card.Content>
                <Text>Ingredientes: {r.ingredientes.join(", ")}</Text>
                <Text style={{ marginTop: 5 }}>
                  Modo de preparo: {r.instrucoes.substring(0, 50)}...
                </Text>
              </Card.Content>
            </Card>
          </Pressable>
        ))}
      </ScrollView>

      <Button
        mode="contained"
        style={styles.botao}
        onPress={() => router.push("receitaFormView")}
      >
        Nova Receita
      </Button>

      <Button
        mode="outlined"
        style={styles.botaoVoltar}
        onPress={() => router.push("/")}
      >
        Voltar ao Menu
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  filtros: { marginVertical: 10 },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginRight: 10 },
  card: { marginBottom: 15 },
  botao: { marginTop: 10 },
  botaoVoltar: { marginTop: 15, borderColor: "#1E90FF" },
});
