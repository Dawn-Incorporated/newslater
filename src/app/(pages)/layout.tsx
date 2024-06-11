import Navbar from "@/components/app/general/navbar";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Navbar/>
            { children }
        </>
    );
}
