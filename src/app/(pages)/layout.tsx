import Navbar from "@/components/app/nav/navbar";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Navbar/>
            { children }
        </>
    );
}
