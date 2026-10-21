function NavegadorPersonajes() {
  const [id, setId] = useState(1);
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignorar = false;
    setCargando(true);
    setError("");

    const obtenerPersonaje = async () => {
      try {
        const respuesta = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!respuesta.ok) {
          throw new Error("Error al obtener el personaje");
        }
        const data = await respuesta.json();
        if (!ignorar) {
          setPersonaje(data);
        }
      } catch (err) {
        if (!ignorar) {
          setError(err.message);
        }
      } finally {
        if (!ignorar) {
          setCargando(false);
        }
      }
    };

    obtenerPersonaje();

    return () => {
      ignorar = true;
    };
  }, [id]);

  return (
    <div>
      <div>
        <button 
          onClick={() => setId((prev) => Math.max(1, prev - 1))} 
          disabled={id <= 1}
        >
          Anterior
        </button>
        <button onClick={() => setId((prev) => prev + 1)}>
          Siguiente
        </button>
      </div>

      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!cargando && !error && personaje && (
        <div>
          <img src={personaje.image} alt={personaje.name} />
          <h2>{personaje.name}</h2>
          <p>Especie: {personaje.species}</p>
          <p>Estado: {personaje.status}</p>
        </div>
      )}
    </div>
  );
}