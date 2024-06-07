'use client'
import Contador from '../app/components/counter';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}>
      <div className="bg-white rounded-lg shadow-md p-8">
        <Contador />
      </div>
    </main>
  );
}


