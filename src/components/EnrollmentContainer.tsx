// src/components/EnrollmentContainer.tsx
import React from 'react';
import EnrollmentModal from './EnrollmentModal';

const EnrollmentContainer: React.FC = () => {
    return (
        <div className="p-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">기수 등록 영역</h2>

        <EnrollmentModal isOpen onClose={() => {}} />
        </div>
    );
};

export default EnrollmentContainer;
