import { useState, useEffect } from 'react';
import { db } from '../firebase/db';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

function Contador() {
  const [contador, setContador] = useState<number>(0);

  useEffect(() => {
    const obtenerContador = async () => {
      const docRef = doc(db, 'contador', 'valor');
    
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, { valor: 0 });
      }

      const unsubscribe = onSnapshot(docRef, (doc) => {
        console.log("onSnapshot: Contador actualizado:", doc.data()?.valor);
        setContador(doc.data()?.valor);
      });

      
      return () => unsubscribe(); 
    };

    obtenerContador();
  }, []);

  const incrementarContador = async () => {
    console.log("Valor del contador: Iniciando el aumento de valor...");
    const docRef = doc(db, 'contador', 'valor');
    const docSnap = await getDoc(docRef);

    const nuevoValor = (docSnap.data()?.valor || 0) + 1;
    console.log("Valor del contador: Nuevo valor:", nuevoValor);

    await setDoc(docRef, { valor: nuevoValor });
    setContador(nuevoValor);
  };

  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button onClick={incrementarContador}>Aumentar Valor</button>
    </div>
  );
}

export default Contador;
