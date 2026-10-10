import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function Reader() {
  const { id } = useParams();
  const nav = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    let rendition;
    (async () => {
      const { data: book } = await api.get(`/books`);
      const b = book.find((x) => String(x.id) === id);
      if (!b) return nav('/');

      if (b.format === 'epub') {
        const ePub = (await import('epubjs')).default;
        const epub = ePub(b.drive_url);
        rendition = epub.renderTo(containerRef.current, { width: '100%', height: '80vh' });
        rendition.display();
      } else {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
        const pdf = await pdfjs.getDocument(b.drive_url).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        containerRef.current.appendChild(canvas);
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      }
    })();
    return () => { if (rendition) rendition.destroy(); };
  }, [id]);

  return (
    <div className="container">
      <button onClick={() => nav('/')} style={{ width: 'auto', padding: '8px 16px' }}>← Volver</button>
      <div ref={containerRef} style={{ marginTop: 12 }} />
    </div>
  );
}
