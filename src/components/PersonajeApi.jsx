function PersonajeApi() {
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerPersonaje = async () => {
      try {
        const respuesta = await fetch("https://rickandmortyapi.com/api/character/1");
        if (!respuesta.ok) {
          throw new Error("Error al obtener el personaje");
        }
        const data = await respuesta.json();
        setPersonaje(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerPersonaje();
  }, []);

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <img src={personaje.image} alt={personaje.name} />
      <h2>{personaje.name}</h2>
      <p>Especie: {personaje.species}</p>
      <p>Estado: {personaje.status}</p>
    </div>
  );
}