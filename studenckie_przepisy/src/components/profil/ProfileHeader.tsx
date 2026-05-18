import { Pencil } from 'lucide-react';

type ProfilHeaderProps = {
  username: string;
  userTag: string;
  avatar?: string;
}

const ProfilHeader = (
    { username, userTag, avatar }: ProfilHeaderProps
) => {
    return (
        <div
            className="flex flex-col items-center"
        >   
            <div className="relative w-24 h-24">
                < img 
                    src={avatar}
                    alt={username}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-bg shadow-lg"
                />
                <button
                    className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md ring-2 ring-bg"
                    aria-label="Edytuj zdjęcie"
                >
                    <Pencil className="w-4 h-4 text-white"/>
                </button>
            </div>
            <h2 className="text-2xl font-bold text-text mt-3">{username}</h2>
            <p className="text-sm text-muted">{userTag}</p>

        </div>
    )
}

export default ProfilHeader