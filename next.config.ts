import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Desde Next 16 `qualities` es una lista blanca y por defecto solo trae [75].
    // Las piezas se generan a q88–q92, así que servirlas al 75 tiraba por la
    // borda la mitad de la calidad en el último paso. 90 es indistinguible del
    // original y deja el 75 disponible por si alguna pieza no lo necesita.
    qualities: [75, 90],
  },
};

export default nextConfig;
