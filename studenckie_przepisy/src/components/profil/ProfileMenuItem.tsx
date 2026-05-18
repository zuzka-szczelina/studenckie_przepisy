import { ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'


export type ProfileMenuItemProps = {
    icon: LucideIcon,
    text: string,
}


const ProfileMenuItem = ( {icon: Icon, text}: ProfileMenuItemProps) => {
    return (
        <button className='relative flex items-center gap-3 w-full py-3'>
            <div
                className="w-9 h-9 bg-surface2 rounded-full flex items-center justify-center flex-shrink-0"
                aria-label={text}
            >
                <Icon className="w-5 h-5 text-text"/>
            </div>
            <p className='flex-1 text-left text-sm font-medium text-text'>{text}</p>
            <ChevronRight className='w-4 h-4 text-muted flex-shrink-0'/>
        </button>
    )
}

export default ProfileMenuItem