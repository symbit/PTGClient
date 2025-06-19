export function fileDownload(blob: Blob, fileName: string): void {
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(blob);
  const el = document.createElement('a');
  el.href = imageUrl;
  el.download = fileName;
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}
