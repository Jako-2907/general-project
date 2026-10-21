function RecordarNombre() {
  const [nombre, setNombre] = useState(() => {
    return localStorage.getItem("nombre") || "";
  });

  useEffect(() => {
    localStorage.setItem("nombre", nombre);
  }, [nombre]);

  return (
    <div>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <p>Hola, {nombre}</p>
    </div>
  );
}