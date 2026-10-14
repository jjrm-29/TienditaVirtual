import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const iniciarSesion = () => {
    const nombreUsuario = usuario.trim().toLowerCase();
    const clave = contrasena.trim();

    if (nombreUsuario === "x" && clave === "1234") {
      navigation.replace("ClienteTabs");
    } else if (nombreUsuario === "y" && clave === "1234") {
      navigation.replace("AdminTabs");
    } else {
      Alert.alert("Acceso denegado", "Usuario o contraseña incorrectos.");
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>IKY</Text>
      <Text style={styles.subtitulo}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />
      <TouchableOpacity style={styles.boton} onPress={iniciarSesion}>
        <Text style={styles.textoBoton}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#f7f7ff",
  },
  titulo: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#7C7CFF",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },
  boton: {
    backgroundColor: "#7C7CFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
