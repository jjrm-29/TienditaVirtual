import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OtraScreenCliente({ navigation }) {
  const cerrarSesion = () => {
    Alert.alert("Cerrar sesión", "¿Deseas salir de tu cuenta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: () => {
          navigation.getParent()?.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.avatar}>
        <Text style={styles.iniciales}>AB</Text>
      </View>
      <Text style={styles.titulo}>Azter Baez</Text>
      <Text style={styles.rol}>Cliente</Text>

      <View style={styles.tarjeta}>
        <Dato icono="mail-outline" etiqueta="Correo" valor="azter@gmail.com" />
        <Dato icono="call-outline" etiqueta="Teléfono" valor="+505 8888-1122" />
        <Dato icono="location-outline" etiqueta="Ciudad" valor="Juigalpa, Chontales" />
        <Dato icono="calendar-outline" etiqueta="Miembro desde" valor="Marzo 2026" />
        <Dato icono="bag-outline" etiqueta="Pedidos" valor="3 compras" ultimo />
      </View>

      <TouchableOpacity style={styles.boton} onPress={cerrarSesion}>
        <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
        <Text style={styles.textoBoton}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

function Dato({ icono, etiqueta, valor, ultimo }) {
  return (
    <View style={[styles.fila, !ultimo && styles.filaBorde]}>
      <Ionicons name={icono} size={20} color="#7C7CFF" />
      <View style={styles.textoFila}>
        <Text style={styles.etiqueta}>{etiqueta}</Text>
        <Text style={styles.valor}>{valor}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#f7f7ff",
    padding: 24,
    paddingTop: 60,
    alignItems: "center",
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#7C7CFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  iniciales: { color: "#FFFFFF", fontSize: 28, fontWeight: "bold" },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#222" },
  rol: { fontSize: 14, color: "#7C7CFF", fontWeight: "600", marginTop: 4, marginBottom: 22 },
  tarjeta: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  filaBorde: { borderBottomWidth: 1, borderBottomColor: "#EEE" },
  textoFila: { flex: 1 },
  etiqueta: { fontSize: 12, color: "#888" },
  valor: { fontSize: 15, color: "#222", fontWeight: "600", marginTop: 2 },
  boton: {
    backgroundColor: "#7C7CFF",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textoBoton: { color: "#FFFFFF", fontWeight: "bold" },
});
