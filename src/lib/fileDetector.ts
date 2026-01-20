/**
 * File type detection and categorization
 */

export interface FileInfo {
    name: string;
    size: number;
    type: string;
    extension: string;
    category: 'image' | 'document' | 'pdf' | 'video' | 'audio' | 'unknown';
}

export interface ConversionOption {
    id: string;
    label: string;
    targetFormat: string;
    icon: string;
    description: string;
}

/**
 * Detect file category from MIME type and extension
 */
export function detectFileCategory(mimeType: string, filename: string): FileInfo['category'] {
    const ext = filename.split('.').pop()?.toLowerCase() || '';

    // Image files
    if (mimeType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'heif', 'bmp', 'tiff', 'svg'].includes(ext)) {
        return 'image';
    }

    // PDF files
    if (mimeType === 'application/pdf' || ext === 'pdf') {
        return 'pdf';
    }

    // Document files (including HWP)
    if (
        mimeType.includes('word') ||
        mimeType.includes('document') ||
        mimeType.includes('spreadsheet') ||
        mimeType.includes('presentation') ||
        mimeType.includes('hwp') ||
        ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'hwp', 'hwpx', 'txt', 'rtf', 'odt', 'ods', 'odp'].includes(ext)
    ) {
        return 'document';
    }

    // Video files
    if (mimeType.startsWith('video/') || ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', 'm4v'].includes(ext)) {
        return 'video';
    }

    // Audio files
    if (mimeType.startsWith('audio/') || ['mp3', 'wav', 'm4a', 'aac', 'flac', 'ogg', 'wma', 'opus'].includes(ext)) {
        return 'audio';
    }

    return 'unknown';
}

/**
 * Get available conversion options based on file type
 */
export function getConversionOptions(fileInfo: FileInfo): ConversionOption[] {
    const { category, extension } = fileInfo;

    switch (category) {
        case 'image':
            return [
                {
                    id: 'image-to-jpg',
                    label: '→ JPG',
                    targetFormat: 'jpg',
                    icon: '🖼️',
                    description: '가장 호환성 높은 이미지 포맷'
                },
                {
                    id: 'image-to-png',
                    label: '→ PNG',
                    targetFormat: 'png',
                    icon: '🎨',
                    description: '투명 배경 지원, 무손실 압축'
                },
                {
                    id: 'image-to-webp',
                    label: '→ WebP',
                    targetFormat: 'webp',
                    icon: '⚡',
                    description: '최신 웹 최적화 포맷, 작은 용량'
                },
                {
                    id: 'image-to-pdf',
                    label: '→ PDF',
                    targetFormat: 'pdf',
                    icon: '📄',
                    description: '문서 형태로 저장'
                }
            ].filter(opt => opt.targetFormat !== extension);

        case 'pdf':
            return [
                {
                    id: 'pdf-to-images',
                    label: '→ 이미지',
                    targetFormat: 'jpg',
                    icon: '🖼️',
                    description: 'PDF 페이지를 개별 이미지로'
                },
                {
                    id: 'pdf-to-word',
                    label: '→ DOCX',
                    targetFormat: 'docx',
                    icon: '📝',
                    description: '편집 가능한 문서로 변환'
                },
                {
                    id: 'pdf-split',
                    label: '→ 분할',
                    targetFormat: 'pdf',
                    icon: '✂️',
                    description: '페이지별로 분리'
                }
            ];

        case 'document':
            // Determine specific document type
            if (extension === 'hwp' || extension === 'hwpx') {
                return [
                    {
                        id: 'hwp-to-pdf',
                        label: '→ PDF',
                        targetFormat: 'pdf',
                        icon: '📄',
                        description: '한글 문서를 PDF로 (공유용)'
                    },
                    {
                        id: 'hwp-to-docx',
                        label: '→ DOCX',
                        targetFormat: 'docx',
                        icon: '📝',
                        description: 'MS Word에서 편집 가능'
                    }
                ];
            } else if (['docx', 'doc'].includes(extension)) {
                return [
                    {
                        id: 'doc-to-pdf',
                        label: '→ PDF',
                        targetFormat: 'pdf',
                        icon: '📄',
                        description: '범용 문서 포맷으로'
                    }
                ];
            } else if (['xlsx', 'xls'].includes(extension)) {
                return [
                    {
                        id: 'excel-to-pdf',
                        label: '→ PDF',
                        targetFormat: 'pdf',
                        icon: '📄',
                        description: '스프레드시트를 PDF로'
                    }
                ];
            } else if (['pptx', 'ppt'].includes(extension)) {
                return [
                    {
                        id: 'ppt-to-pdf',
                        label: '→ PDF',
                        targetFormat: 'pdf',
                        icon: '📄',
                        description: '프레젠테이션을 PDF로'
                    }
                ];
            } else {
                return [
                    {
                        id: 'doc-to-pdf',
                        label: '→ PDF',
                        targetFormat: 'pdf',
                        icon: '📄',
                        description: '범용 문서 포맷으로 변환'
                    }
                ];
            }

        case 'video':
            return [
                {
                    id: 'video-to-gif',
                    label: 'GIF로 변환',
                    targetFormat: 'gif',
                    icon: '🎬',
                    description: '짧은 애니메이션으로 변환'
                }
            ];

        case 'video':
            return [
                {
                    id: 'video-to-gif',
                    label: '→ GIF',
                    targetFormat: 'gif',
                    icon: '🎬',
                    description: 'SNS용 애니메이션 GIF로 변환'
                },
                {
                    id: 'video-to-mp3',
                    label: '→ MP3',
                    targetFormat: 'mp3',
                    icon: '🎵',
                    description: '오디오만 추출'
                },
                {
                    id: 'video-to-mp4',
                    label: '→ MP4',
                    targetFormat: 'mp4',
                    icon: '📹',
                    description: '범용 비디오 포맷'
                },
                {
                    id: 'video-to-webm',
                    label: '→ WebM',
                    targetFormat: 'webm',
                    icon: '🌐',
                    description: '웹 최적화 비디오'
                },
                {
                    id: 'video-thumbnail',
                    label: '→ 썸네일',
                    targetFormat: 'jpg',
                    icon: '🖼️',
                    description: '첫 프레임 이미지 추출'
                }
            ].filter(opt => opt.targetFormat !== extension);

        case 'audio':
            return [
                {
                    id: 'audio-to-mp3',
                    label: '→ MP3',
                    targetFormat: 'mp3',
                    icon: '🎵',
                    description: '범용 오디오 포맷'
                },
                {
                    id: 'audio-to-wav',
                    label: '→ WAV',
                    targetFormat: 'wav',
                    icon: '🎼',
                    description: '무손실 오디오'
                },
                {
                    id: 'audio-to-m4a',
                    label: '→ M4A',
                    targetFormat: 'm4a',
                    icon: '🍎',
                    description: 'Apple 기기용'
                },
                {
                    id: 'audio-to-ogg',
                    label: '→ OGG',
                    targetFormat: 'ogg',
                    icon: '🌐',
                    description: '웹 오디오'
                }
            ].filter(opt => opt.targetFormat !== extension);

        default:
            return [];
    }
}

/**
 * Validate file size
 */
export function validateFileSize(size: number, maxSize: number = 100 * 1024 * 1024): boolean {
    return size <= maxSize;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * Generate unique file ID
 */
export function generateFileId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}
