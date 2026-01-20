"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File as FileIcon, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { detectFileCategory, formatFileSize, getConversionOptions, type FileInfo, type ConversionOption } from '@/lib/fileDetector';

interface UploadedFile extends FileInfo {
    file: File;
    uploadId?: string;
    savedFilename?: string;
}

interface FileUploaderProps {
    onFilesUploaded?: (files: UploadedFile[]) => void;
    maxFiles?: number;
}

export default function FileUploader({ onFilesUploaded, maxFiles = 10 }: FileUploaderProps) {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setError(null);
        setUploading(true);

        try {
            const newFiles: UploadedFile[] = [];

            for (const file of acceptedFiles) {
                // Detect file category
                const category = detectFileCategory(file.type, file.name);
                const extension = file.name.split('.').pop()?.toLowerCase() || '';

                // Client-side compression for images (reduces upload time & server load)
                let fileToUpload = file;
                if (category === 'image' && file.size > 1024 * 1024) { // > 1MB
                    try {
                        const { compressImage } = await import('@/lib/clientCompression');
                        fileToUpload = await compressImage(file);
                    } catch (compressionError) {
                        console.warn('Compression failed, uploading original:', compressionError);
                    }
                }

                const fileInfo: UploadedFile = {
                    file: fileToUpload,
                    name: file.name,
                    size: fileToUpload.size, // Use compressed size
                    type: file.type,
                    extension,
                    category,
                };

                // Upload file to server
                const formData = new FormData();
                formData.append('file', fileToUpload);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || '업로드 실패');
                }

                const result = await response.json();
                fileInfo.uploadId = result.file.id;
                fileInfo.savedFilename = result.file.savedFilename;

                newFiles.push(fileInfo);
            }

            setUploadedFiles(prev => [...prev, ...newFiles]);
            onFilesUploaded?.(newFiles);
        } catch (err) {
            setError(err instanceof Error ? err.message : '파일 업로드 중 오류가 발생했습니다.');
        } finally {
            setUploading(false);
        }
    }, [onFilesUploaded]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles,
        maxSize: 500 * 1024 * 1024, // 500MB (최대 비디오 용량)
    });

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full">
            {/* Drop Zone */}
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Card
                    className={`relative overflow-hidden border-2 border-dashed p-8 sm:p-12 md:p-16 mb-6 transition-all cursor-pointer rounded-[40px] 
            ${isDragActive ? 'border-blue-500 bg-blue-50/50 scale-[1.02]' : 'border-slate-200 bg-white/50 hover:border-blue-400'}`}
                >
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300
                ${isDragActive ? 'bg-blue-100 text-blue-600 scale-110' : 'bg-blue-50 text-blue-600'}`}
                        >
                            {uploading ? (
                                <div className="animate-spin text-3xl sm:text-4xl">⏳</div>
                            ) : uploadedFiles.length > 0 ? (
                                <CheckCircle2 size={32} className="sm:w-10 sm:h-10" />
                            ) : (
                                <Upload size={32} className="sm:w-10 sm:h-10" />
                            )}
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                            {uploading
                                ? '업로드 중...'
                                : uploadedFiles.length > 0
                                    ? `${uploadedFiles.length}개 파일 업로드 완료`
                                    : '변환할 파일을 선택하세요'}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-500 font-medium">
                            {isDragActive
                                ? '파일을 여기에 놓으세요'
                                : '드래그 앤 드롭 또는 클릭하여 업로드'}
                        </p>

                        {error && (
                            <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                                <AlertCircle size={20} />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                    {uploadedFiles.map((file, index) => (
                        <Card key={index} className="p-3 sm:p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                    <FileIcon size={20} className="sm:w-6 sm:h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base truncate">{file.name}</h4>
                                    <p className="text-xs sm:text-sm text-slate-500">
                                        {formatFileSize(file.size)} • {file.category === 'image' ? '이미지' : file.category === 'pdf' ? 'PDF' : '문서'}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="text-slate-400 hover:text-red-600 flex-shrink-0 h-10 w-10 p-0"
                            >
                                <X size={20} />
                            </Button>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
