import type { MenuItem } from '@custom-types/menu'
import UserIcon from '@assets/icons/sidebar/user.svg?react'
import QnaIcon from '@assets/icons/sidebar/qna.svg?react'
import CommunityIcon from '@assets/icons/sidebar/community.svg?react'
import TestIcon from '@assets/icons/sidebar/test.svg?react'

export const menuData: MenuItem[] = [
  {
    menuIcon: UserIcon,
    mainMenu: '회원관리',
    subMenu: [
      { name: '유지 관리', path: '' },
      { name: '수강생 관리', path: '' },
      { name: '수강생 등록 신청', path: '' },
      { name: '회원 탈퇴 관리', path: '' },
      { name: '대시보드', path: '' },
    ],
  },
  {
    menuIcon: QnaIcon,
    mainMenu: '질의응답 관리',
    subMenu: [
      { name: '질의응답 관리', path: '' },
      { name: '카테고리 관리', path: '' },
    ],
  },
  {
    menuIcon: CommunityIcon,
    mainMenu: '커뮤니티 관리',
    subMenu: [
      { name: '게시글 관리', path: '' },
      { name: '카테고리 관리', path: '' },
      { name: '공지사항 등록', path: '' },
    ],
  },
  {
    menuIcon: TestIcon,
    mainMenu: '쪽지시험 관리',
    subMenu: [
      { name: '쪽지시험 관리', path: '/quizzes' },
      { name: '배포 내역 관리', path: '/quizzes/deployments' },
      { name: '응시 내역 관리', path: '/quizzes/submissions' },
      { name: '쪽지시험 대시보드', path: '/quizzes/dashboard' },
    ],
  },
]
