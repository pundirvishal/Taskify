import Image from "next/image";

export const Loading = () => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Image 
                src={'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXdycHl0YW5kOGsxM3M3Z3A2bjFkeXJyMjFycDU5bGM2cTFoaTBnZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/JBRVVlp805xSnAgOpF/giphy.gif'}
                alt="Logo"
                width={50}
                height={50}
                unoptimized={true}
            />
        </div>
    )
}