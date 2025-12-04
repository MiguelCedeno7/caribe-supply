"use client";
import { motion } from "framer-motion";

export default function Nosotros() {
  return (
    <main className="min-h-screen bg-green-900 text-gray-100 px-6 py-24">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* ➤ Hero / Intro */}
        <section className="text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight mt-10"
          >
            Conectando talento, arte y mercado global
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300"
          >
            En <span className="font-semibold text-white">CaribeSupply</span> creemos en el poder del talento dominicano — artesanos,
            productores y emprendedores — y en su capacidad para destacar al más alto nivel. Nuestra misión
            es brindarles la plataforma, visibilidad y alcance que merecen.
          </motion.p>
        </section>

        {/* ➤ Misión / Visión */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800/40 backdrop-blur-lg p-12 rounded-2xl border border-gray-700 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Democratizar el comercio digital, promover la economía local y ofrecer a cada artesano la posibilidad
            de llegar a clientes nacionales e internacionales, sin barreras. Queremos que cada creación cuente su historia,
            y que esa historia trascienda fronteras.
          </p>
        </motion.section>

        {/* ➤ Valores */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            { title: "Autenticidad", desc: "Respetamos las raíces, tradiciones y esencia de cada artesano." },
            { title: "Calidad", desc: "Solo productos bien elaborados merecen ser mostrados." },
            { title: "Alcance Global", desc: "Tu talento sin fronteras: clientes en cualquier parte del mundo." },
          ].map((v, i) => (
            <div key={i} className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-shadow shadow-sm hover:shadow-md">
              <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-gray-300 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </motion.section>

        {/* ➤ Equipo */}
        <section className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold mb-12"
          >
            Nuestro Equipo
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-10">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="w-28 h-28 rounded-full bg-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Nombre {i+1}</h3>
                <p className="text-gray-400 mt-1">Rol del integrante</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
