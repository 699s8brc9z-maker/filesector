"use client";

import { Card } from '@/components/ui/card';
import { FileImage, FileText, Video, Music, Shield, Zap, HelpCircle } from 'lucide-react';

export default function HelpSection() {
    return (
        <section id="help" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-50/50 to-white">
            <div className="container mx-auto max-w-6xl">
                {/* Section Title */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                        사용 가이드
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                        FileSector를 처음 사용하시나요? 간단한 3단계로 파일을 변환하세요.
                    </p>
                </div>

                {/* How to Use */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 sm:mb-20">
                    <Card className="p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <span className="text-3xl sm:text-4xl">📁</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">1. 파일 업로드</h3>
                        <p className="text-sm sm:text-base text-slate-600">
                            드래그 앤 드롭하거나 클릭하여 변환할 파일을 선택하세요.
                        </p>
                    </Card>

                    <Card className="p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <span className="text-3xl sm:text-4xl">⚙️</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">2. 변환 옵션 선택</h3>
                        <p className="text-sm sm:text-base text-slate-600">
                            원하는 출력 형식을 선택하고 변환 버튼을 클릭하세요.
                        </p>
                    </Card>

                    <Card className="p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <span className="text-3xl sm:text-4xl">⬇️</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">3. 다운로드</h3>
                        <p className="text-sm sm:text-base text-slate-600">
                            변환이 완료되면 다운로드 버튼을 클릭하여 파일을 저장하세요.
                        </p>
                    </Card>
                </div>

                {/* Supported Formats */}
                <div className="mb-16 sm:mb-20">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">
                        지원 파일 형식
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <Card className="p-5 sm:p-6">
                            <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                <FileImage className="text-blue-600" size={24} />
                                <h4 className="font-bold text-slate-900 text-base sm:text-lg">이미지</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 mb-2">
                                <strong>입력:</strong> HEIC, JPG, PNG, WebP, GIF, BMP, TIFF
                            </p>
                            <p className="text-xs sm:text-sm text-slate-600">
                                <strong>출력:</strong> JPG, PNG, WebP, GIF, PDF
                            </p>
                            <p className="text-xs text-slate-400 mt-2 sm:mt-3">최대 50MB</p>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                <FileText className="text-red-600" size={24} />
                                <h4 className="font-bold text-slate-900 text-base sm:text-lg">문서</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 mb-2">
                                <strong>입력:</strong> HWP, DOCX, XLSX, PPTX, 이미지
                            </p>
                            <p className="text-xs sm:text-sm text-slate-600">
                                <strong>출력:</strong> PDF
                            </p>
                            <p className="text-xs text-slate-400 mt-2 sm:mt-3">최대 100MB</p>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                <Video className="text-purple-600" size={24} />
                                <h4 className="font-bold text-slate-900 text-base sm:text-lg">비디오</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 mb-2">
                                <strong>입력:</strong> MP4, WebM, AVI, MOV
                            </p>
                            <p className="text-xs sm:text-sm text-slate-600">
                                <strong>출력:</strong> GIF, MP3, MP4, WebM, 썸네일
                            </p>
                            <p className="text-xs text-slate-400 mt-2 sm:mt-3">최대 500MB</p>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                <Music className="text-green-600" size={24} />
                                <h4 className="font-bold text-slate-900 text-base sm:text-lg">오디오</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 mb-2">
                                <strong>입력:</strong> MP3, WAV, M4A, OGG, FLAC
                            </p>
                            <p className="text-xs sm:text-sm text-slate-600">
                                <strong>출력:</strong> MP3, WAV, M4A, OGG
                            </p>
                            <p className="text-xs text-slate-400 mt-2 sm:mt-3">최대 100MB</p>
                        </Card>
                    </div>
                </div>

                {/* Features */}
                <div className="mb-16 sm:mb-20">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">
                        주요 특징
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <Card className="p-5 sm:p-6 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Zap className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-2 text-base sm:text-lg">빠른 변환 속도</h4>
                                <p className="text-sm sm:text-base text-slate-600">
                                    강력한 서버 성능으로 대부분의 파일을 몇 초 안에 변환합니다.
                                </p>
                            </div>
                        </Card>

                        <Card className="p-5 sm:p-6 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                                <Shield className="text-green-600" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-2 text-base sm:text-lg">안전한 파일 처리</h4>
                                <p className="text-sm sm:text-base text-slate-600">
                                    다운로드 즉시 서버에서 파일이 자동으로 삭제되어 개인정보를 보호합니다.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* FAQ */}
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">
                        자주 묻는 질문
                    </h3>
                    <div className="space-y-4 max-w-3xl mx-auto">
                        <Card className="p-5 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <HelpCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">변환이 실패하면 어떻게 하나요?</h4>
                                    <p className="text-xs sm:text-sm text-slate-600 mb-2">
                                        파일 크기 제한을 확인하고, 지원되는 형식인지 확인하세요. 문제가 계속되면 다른 파일로 시도해보세요.
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-500">
                                        • 이미지: 50MB 이하<br />
                                        • 문서/오디오: 100MB 이하<br />
                                        • 비디오: 500MB 이하
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <HelpCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">업로드한 파일은 안전한가요?</h4>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                        네, 모든 파일은 다운로드 즉시 서버에서 자동으로 삭제됩니다. 파일은 변환 목적으로만 사용되며 저장되지 않습니다.
                                        최대 1시간 후에는 자동으로 완전히 삭제되어 개인정보가 보호됩니다.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <HelpCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">여러 파일을 한번에 변환할 수 있나요?</h4>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                        현재는 이미지를 PDF로 변환할 때만 여러 파일을 한번에 업로드할 수 있습니다.
                                        다른 변환은 한 번에 하나씩 처리됩니다. 향후 업데이트에서 일괄 변환 기능을 추가할 예정입니다.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <HelpCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">HWP 파일을 PDF로 변환할 수 있나요?</h4>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                        네, 한글(HWP) 파일을 PDF로 변환할 수 있습니다. 파일을 업로드하면 자동으로 HWP 형식을 감지하고
                                        PDF 변환 옵션을 제공합니다. 한글 2014 이상 버전을 권장합니다.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <HelpCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">변환 품질은 어떤가요?</h4>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                        고품질 변환 엔진을 사용하여 원본 파일의 품질을 최대한 유지합니다.
                                        이미지는 무손실 또는 고품질 압축을 사용하며, 문서는 레이아웃과 서식을 보존합니다.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <HelpCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">HEIC를 JPG로 변환하면 품질이 떨어지나요?</h4>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                        아니요, 고품질 변환 알고리즘을 사용하여 원본 품질을 최대한 유지합니다.
                                        HEIC의 높은 압축률을 JPG로 변환할 때도 시각적 품질 손실을 최소화합니다.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <HelpCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">회원가입이 필요한가요?</h4>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                        아니요, 회원가입 없이 모든 기능을 무료로 사용할 수 있습니다.
                                        파일을 업로드하고 변환한 후 바로 다운로드하실 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <HelpCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">변환 속도가 느린 이유는?</h4>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                        파일 크기와 변환 복잡도에 따라 속도가 달라집니다.
                                        대용량 비디오나 복잡한 문서는 처리 시간이 더 걸릴 수 있습니다.
                                        일반적으로 이미지는 수 초, 문서는 10-30초, 비디오는 1-3분 정도 소요됩니다.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <HelpCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">모바일에서도 사용할 수 있나요?</h4>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                        네, FileSector는 모바일에 완벽하게 최적화되어 있습니다.
                                        스마트폰이나 태블릿에서도 PC와 동일하게 모든 기능을 사용할 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <HelpCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">사용 제한이 있나요?</h4>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                        공정한 사용을 위해 1분에 최대 50회의 요청 제한이 있습니다.
                                        일반적인 사용에는 전혀 문제가 없으며, 대량 변환이 필요한 경우 여러 번에 나눠서 진행하시면 됩니다.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
