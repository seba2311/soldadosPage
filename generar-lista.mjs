
import fs from 'node:fs';
import path from 'node:path';

const carpeta = './img/carrusel_kick';
const archivoSalida = './imagenes.json';

const extensionesPermitidas = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif'
]);

if (!fs.existsSync(carpeta)) {
  throw new Error(`No existe la carpeta: ${carpeta}`);
}

const imagenes = fs.readdirSync(carpeta, { withFileTypes: true })
  .filter(archivo =>
    archivo.isFile() &&
    extensionesPermitidas.has(
      path.extname(archivo.name).toLowerCase()
    )
  )
  .map(archivo => `img/carrusel_kick/${archivo.name}`)
  .sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base'
    })
  );

fs.writeFileSync(
  archivoSalida,
  JSON.stringify(imagenes, null, 2) + '\n',
  'utf8'
);

console.log(`Galería generada: ${imagenes.length} imágenes.`);
