import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface EnrollmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEnroll?: (data: { course: string; term: number | ''; startDate: string; endDate: string }) => void;
    }

    const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ isOpen, onClose, onEnroll }) => {
    const [course, setCourse] = useState('');
    const [term, setTerm] = useState<number | ''>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const modalContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
            onClose();
        }
        };

        if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        } else {
        document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleEnrollmentSubmit = () => {
        if (!course || !term || !startDate || !endDate) {
        alert('모든 필드를 채워주세요.');
        return;
        }

        if (onEnroll) {
        onEnroll({
            course,
            term,
            startDate: startDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
            endDate: endDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
        });
        }

        onClose();
        setCourse('');
        setTerm('');
        setStartDate(null);
        setEndDate(null);
    };

    if (!isOpen) return null;

    const courseOptions = [
        { value: '', label: '과정 선택' },
        { value: 'frontend-bootcamp', label: '웹 개발 초격차 프론트엔드 부트캠프' },
        { value: 'backend-bootcamp', label: '웹 개발 초격차 백엔드 부트캠프' }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
            ref={modalContentRef}
            className="bg-white rounded-[6px] shadow-xl p-6 relative"
            style={{ width: '744px', height: '439px' }}
        >
            {/* 모달 헤더 */}
            <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-semibold text-gray-800">기수 등록</h2>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="모달 닫기"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>

            {/* 테이블 스타일 입력 폼 */}
            <div className="border border-gray-200 divide-y divide-gray-200 ml-5 mr-5">
            {/* 과정 선택 */}
            <div className="flex">
                <div className="w-1/3 bg-gray-100 px-4 py-3 text-sm text-gray-700 font-medium border-r border-gray-200 flex items-center">
                과정 선택
                </div>
                <div className="w-2/3 px-4 py-2 flex items-center">
                <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    style={{
                    width: '240px',
                    height: '36px',
                    borderRadius: '3px',
                    borderWidth: '1px',
                    }}
                >
                    {courseOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                    ))}
                </select>
                </div>
            </div>

            {/* 기수 */}
            <div className="flex">
                <div className="w-1/3 bg-gray-100 px-4 py-3 text-sm text-gray-700 font-medium border-r border-gray-200 flex items-center">
                기수
                </div>
                <div className="w-2/3 px-4 py-2 flex items-center">
                <input
                    type="number"
                    placeholder="예: 14"
                    value={term}
                    onChange={(e) =>
                    setTerm(e.target.value === '' ? '' : parseInt(e.target.value))
                    }
                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    style={{
                    width: '96px',
                    height: '36px',
                    borderRadius: '3px',
                    borderWidth: '1px',
                    MozAppearance: 'textfield',
                    }}
                    onWheel={(e) => e.currentTarget.blur()}
                    onKeyDown={(e) => {
                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                        e.preventDefault();
                    }
                    }}
                />
                </div>
            </div>

            {/* 시작일 */}
            <div className="flex">
                <div className="w-1/3 bg-gray-100 px-4 py-3 text-sm text-gray-700 font-medium border-r border-gray-200 flex items-center">
                시작일
                </div>
                <div className="w-2/3 px-4 py-2 flex items-center">
                <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    dateFormat="yyyy년 MM월 dd일"
                    placeholderText="예: 2025년 6월 11일"
                    className="text-sm px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    wrapperClassName="w-auto"
                    popperPlacement="bottom-start" 
                    customInput={
                    <input
                        style={{
                        width: '240px',
                        height: '36px',
                        borderRadius: '3px',
                        borderWidth: '1px',
                        borderColor: '#D1D5DB',
                        outline: 'none',
                        }}
                        className="text-sm px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    />
                    }
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 ml-2 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5" />
                </svg>
                </div>
            </div>

            {/* 종료일 */}
            <div className="flex">
                <div className="w-1/3 bg-gray-100 px-4 py-3 text-sm text-gray-700 font-medium border-r border-gray-200 flex items-center">
                종료일
                </div>
                <div className="w-2/3 px-4 py-2 flex items-center">
                <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => setEndDate(date)}
                    dateFormat="yyyy년 MM월 dd일"
                    placeholderText="예: 2026년 2월 28일"
                    className="text-sm px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    wrapperClassName="w-auto"
                    popperPlacement="bottom-start" 
                    customInput={
                    <input
                        style={{
                            width: '240px',
                            height: '36px',
                            borderRadius: '3px',
                            borderWidth: '1px',
                            borderColor: '#D1D5DB',
                            outline: 'none',
                        }}
                        className="text-sm px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    />
                    }
                />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 ml-2 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 0 0 0 21 18.75m-18 0v-7.5" />
                        </svg>
                </div>
            </div>
            </div>

            {/* 등록 버튼 */}
            <div className="absolute" style={{ top: '373px', left: '658px' }}>
                <button
                    onClick={handleEnrollmentSubmit}
                    className="rounded-[3px] text-white transition-colors focus:outline-none"
                    style={{
                    width: '55px',
                    height: '35px',
                    backgroundColor: '#522193',
                    fontFamily: 'Pretendard',
                    fontWeight: 400,
                    fontSize: '14px',
                    fontStyle: 'normal',
                    lineHeight: '100%',
                    letterSpacing: '0',
                    textAlign: 'center',
                    }}
                >
                    등록
                </button>
            </div>

        </div>
        </div>
    );
};

export default EnrollmentModal;