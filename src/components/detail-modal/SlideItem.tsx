// src/components/SlideItem.tsx
import React, { useState, useEffect } from 'react';

interface SlideItemProps {
  index: number; // 현재 슬라이드의 인덱스를 받음
}

const SlideItem: React.FC<SlideItemProps> = ({ index }) => {
  // 각 문제 유형별 선택 상태 (초기화)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null); // 다지선다, O/X
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]); // 순서 정렬
  const [inputValue, setInputValue] = useState<string>(''); // 단답형
  const [blankInputs, setBlankInputs] = useState<Record<string, string>>({ A: '', B: '' }); // 빈칸 채우기

  // 문제 데이터 (하드코딩된 예시)
  let questionTitle = `문제 ${index + 1} (가상의 문제 내용)`;
  let correctAnswer: string | string[] | Record<string, string> = '';
  let explanation = '이곳은 문제에 대한 해설이 들어갈 부분입니다. 현재는 가상으로 표시됩니다.';
  let questionTypeUI;

  // 컴포넌트 마운트 시 또는 index 변경 시 선택 상태 초기화
  useEffect(() => {
    setSelectedChoice(null);
    setSelectedOrder([]);
    setInputValue('');
    setBlankInputs({ A: '', B: '' }); // 빈칸 초기화 값
  }, [index]);

  // 각 페이지별 문제 유형 정의
  if (index === 0) { // 1번 페이지: 다지선다형
    questionTitle = `TypeScript의 타입 호환성 규칙에 따라, 상위 타입 값을 하위 타입 변수에 할당하게 허용하는 방식은 무엇입까요? (5점)`;
    correctAnswer = 'B';
    explanation = '하위 타입 값을 상위 타입으로 취급하는 것을 업캐스팅이라고 하며, 이는 대부분의 경우 안전하게 허용됩니다. 반대인 다운캐스팅은 일반적으로 허용되지 않아요.';
    const choices = [
        { id: 'A', text: '상위 타입 값을 하위 타입 변수에 할당' },
        { id: 'B', text: '하위 타입 값을 상위 타입 변수에 할당' },
        { id: 'C', text: '서로소 유니온 타입을 일반 유니온 타입 변수에 할당' },
        { id: 'D', text: 'any 타입 값을 unknown 타입 변수에 할당' },
    ];
    questionTypeUI = (
      <div className="space-y-4">
        {choices.map((choice) => {
          const isSelected = selectedChoice === choice.id;
          const isCorrect = correctAnswer === choice.id;
          const showCorrectFeedback = selectedChoice !== null; // 선택 후 정답 표시

          return (
            <div
              key={choice.id}
              className={`flex items-center border rounded-md p-3 text-gray-700 cursor-pointer transition-all duration-200
                        ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-gray-50'}
                        ${showCorrectFeedback && isCorrect ? 'border-green-600 bg-green-50' : ''}
                        ${showCorrectFeedback && isSelected && !isCorrect ? 'border-red-600 bg-red-50' : ''}
              `}
              onClick={() => setSelectedChoice(choice.id)}
            >
              <span className="font-semibold w-6">{choice.id}.</span>
              <span>{choice.text}</span>
              {isSelected && isCorrect && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
               {isSelected && !isCorrect && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    );
  } else if (index === 1) { // 2번 페이지: O/X형
    questionTitle = `TypeScript에서 모든 숫자는 double-precision floating-point 값으로 저장됩니다. (5점)`;
    correctAnswer = 'O';
    explanation = 'TypeScript의 number 타입은 JavaScript의 number와 동일하게 64비트 부동소수점 형식을 따릅니다.';
    const choices = [{ id: 'O', text: 'O' }, { id: 'X', text: 'X' }];

    questionTypeUI = (
      <div className="space-y-4">
        {choices.map((choice) => {
          const isSelected = selectedChoice === choice.id;
          const isCorrect = correctAnswer === choice.id;
          const showCorrectFeedback = selectedChoice !== null;

          return (
            <div
              key={choice.id}
              className={`flex items-center border rounded-md p-3 text-gray-700 cursor-pointer transition-all duration-200
                        ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-gray-50'}
                        ${showCorrectFeedback && isCorrect ? 'border-green-600 bg-green-50' : ''}
                        ${showCorrectFeedback && isSelected && !isCorrect ? 'border-red-600 bg-red-50' : ''}
              `}
              onClick={() => setSelectedChoice(choice.id)}
            >
              <span className="font-semibold w-6">{choice.text}</span>
              {isSelected && isCorrect && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {isSelected && !isCorrect && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    );
  } else if (index === 2) { // 3번 페이지: 순서 정렬형
    questionTitle = `다음은 TypeScript 코드가 실행되기까지의 과정을 순서 없이 나열한 것입니다. 아래 항목들을 올바른 순서로 나열해보세요. (5점)`;
    correctAnswer = ['B', 'C', 'A', 'D']; // 올바른 순서 (배열)
    explanation = 'TypeScript는 (B)TypeScript 파일 작성 -> (C)타입 검사(오류 확인) -> (A)자바스크립트로 변환(컴파일) -> (D)변환된 자바스크립트 실행 순서로 진행됩니다.';
    const orderItems = [
      { id: 'A', text: '자바스크립트로 변환(컴파일)' },
      { id: 'B', text: 'TypeScript 파일 작성' },
      { id: 'C', text: '타입 검사(오류 확인)' },
      { id: 'D', text: '변환된 자바스크립트 실행' },
    ];

    // 선택된 순서가 정답과 일치하는지 확인
    const isOrderCorrect = JSON.stringify(selectedOrder) === JSON.stringify(correctAnswer);
    const showFeedback = selectedOrder.length === correctAnswer.length; // 모든 항목을 선택했을 때 피드백 표시

    const handleOrderItemClick = (id: string) => {
      setSelectedOrder((prevOrder) => {
        if (prevOrder.includes(id)) {
          // 이미 선택된 항목이면 선택 해제
          return prevOrder.filter((item) => item !== id);
        } else {
          // 새로운 항목 추가
          return [...prevOrder, id];
        }
      });
    };

    questionTypeUI = (
      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-4">항목:</h4>
        <ul className="space-y-2 list-none p-0 mb-6">
          {orderItems.map((item) => (
            <li
              key={item.id}
              className={`bg-gray-50 border rounded-md p-3 flex items-center cursor-pointer transition-all duration-200
                          ${selectedOrder.includes(item.id) ? 'border-blue-600 bg-blue-100' : 'border-gray-300'}
              `}
              onClick={() => handleOrderItemClick(item.id)}
            >
              <span className="font-semibold mr-2">({item.id})</span>
              <span>{item.text}</span>
              {selectedOrder.includes(item.id) && (
                <span className="ml-auto px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                  {selectedOrder.indexOf(item.id) + 1}
                </span>
              )}
            </li>
          ))}
        </ul>

        {selectedOrder.length > 0 && (
            <div className="mt-6 text-gray-700 mb-4">
                <span className="font-semibold">현재 선택 순서 : </span>
                <span className="font-bold text-blue-600">
                    {selectedOrder.map(id => orderItems.find(item => item.id === id)?.id).join(', ')}
                </span>
            </div>
        )}

        {showFeedback && (
          <div className={`text-lg font-bold ${isOrderCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isOrderCorrect ? '정답입니다!' : '오답입니다.'}
          </div>
        )}
      </div>
    );
  } else if (index === 3) { // 4번 페이지: 단답형
      questionTitle = `TypeScript에서 'as' 키워드는 어떤 용도로 사용되나요? `;
      correctAnswer = '타입 단언'; // 단답형 정답 예시
      explanation = "TypeScript에서 'as' 키워드는 타입 단언(Type Assertion)에 사용됩니다. 개발자가 특정 값이 명시된 타입이라고 확신할 때 사용하며, 컴파일러에게 해당 타입으로 간주하도록 지시합니다. 이는 런타임에 영향을 주지 않고 컴파일 시점에 타입 검사를 우회하는 데 사용될 수 있습니다.";
      const isCorrect = inputValue.trim().toLowerCase() === String(correctAnswer).toLowerCase();
      const showFeedback = inputValue.trim().length > 0;

      questionTypeUI = (
          <div>
              <input
                  type="text"
                  placeholder="정답을 입력하세요..."
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2
                              ${showFeedback && isCorrect ? 'border-green-500 ring-green-200' : ''}
                              ${showFeedback && !isCorrect ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-500'}
                  `}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
              />
              {showFeedback && (
                <p className={`mt-2 text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? '정답입니다!' : '오답입니다.'}
                </p>
              )}
          </div>
      );
  } else if (index === 4) { // 5번 페이지: 빈칸 채우기
      questionTitle = `다음 문장의 빈칸을 채우세요. (5점)`;
      correctAnswer = { A: '타입 주석', B: '사용자 정의 타입' }; // 빈칸 채우기 정답 (객체)
      explanation = 'TypeScript는 변수나 함수에 타입을 명시하는 타입 주석과, interface/type 키워드를 통해 직접 타입을 정의하는 사용자 정의 타입 기능을 제공하여 JavaScript의 한계를 보완합니다.';
      const blankOptions = [
          { id: 'A', text: '타입 주석' },
          { id: 'B', text: '사용자 정의 타입' },
          { id: 'C', text: '동적 타이핑' }, // 예시 추가
          { id: 'D', text: '가상 DOM' }, // 예시 추가
      ];

      const handleBlankInputChange = (id: string, value: string) => {
        setBlankInputs(prev => ({ ...prev, [id]: value }));
      };

      const handleOptionClick = (text: string) => {
          // 현재 활성화된(클릭된) 빈칸이 있다면 그곳에 값을 넣거나
          // 아니면 첫 번째 빈칸, 또는 아직 채워지지 않은 빈칸에 값을 넣습니다.
          // 여기서는 예시로 'A' 빈칸을 타겟으로 설정합니다. 실제로는 더 복잡한 로직이 필요할 수 있습니다.
          if (blankInputs['A'] === '') {
              handleBlankInputChange('A', text);
          } else if (blankInputs['B'] === '') {
              handleBlankInputChange('B', text);
          }
          // 더 복잡한 빈칸 채우기 로직은 사용자 인터랙션 디자인에 따라 달라집니다.
      };

      const isBlankCorrect = (blankId: string) => {
          const expected = (correctAnswer as Record<string, string>)[blankId];
          return blankInputs[blankId].trim().toLowerCase() === expected.toLowerCase();
      };
      const allBlanksFilled = Object.values(blankInputs).every(val => val.trim() !== '');
      const allBlanksCorrect = allBlanksFilled && Object.keys(correctAnswer).every(isBlankCorrect);


      questionTypeUI = (
          <div>
              <p className="text-lg text-gray-800 mb-4">
                  1. 변수나 함수의 매개변수, 반환값에 타입을 명시하는 것을 (A) <span className="inline-block relative">
                        <input
                            type="text"
                            className={`w-40 p-2 border rounded-md text-center
                                ${blankInputs.A && isBlankCorrect('A') ? 'border-green-500 bg-green-50' : ''}
                                ${blankInputs.A && !isBlankCorrect('A') ? 'border-red-500 bg-red-50' : ''}
                            `}
                            value={blankInputs.A}
                            onChange={(e) => handleBlankInputChange('A', e.target.value)}
                        />
                        {blankInputs.A && (
                            <span className="absolute right-2 top-1/2 -translate-y-1/2">
                                {isBlankCorrect('A') ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </span>
                        )}
                    </span>이라고 한다.
              </p>
              <p className="text-lg text-gray-800 mb-4">
                  2. interface 또는 type 키워드를 사용하여 객체의 구조를 정의할 수 있는데, 이렇게 만든 타입을 (B) <span className="inline-block relative">
                        <input
                            type="text"
                            className={`w-48 p-2 border rounded-md text-center
                                ${blankInputs.B && isBlankCorrect('B') ? 'border-green-500 bg-green-50' : ''}
                                ${blankInputs.B && !isBlankCorrect('B') ? 'border-red-500 bg-red-50' : ''}
                            `}
                            value={blankInputs.B}
                            onChange={(e) => handleBlankInputChange('B', e.target.value)}
                        />
                          {blankInputs.B && (
                            <span className="absolute right-2 top-1/2 -translate-y-1/2">
                                {isBlankCorrect('B') ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </span>
                        )}
                    </span>이라고 부른다.
              </p>
              <div className="space-y-4 mt-8">
                  {blankOptions.map(option => (
                      <div
                          key={option.id}
                          className="flex items-center border border-gray-300 rounded-md p-3 text-gray-700 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleOptionClick(option.text)}
                      >
                          <span className="font-semibold w-6">({option.id})</span>
                          <span>{option.text}</span>
                      </div>
                  ))}
              </div>
              {allBlanksFilled && (
                  <p className={`mt-4 text-center text-lg font-bold ${allBlanksCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {allBlanksCorrect ? '모든 빈칸이 정답입니다!' : '일부 빈칸이 오답입니다.'}
                  </p>
              )}
          </div>
      );
  }

  // 정답 표시 로직 (모든 문제에 적용)
  // const isOverallCorrect = () => {
  //   if (index === 0 || index === 1) {
  //     return selectedChoice !== null && selectedChoice === correctAnswer;
  //   } else if (index === 2) {
  //     return JSON.stringify(selectedOrder) === JSON.stringify(correctAnswer);
  //   } else if (index === 3) {
  //     return inputValue.trim().toLowerCase() === String(correctAnswer).toLowerCase();
  //   } else if (index === 4) {
  //     return Object.keys(correctAnswer as Record<string, string>).every(blankId =>
  //       blankInputs[blankId].trim().toLowerCase() === (correctAnswer as Record<string, string>)[blankId].toLowerCase()
  //     );
  //   }
  //   return false;
  // };

  const showOverallAnswer = (index === 0 || index === 1 || index === 2 || index === 3 || index === 4);


  // src/components/SlideItem.tsx

// ... (이전 코드 동일)

  return (
    <div
      className="bg-white p-8 shadow-md flex flex-col border border-gray-200"
      style={{
        width: '1060px',
        height: '600px',
        borderRadius: '12px',
      }}
    >
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            {index + 1}. {questionTitle}
          </h2>
          <div className="flex space-x-2">
            <button className="text-gray-500 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.586 3.586l-4.697 4.697-2.122 2.122 2.828 2.828 2.122-2.122 4.697-4.697-2.828-2.828z" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* "정답: " 표시 (모든 문제에 대해 이제 조건부로 표시) */}
        {showOverallAnswer && (
          <div className="mb-6 text-base text-gray-700">
            <span className="font-semibold">정답 : </span>
            <span className="font-bold text-blue-600">
              {index === 2 ? (correctAnswer as string[]).join(', ') : // 여기에 as string[] 타입 단언
               index === 4 ? Object.values(correctAnswer as Record<string, string>).join(', ') : // 여기에 as Record<string, string> 타입 단언
               correctAnswer as string} {/* 마지막에도 기본 string으로 타입 단언 */}
            </span>
          </div>
        )}

        {/* 문제 유형별 UI 렌더링 */}
        {questionTypeUI}
      </div>

      {/* 해설 영역 - 모든 문제 유형에 대해 일관된 위치에 표시 */}
      <div className="bg-gray-100 p-4 rounded-md border border-gray-200 mt-8 overflow-y-auto">
        <h3 className="font-semibold text-gray-700 mb-2">해설</h3>
        <p className="text-gray-600 text-sm">
          {explanation}
        </p>
      </div>
    </div>
  );
};

export default SlideItem;