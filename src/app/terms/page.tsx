import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                        이용약관
                    </h1>
                    <p className="text-slate-600 mb-8">
                        최종 업데이트: 2026년 1월 20일
                    </p>

                    {/* 제1조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제1조 (목적)
                        </h2>
                        <p className="text-slate-700 leading-relaxed">
                            본 약관은 FileSector(이하 "서비스")가 제공하는 파일 변환 서비스의 이용과 관련하여
                            서비스와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                        </p>
                    </section>

                    {/* 제2조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제2조 (정의)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>1. "서비스"란 FileSector가 제공하는 온라인 파일 변환 서비스를 의미합니다.</p>
                            <p>2. "이용자"란 본 약관에 따라 서비스를 이용하는 자를 의미합니다.</p>
                            <p>3. "파일"이란 이용자가 서비스를 통해 업로드하는 디지털 콘텐츠를 의미합니다.</p>
                            <p>4. "변환"이란 파일의 형식을 다른 형식으로 전환하는 서비스를 의미합니다.</p>
                        </div>
                    </section>

                    {/* 제3조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제3조 (약관의 효력 및 변경)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다.</p>
                            <p>2. 서비스는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.</p>
                            <p>3. 약관이 변경되는 경우, 서비스는 변경사항을 시행일자 7일 전부터 공지합니다.</p>
                        </div>
                    </section>

                    {/* 제4조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제4조 (서비스의 제공)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>1. 서비스는 다음과 같은 파일 변환 기능을 제공합니다:</p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>이미지 파일 변환 (HEIC, JPG, PNG, WebP, GIF 등)</li>
                                <li>문서 파일 변환 (HWP, DOCX, XLSX, PPTX to PDF)</li>
                                <li>비디오 파일 변환 (MP4 to GIF, 썸네일 추출 등)</li>
                                <li>오디오 파일 변환 (MP3, WAV, M4A, OGG 등)</li>
                            </ul>
                            <p>2. 서비스는 연중무휴 24시간 제공함을 원칙으로 합니다.</p>
                            <p>3. 서비스는 시스템 점검, 서버 증설 등의 사유로 서비스 제공을 일시 중단할 수 있습니다.</p>
                        </div>
                    </section>

                    {/* 제5조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제5조 (파일 크기 및 사용 제한)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>1. 파일 크기 제한:</p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>이미지 파일: 최대 50MB</li>
                                <li>문서 및 오디오 파일: 최대 100MB</li>
                                <li>비디오 파일: 최대 500MB</li>
                            </ul>
                            <p>2. 공정한 사용을 위해 1분당 최대 50회의 요청 제한이 적용됩니다.</p>
                            <p>3. 서비스는 악의적인 사용이나 과도한 사용을 방지하기 위해 추가 제한을 둘 수 있습니다.</p>
                        </div>
                    </section>

                    {/* 제6조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제6조 (개인정보 보호 및 파일 보안)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>1. 서비스는 이용자의 개인정보를 수집하지 않습니다.</p>
                            <p>2. 업로드된 파일은 변환 목적으로만 사용되며, 다운로드 즉시 서버에서 자동 삭제됩니다.</p>
                            <p>3. 모든 파일은 최대 1시간 후 완전히 삭제됩니다.</p>
                            <p>4. 서비스는 이용자의 파일을 저장, 공유, 또는 제3자에게 제공하지 않습니다.</p>
                        </div>
                    </section>

                    {/* 제7조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제7조 (이용자의 의무)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>불법적인 내용이 포함된 파일의 업로드</li>
                                <li>타인의 저작권, 상표권 등 지적재산권을 침해하는 파일의 업로드</li>
                                <li>악성코드, 바이러스가 포함된 파일의 업로드</li>
                                <li>서비스의 정상적인 운영을 방해하는 행위</li>
                                <li>자동화된 수단을 통한 과도한 서비스 이용</li>
                                <li>기타 관련 법령에 위배되는 행위</li>
                            </ul>
                        </div>
                    </section>

                    {/* 제8조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제8조 (서비스의 중단)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>서비스는 다음의 경우 서비스 제공을 중단할 수 있습니다:</p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>시스템 점검, 보수, 교체 등의 경우</li>
                                <li>천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우</li>
                                <li>서비스 제공 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 제공이 어려운 경우</li>
                            </ul>
                        </div>
                    </section>

                    {/* 제9조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제9조 (면책조항)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>1. 서비스는 무료로 제공되며, 변환 결과의 완벽성을 보장하지 않습니다.</p>
                            <p>2. 서비스는 이용자가 업로드한 파일의 내용에 대해 책임지지 않습니다.</p>
                            <p>3. 서비스는 천재지변, 시스템 장애 등 불가항력적 사유로 인한 서비스 중단에 대해 책임지지 않습니다.</p>
                            <p>4. 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못하거나 손해를 입은 경우, 서비스는 이에 대해 책임지지 않습니다.</p>
                        </div>
                    </section>

                    {/* 제10조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제10조 (저작권)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>1. 서비스가 제공하는 모든 콘텐츠에 대한 저작권은 서비스에 귀속됩니다.</p>
                            <p>2. 이용자가 업로드한 파일의 저작권은 해당 이용자에게 있습니다.</p>
                            <p>3. 이용자는 서비스를 이용함으로써 자신이 업로드한 파일에 대한 적법한 권리를 보유하고 있음을 보증합니다.</p>
                        </div>
                    </section>

                    {/* 제11조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제11조 (분쟁 해결)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>1. 서비스와 이용자 간 발생한 분쟁에 관한 소송은 대한민국 법률을 준거법으로 합니다.</p>
                            <p>2. 서비스와 이용자 간 발생한 분쟁에 관한 소송은 서비스의 본사 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.</p>
                        </div>
                    </section>

                    {/* 부칙 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            부칙
                        </h2>
                        <p className="text-slate-700">
                            본 약관은 2026년 1월 20일부터 시행됩니다.
                        </p>
                    </section>

                    {/* 하단 링크 */}
                    <div className="mt-12 pt-8 border-t border-slate-200">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="text-blue-600 hover:text-blue-700 font-medium text-center"
                            >
                                ← 홈으로 돌아가기
                            </Link>
                            <Link
                                href="/privacy"
                                className="text-blue-600 hover:text-blue-700 font-medium text-center"
                            >
                                개인정보처리방침 보기
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
