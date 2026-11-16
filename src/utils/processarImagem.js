// Converte a imagem escolhida em uma miniatura leve para salvar no localStorage.
export function processarImagem(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Selecione um arquivo de imagem válido.'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Não foi possível ler a imagem.'));
    reader.onload = () => {
      const imagem = new Image();
      imagem.onerror = () => reject(new Error('Não foi possível abrir essa imagem.'));
      imagem.onload = () => {
        const limite = 600;
        const escala = Math.min(1, limite / Math.max(imagem.width, imagem.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(imagem.width * escala));
        canvas.height = Math.max(1, Math.round(imagem.height * escala));
        const contexto = canvas.getContext('2d');
        contexto.clearRect(0, 0, canvas.width, canvas.height);
        contexto.drawImage(imagem, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/webp', 0.8));
      };
      imagem.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
