import Profile from '@assets/icons/profile.svg'
import type { User } from '@custom-types/user'

type HeaderProps = {
  user?: User
}

const defaultUser: Required<User> = {
  name: 'Admin',
  profileUrl: Profile,
}

export default function Header({ user }: HeaderProps) {
  const { name: userName, profileUrl } = user ?? defaultUser

  return (
    <header>
      <div className="flex h-[80px] w-full items-center justify-end bg-[#F3EEFF] pr-12">
        <img src={profileUrl} alt="profile icon" className="w-[26px]" />
        <div className="ml-2 text-[18px] text-primary-600">{userName} 님</div>
      </div>
    </header>
  )
}
