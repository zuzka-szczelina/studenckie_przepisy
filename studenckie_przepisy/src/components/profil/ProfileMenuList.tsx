import ProfileMenuItem from "./ProfileMenuItem"
import type { ProfileMenuItemProps } from "./ProfileMenuItem"


export type ProfileMenuListProps = {
    items_props: ProfileMenuItemProps[]
}


const ProfileMenuList = ({ items_props }: ProfileMenuListProps) => {
    return (
        <div className="flex flex-col bg-surface rounded-2xl px-4 py-2 mt-2">
            {items_props.map(({icon, text}) =>(
                <ProfileMenuItem key={text} icon={icon} text={text}/>
            ))}
        </div>
    )
}

export default ProfileMenuList