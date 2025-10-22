import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import ReceitaService from "../services/receitaService";

export default function ReceitaFormView() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [instrucoes, setInstrucoes] = useState("");

  const salvar = () => {
    if (!nome || !ingredientes || !instrucoes) {
      Toast.show({ type: "error", text1: "Preencha todos os campos" });
      return;
    }

    ReceitaService.add({
      nome,
      ingredientes: ingredientes.split(",").map((i) => i.trim()),
      instrucoes,
    });

    Toast.show({ type: "success", text1: "Receita salva com sucesso!" });
    router.push("receitaListView");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput label="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput
        label="Ingredientes (separe por vírgula)"
        value={ingredientes}
        onChangeText={setIngredientes}
        style={styles.input}
      />
      <TextInput
        label="Instruções"
        value={instrucoes}
        onChangeText={setInstrucoes}
        multiline
        style={[styles.input, { height: 120 }]}
      />

      <Button mode="contained" onPress={salvar} style={styles.botao}>
        Salvar
      </Button>

      <Button onPress={() => router.push("/")} mode="outlined" style={styles.botaoVoltar}>
        Voltar ao Menu
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 10 },
  input: { marginBottom: 10 },
  botao: { marginTop: 10 },
  botaoVoltar: { marginTop: 15, borderColor: "#1E90FF" },
});
