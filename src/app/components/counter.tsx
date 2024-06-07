import { useState, useEffect } from 'react';
import { db } from '../firebase/db';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

function Contador() {
  const [contador, setContador] = useState<number>(0);

  useEffect(() => {
    const obtenerContador = async () => {
      const docRef = doc(db, 'contador', 'valor');

      // Crear el documento si no existe
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, { valor: 0 });
      }

      // Escuchar cambios en tiempo real
      const unsubscribe = onSnapshot(docRef, (doc) => {
        console.log("onSnapshot: Contador actualizado:", doc.data()?.valor);
        setContador(doc.data()?.valor);
      });

      // Limpiar el listener al desmontar el componente
      return () => unsubscribe(); 
    };

    obtenerContador();
  }, []);

  const incrementarContador = async () => {
    console.log("IncrementarContador: Iniciando incremento...");
    const docRef = doc(db, 'contador', 'valor');
    const docSnap = await getDoc(docRef);

    const nuevoValor = (docSnap.data()?.valor || 0) + 1;
    console.log("IncrementarContador: Nuevo valor:", nuevoValor);

    await setDoc(docRef, { valor: nuevoValor });
    setContador(nuevoValor);
  };

  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button onClick={incrementarContador}>Incrementar</button>
    </div>
  );
}

export default Contador;
