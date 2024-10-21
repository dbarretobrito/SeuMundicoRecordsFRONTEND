declare global {
  interface CloudinaryUploadWidgetOptions {
    cloudName: string;
    uploadPreset: string;
    // Adicione mais opções conforme necessário
  }

  interface CloudinaryUploadWidgetResult {
    event: string;
    info: {
      secure_url: string;
      // Adicione mais propriedades conforme necessário
    };
  }

  interface Window {
    cloudinary: {
      openUploadWidget: (
        options: CloudinaryUploadWidgetOptions,
        callback: (error: unknown | null, result: CloudinaryUploadWidgetResult) => void
      ) => void;
    };
  }
}

// Isso é necessário para o TypeScript reconhecer que este arquivo
// deve ser tratado como um módulo.
export {};
