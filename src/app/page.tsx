import { Camara } from "@/components/Camara";
import { CameraTest } from "@/components/CameraTest";
import Image from "next/image";

export default function Home() {
  return (


    <div className="flex flex-col h-screen bg-background">
      <main className="flex-1 flex flex-col items-center justify-center">
        <Camara />

      </main>
    </div>
  );
}
