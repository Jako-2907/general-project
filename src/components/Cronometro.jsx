function Cronometro() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos(prevSegundos => prevSegundos + 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return <div>{segundos}</div>;
}