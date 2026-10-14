import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetalleProducto({ route, navigation }) {
  const {
    nombre = "Producto",
    precio = 0,
    categoria = "",
    color = "#F4F4F4",
    imagen,
  } = route.params || {};

  return (
    <View style={styles.contenedor}>
      <TouchableOpacity style={styles.volver} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color="#333" />
        <Text style={styles.textoVolver}>Volver</Text>
      </TouchableOpacity>

      <View style={[styles.imagenCaja, { backgroundColor: color }]}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={styles.imagen} />
        ) : (
          <Ionicons name="image-outline" size={64} color="#AAA9C2" />
        )}
      </View>

      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.precio}>$ {precio}</Text>
      {categoria ? <Text style={styles.categoria}>{categoria}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 50,
  },
  volver: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  textoVolver: {
    marginLeft: 6,
    fontSize: 16,
    color: "#333",
  },
  imagenCaja: {
    height: 280,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagen: {
    width: "80%",
    height: "85%",
    resizeMode: "contain",
  },
  nombre: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  precio: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#7C7CFF",
    marginTop: 8,
  },
  categoria: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
  },
});
