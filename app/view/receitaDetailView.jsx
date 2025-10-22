import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Button, Card } from "react-native-paper";
import ReceitaService from "../services/receitaService";

export default function ReceitaDetailView() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [receita, setReceita] = useState(null);

  useEffect(() => {
    const r = ReceitaService.getAll().find((r) => r.id === id);
    if (!r) {
      alert("Receita não encontrada!");
      router.back();
    } else {
      setReceita(r);
    }
  }, [id]);

  if (!receita) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={receita.nome} />
        <Card.Content>
          <Text style={styles.subtitle}>Ingredientes:</Text>
          {receita.ingredientes.map((i, idx) => (
            <Text key={idx}>• {i}</Text>
          ))}
          <Text style={[styles.subtitle, { marginTop: 10 }]}>Modo de preparo:</Text>
          <Text>{receita.instrucoes}</Text>
        </Card.Content>
      </Card>

      <Button mode="outlined" style={styles.botao} onPress={() => router.back()}>
        Voltar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { marginBottom: 20 },
  subtitle: { fontWeight: "700", marginBottom: 5 },
  botao: { marginTop: 10 },
});
