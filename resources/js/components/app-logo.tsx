import image from '../../../public/logo1.png'

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-md">
                <img src={image} alt="App Logo" className="size-10 rounded-md" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">ToothTime</span>
            </div>
        </>
    );
}
