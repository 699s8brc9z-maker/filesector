"use client";

import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import ConversionOptions from "@/components/ConversionOptions";
import ConversionProgress from "@/components/ConversionProgress";
import type { FileInfo, ConversionOption } from "@/lib/fileDetector";

interface UploadedFile extends FileInfo {
  file: File;
  uploadId?: string;
  savedFilename?: string;
}

export default function Hero() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [conversionStatus, setConversionStatus] = useState<'idle' | 'converting' | 'completed' | 'error'>('idle');
  const [outputFile, setOutputFile] = useState<{ id: string; filename: string; format: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles(files);
    setConversionStatus('idle');
    setOutputFile(null);
  };

  const handleConvert = async (option: ConversionOption) => {
    if (uploadedFiles.length === 0) return;

    setConversionStatus('converting');
    setErrorMessage('');

    try {
      const file = uploadedFiles[0];

      // Determine which API to call based on conversion type
      if (option.id.startsWith('image-to-')) {
        if (option.targetFormat === 'pdf') {
          // Convert image to PDF
          const response = await fetch('/api/convert/pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              files: uploadedFiles.map(f => ({
                filename: f.savedFilename,
                id: f.uploadId,
              })),
            }),
          });

          if (!response.ok) {
            throw new Error('PDF 변환 실패');
          }

          const result = await response.json();
          setOutputFile(result.outputFile);
        } else {
          // Convert image format
          const response = await fetch('/api/convert/image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileId: file.uploadId,
              filename: file.savedFilename,
              targetFormat: option.targetFormat,
            }),
          });

          if (!response.ok) {
            throw new Error('이미지 변환 실패');
          }

          const result = await response.json();
          setOutputFile(result.outputFile);
        }
      } else if (option.id.startsWith('hwp-') || option.id.startsWith('doc-') || option.id.startsWith('excel-') || option.id.startsWith('ppt-')) {
        // Document conversion (HWP, DOCX, XLSX, PPTX)
        const response = await fetch('/api/convert/document', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileId: file.uploadId,
            filename: file.savedFilename,
            targetFormat: option.targetFormat,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '문서 변환 실패');
        }

        const result = await response.json();
        setOutputFile(result.outputFile);
      } else if (option.id.startsWith('video-')) {
        // Video conversion (GIF, MP3, MP4, WebM, thumbnail)
        const response = await fetch('/api/convert/video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileId: file.uploadId,
            filename: file.savedFilename,
            targetFormat: option.targetFormat,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '비디오 변환 실패');
        }

        const result = await response.json();
        setOutputFile(result.outputFile);
      } else if (option.id.startsWith('audio-')) {
        // Audio conversion (MP3, WAV, M4A, OGG)
        const response = await fetch('/api/convert/audio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileId: file.uploadId,
            filename: file.savedFilename,
            targetFormat: option.targetFormat,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '오디오 변환 실패');
        }

        const result = await response.json();
        setOutputFile(result.outputFile);
      }

      setConversionStatus('completed');
    } catch (error) {
      setConversionStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '변환 중 오류가 발생했습니다');
    }
  };

  const handleDownload = () => {
    if (!outputFile) return;

    const url = `/api/download/${outputFile.id}?filename=${outputFile.filename}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = outputFile.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setUploadedFiles([]);
    setConversionStatus('idle');
    setOutputFile(null);
    setErrorMessage('');
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 pb-24 sm:pb-32 md:pb-40 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Hero Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 mb-8 sm:mb-10 md:mb-12 leading-[1.1] break-keep">
            모든 파일을 <br />
            <span className="text-red-600 font-black">안전하고 빠르게</span> 변환하세요
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            이미지, 문서, <strong className="text-red-600">한글(HWP)</strong>, 비디오, 오디오까지 모든 파일을 단 몇 초 만에 변환하세요. <br className="hidden sm:block" />
            <span className="block mt-4 sm:mt-5">HEIC to JPG, HWP to PDF, 비디오 to GIF, MP4 to MP3 등 <strong>40가지 이상</strong>의 변환을 지원합니다.</span><br className="hidden sm:block" />
            <span className="text-xs sm:text-sm text-slate-400 block mt-5 sm:mt-6">이미지 50MB, 문서/오디오 100MB, 비디오 500MB까지 지원 · 다운로드 즉시 자동 삭제로 보안 강화</span>
          </p>
        </div>

        {/* Supported Formats */}
        <div className="mb-6 sm:mb-8 grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 max-w-xl sm:max-w-none mx-auto text-slate-400 font-medium">
          <span className="bg-white px-3 sm:px-4 py-2 rounded-full border border-slate-100 shadow-sm text-blue-600 font-bold text-sm sm:text-base text-center">JPG</span>
          <span className="bg-white px-3 sm:px-4 py-2 rounded-full border border-slate-100 shadow-sm text-green-600 font-bold text-sm sm:text-base text-center">PNG</span>
          <span className="bg-white px-3 sm:px-4 py-2 rounded-full border border-slate-100 shadow-sm text-purple-600 font-bold text-sm sm:text-base text-center">WebP</span>
          <span className="bg-white px-3 sm:px-4 py-2 rounded-full border border-slate-100 shadow-sm text-red-600 font-bold text-sm sm:text-base text-center">PDF</span>
          <span className="bg-white px-3 sm:px-4 py-2 rounded-full border border-slate-100 shadow-sm text-indigo-600 font-bold text-sm sm:text-base text-center">DOCX</span>
          <span className="bg-white px-3 sm:px-4 py-2 rounded-full border border-slate-100 shadow-sm text-pink-600 font-bold text-sm sm:text-base text-center">GIF</span>
          <span className="bg-white px-3 sm:px-4 py-2 rounded-full border border-slate-100 shadow-sm text-orange-600 font-bold text-sm sm:text-base text-center">MP3</span>
          <span className="bg-white px-3 sm:px-4 py-2 rounded-full border border-slate-100 shadow-sm text-cyan-600 font-bold text-sm sm:text-base text-center">MP4</span>
          <span className="bg-white px-3 sm:px-4 py-2 rounded-full border border-slate-100 shadow-sm text-teal-600 font-bold text-sm sm:text-base text-center">WAV</span>
          <span className="bg-white px-3 sm:px-4 py-2 rounded-full border border-slate-100 shadow-sm text-violet-600 font-bold text-sm sm:text-base text-center">WebM</span>
        </div>

        {/* File Uploader */}
        <FileUploader onFilesUploaded={handleFilesUploaded} maxFiles={5} />

        {/* Conversion Options */}
        {uploadedFiles.length > 0 && conversionStatus === 'idle' && (
          <div className="mt-8">
            <ConversionOptions
              file={uploadedFiles[0]}
              onConvert={handleConvert}
            />
          </div>
        )}

        {/* Conversion Progress */}
        {conversionStatus !== 'idle' && (
          <div className="mt-8">
            <ConversionProgress
              status={conversionStatus}
              message={errorMessage}
              outputFile={outputFile || undefined}
              onDownload={handleDownload}
              onReset={handleReset}
            />
          </div>
        )}
      </div>
    </section>
  );
}
