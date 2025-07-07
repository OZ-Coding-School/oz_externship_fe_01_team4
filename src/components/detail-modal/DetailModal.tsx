// src/components/DetailModal.tsx
import  { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import SlideItem from './SlideItem'; // SlideItem 컴포넌트 임포트



function DetailModal() {
    const totalQuestions = 5; // 총 문제 수 (5페이지 고정)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // 현재 슬라이드 인덱스

    // 현재 날짜/시간 정보를 가져오는 함수 (예시)
    const getFormattedDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
    };

    return (
        // 전체 화면을 채우고 배경색을 설정
        <div className="relative min-h-screen bg-gray-100 flex flex-col items-center"> {/* relative 추가 */}
            {/* 1. Header 영역 */}
            <div className="w-full flex justify-between items-start p-6  border-gray-200"> {/* w-full 추가 */}
                <div className="flex items-center space-x-4">
                    <div className="bg-blue-600 text-white p-2 rounded">
                        <span className="font-bold text-lg">TS</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline">
                        <h1 className="text-2xl font-bold text-gray-800 mr-2 sm:mr-4">TypeScript 쪽지시험</h1>
                        <p className="text-sm text-gray-600">
                            과목 : TypeScript | 문제 수 : {totalQuestions}
                        </p>
                    </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                    <p>등록일시 : 2025.02.01 11:22:28</p>
                    <p>수정일시 : {getFormattedDateTime()}</p>
                </div>
            </div>

            {/* 2. Swiper 슬라이드 영역 - SlideItem의 위치와 크기에 맞춰 조정 */}
            {/* flex-grow flex items-center justify-center p-4 제거. 이제 절대 위치로 제어 */}
            <div
                className="absolute" // 절대 위치 지정
                style={{
                    top: '100px',
                    left: '230px',
                    width: '1060px', // SlideItem의 너비와 동일하게 설정
                    height: '600px', // SlideItem의 높이와 동일하게 설정
                    // border: '1px solid #e5e7eb', // border-width: 1px 요청에 따라 추가
                    borderRadius: '12px', // border-radius: 12px 요청에 따라 추가
                }}
            >
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={0} // SwiperSlide 간 간격 제거 (SlideItem이 고정 크기이므로)
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    className="w-full h-full" // 부모 div의 100%를 차지하도록
                    onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
                >
                    {/* totalQuestions 수만큼 SlideItem 렌더링, index 전달 */}
                    {[...Array(totalQuestions)].map((_, index) => (
                        <SwiperSlide key={index}>
                            <SlideItem index={index} /> {/* index prop으로 현재 슬라이드 인덱스 전달 */}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* 페이지네이션 정보 - Swiper와 겹치지 않도록 위치 조정 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 p-4 text-gray-600 text-sm"> {/* 중앙 정렬 및 하단에 위치 */}
                <span className="font-semibold">
                    {currentSlideIndex + 1}/{totalQuestions}
                </span>
            </div>
        </div>
    );
}

export default DetailModal;