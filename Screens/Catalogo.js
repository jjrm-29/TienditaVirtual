import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import Categoria from "../components/Categoria";
import Producto from "../components/Producto";

const CATEGORIAS_GUIA8 = [
  { id: "fashion", nombre: "Fashion", icono: "shirt-outline" },
  { id: "cars", nombre: "Cars", icono: "car-outline" },
  { id: "babies", nombre: "Babies", icono: "woman-outline" },
  { id: "home", nombre: "Home", icono: "home-outline" },
  { id: "sport", nombre: "Sport", icono: "bicycle-outline" },
  { id: "technology", nombre: "Technology", icono: "laptop-outline" },
];

const PRODUCTOS_GUIA8 = [
  {
    id: "p1",
    nombre: "A Room of One's Own",
    precio: "12",
    tiempo: "4 hours ago",
    color: "#78B8D8",
    imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    categoriaId: "fashion",
  },
  {
    id: "p2",
    nombre: "Wireless headphones",
    precio: "50",
    tiempo: "8 hours ago",
    color: "#abe865",
    imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    categoriaId: "technology",
  },
  {
    id: "p3",
    nombre: "White sneakers",
    precio: "27",
    tiempo: "10 hours ago",
    color: "#F5AFC1",
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    categoriaId: "sport",
  },
  {
    id: "p4",
    nombre: "Classic wristwatch",
    precio: "85",
    tiempo: "1 day ago",
    color: "#F4E2C0",
    imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    categoriaId: "fashion",
  },
  {
    id: "p5",
    nombre: "Travel backpack",
    precio: "40",
    tiempo: "2 days ago",
    color: "#C9B6E4",
    imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    categoriaId: "sport",
  },
  {
    id: "p6",
    nombre: "Desk lamp",
    precio: "18",
    tiempo: "3 days ago",
    color: "#F7D59C",
    imagen: "https://images.unsplash.com/photo-1507473885805-3c0f0d4d0c0a?w=500",
    categoriaId: "home",
  },
];

const Catalogo = ({ navigation }) => {
  const [categorias, setCategorias] = useState(CATEGORIAS_GUIA8);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [productos, setProductos] = useState(PRODUCTOS_GUIA8);
  const [cargandoProductos, setCargandoProductos] = useState(true);

  useEffect(() => {
    obtenerCategorias();
    obtenerProductos();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categorias"));
      const datos = [];
      querySnapshot.forEach((documento) => {
        const data = documento.data();
        datos.push({
          ...data,
          id: data.id ?? documento.id,
        });
      });
      setCategorias(datos.length > 0 ? datos : CATEGORIAS_GUIA8);
    } catch (error) {
      console.error("Error obteniendo categorías: ", error);
      setCategorias(CATEGORIAS_GUIA8);
    }
  };

  const consultarProductos = async (campo, valor) => {
    const consulta = query(collection(db, "Productos"), where(campo, "==", valor));
    const consultaSnapshot = await getDocs(consulta);
    const datos = [];
    consultaSnapshot.forEach((documento) => {
      datos.push({ id: documento.id, ...documento.data() });
    });
    return datos;
  };

  const obtenerProductosPorCategoria = async (categoriaId) => {
    setCargandoProductos(true);
    try {
      let datos = await consultarProductos("categoriaId", categoriaId);

      if (datos.length === 0) {
        datos = await consultarProductos("idCategoria", categoriaId);
      }

      const valorNumerico = Number(categoriaId);
      if (datos.length === 0 && categoriaId !== "" && !Number.isNaN(valorNumerico)) {
        datos = await consultarProductos("categoriaId", valorNumerico);
        if (datos.length === 0) {
          datos = await consultarProductos("idCategoria", valorNumerico);
        }
      }

      if (datos.length === 0) {
        datos = PRODUCTOS_GUIA8.filter(
          (producto) => producto.categoriaId === categoriaId
        );
      }

      setProductos(datos);
    } catch (error) {
      console.error("Error obteniendo productos por categoría:", error);
      setProductos(
        PRODUCTOS_GUIA8.filter((producto) => producto.categoriaId === categoriaId)
      );
    } finally {
      setCargandoProductos(false);
    }
  };

  const obtenerProductos = async () => {
    setCargandoProductos(true);
    try {
      const querySnapshot = await getDocs(collection(db, "Productos"));
      const datos = [];
      querySnapshot.forEach((doc) => {
        datos.push({ id: doc.id, ...doc.data() });
      });
      setProductos(datos.length > 0 ? datos : PRODUCTOS_GUIA8);
    } catch (error) {
      console.error("Error obteniendo productos: ", error);
      setProductos(PRODUCTOS_GUIA8);
    } finally {
      setCargandoProductos(false);
    }
  };

  const manejarCategoria = (categoriaId) => {
    setCategoriaSeleccionada(categoriaId);

    if (categoriaId === "todos") {
      obtenerProductos();
      return;
    }

    obtenerProductosPorCategoria(categoriaId);
  };

  const productosFiltrados = productos.filter((producto) =>
    (producto.nombre || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <ScrollView style={styles.contenedor}>
      <View style={styles.buscador}>
        <Ionicons name="search-outline" size={18} color="#7C7CFF" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#B5B5D5"
          style={styles.input}
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categorias}
      >
        <Categoria
          nombre="Todos"
          icono="apps-outline"
          seleccionada={categoriaSeleccionada === "todos"}
          onPress={() => manejarCategoria("todos")}
        />
        {categorias.map((categoria) => (
          <Categoria
            key={String(categoria.id)}
            nombre={categoria.nombre}
            icono={categoria.icono}
            seleccionada={categoriaSeleccionada === categoria.id}
            onPress={() => manejarCategoria(categoria.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.linea} />
      <Text style={styles.titulo}>News</Text>

      {cargandoProductos ? (
        <ActivityIndicator color="#7C7CFF" size="large" style={styles.cargando} />
      ) : (
        <View style={styles.productos}>
          {productosFiltrados.map((producto) => (
            <Producto
              key={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              tiempo={producto.tiempo || "Hoy"}
              color={producto.color || "#F4F4F4"}
              imagen={producto.imagen}
              onPress={() =>
                navigation?.navigate("DetalleProducto", {
                  nombre: producto.nombre,
                  precio: producto.precio,
                  categoria: producto.tiempo,
                  color: producto.color,
                  imagen: producto.imagen,
                })
              }
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    marginTop: 40,
  },
  buscador: {
    height: 55,
    backgroundColor: "#F5F4FC",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 12,
    marginLeft: 8,
  },
  categorias: {
    marginBottom: 10,
  },
  linea: {
    height: 3,
    backgroundColor: "#AAAAAA",
    marginHorizontal: -10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginTop: 15,
    marginBottom: 10,
  },
  productos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cargando: {
    paddingVertical: 48,
  },
});

export default Catalogo;
