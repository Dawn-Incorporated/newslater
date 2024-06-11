import Navbar from "@/components/custom/general/navbar";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Navbar/>
            { children }
        </>
    );
}
