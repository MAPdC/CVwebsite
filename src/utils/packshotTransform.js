// As fotos de garrafa têm margens muito diferentes (umas com muito branco à volta, outras recortadas).
// Mede a área ocupada pela garrafa (píxeis não claros/não transparentes) e devolve o transform
// necessário para a garrafa ocupar a caixa do <img> (object-fit: contain), centrada e inteira.
// O translate é em % da caixa, por isso continua certo enquanto a caixa mantiver a proporção.
export function getPackshotTransform(img) {
  const boxW = img.clientWidth;
  const boxH = img.clientHeight;
  if (!boxW || !boxH || !img.naturalWidth) return null;

  const size = 120;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);

  let minX = size, minY = size, maxX = -1, maxY = -1;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const isContent = data[i + 3] > 20 && Math.min(data[i], data[i + 1], data[i + 2]) < 215;
      if (isContent) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null;

  // Onde a imagem é realmente desenhada dentro da caixa (object-fit: contain)
  const fit = Math.min(boxW / img.naturalWidth, boxH / img.naturalHeight);
  const drawnW = img.naturalWidth * fit;
  const drawnH = img.naturalHeight * fit;
  const offsetX = (boxW - drawnW) / 2;
  const offsetY = (boxH - drawnH) / 2;

  // Garrafa em píxeis da caixa
  const bottleW = ((maxX - minX + 1) / size) * drawnW;
  const bottleH = ((maxY - minY + 1) / size) * drawnH;
  const bottleCX = offsetX + ((minX + maxX + 1) / 2 / size) * drawnW;
  const bottleCY = offsetY + ((minY + maxY + 1) / 2 / size) * drawnH;

  const scale = Math.min(boxW / bottleW, boxH / bottleH, 2.5);
  if (scale < 1.05) return null; // já está bem recortada

  const translateX = ((boxW / 2 - bottleCX) / boxW) * 100;
  const translateY = ((boxH / 2 - bottleCY) / boxH) * 100;
  return `scale(${scale.toFixed(3)}) translate(${translateX.toFixed(2)}%, ${translateY.toFixed(2)}%)`;
}
