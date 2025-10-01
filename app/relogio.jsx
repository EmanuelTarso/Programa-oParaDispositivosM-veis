import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const valorInicial = 25 * 60; // Tempo inicial em segundos (25 minutos)
  const [timeLeft, setTimeLeft] = useState(valorInicial); // Tempo restante em segundos
  const [isRunning, setIsRunning] = useState(false);
  const [timeLabel, setTimeLabel] = useState("Start");

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(atualiza, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setTimeLabel("Start");
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft]);

  function atualiza() {
    setTimeLeft((prevTime) => prevTime - 1); // Diminui o tempo em 1 segundo
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function startTimer() {
    if (isRunning) {
      setIsRunning(false); // Se já estiver rodando, para o timer
      setTimeLabel("Start");
    } else {
      setIsRunning(true); // Caso contrário, começa o timer
      setTimeLabel("Stop");
    }
  }

  return (
    <View style={style.container}>
      <Image source={require("./relogio.jpg")} style={style.image} />
      <View style={style.acttions}>
        <Text style={style.timer}>{formatTime(timeLeft)}</Text>
        <Pressable
          style={isRunning ? style.buttonStop : style.buttonStart}
          onPress={startTimer}
        >
          <Text style={style.textButton}>{timeLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#021123",
    gap: 40,
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: "contain",
    borderRadius: 100,
  },
  acttions: {
    padding: 24,
    backgroundColor: "#14448080",
    width: "80%",
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#144480",
    alignItems: "center",
    gap: 32,
  },
  timer: {
    fontSize: 54,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonStart: {
    padding: 24,
    backgroundColor: "#021123",
    width: "80%",
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#144480",
  },
  buttonStop: {
    padding: 24,
    backgroundColor: "#990000",
    width: "80%",
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#144480",
  },
  textButton: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
