export class Photo {
  filepath: string;
  webviewPath: string;

  constructor(filepath?: string, webviewPath?: string) {
    this.filepath = filepath ?? '';
    this.webviewPath = webviewPath ?? '';
  }
}
