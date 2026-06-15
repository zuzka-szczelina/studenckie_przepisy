import { ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'


export type ProfileMenuItemProps = {
    icon: LucideIcon,
    text: string,
    description?: string,
    onClick?: () => void,
}


const ProfileMenuItem = ( {icon: Icon, text, description, onClick}: ProfileMenuItemProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className='relative flex items-center gap-3 w-full py-3 transition-colors hover:text-primary'
        >
            <div
                className="w-9 h-9 bg-surface2 rounded-full flex items-center justify-center flex-shrink-0"
                aria-label={text}
            >
                <Icon className="w-5 h-5 text-text"/>
            </div>
            <div className="flex-1 text-left">
                <p className='text-sm font-semibold text-text'>{text}</p>
                {description && (
                    <p className="mt-0.5 text-[0.76rem] leading-snug text-muted">
                        {description}
                    </p>
                )}
            </div>
            <ChevronRight className='w-4 h-4 text-muted flex-shrink-0'/>
        </button>
    )
}

export default ProfileMenuItem
