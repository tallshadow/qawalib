export const isPdfFile = (fileName: string): boolean => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension === 'pdf';
  };