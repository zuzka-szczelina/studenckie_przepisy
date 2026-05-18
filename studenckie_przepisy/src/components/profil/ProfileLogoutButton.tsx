import { LogOut, ChevronRight } from 'lucide-react'


const ProfileLogoutButton = () => {
    return (
        <div className="flex flex-col bg-surface rounded-2xl px-4 py-2 mt-2">
            <button className='relative flex items-center gap-3 w-full py-3'>
                <div
                    className="w-9 h-9 bg-primary-h/10 rounded-full flex items-center justify-center flex-shrink-0"
                    aria-label="Wyloguj"
                >
                    <LogOut className="w-5 h-5 text-primary-h"/>
                </div>
                <p className='flex-1 text-left text-sm font-medium text-primary-h'>Wyloguj</p>
                <ChevronRight className='w-4 h-4 text-primary-h/50 flex-shrink-0'/>
            </button>
        </div>
    )
}

export default ProfileLogoutButton