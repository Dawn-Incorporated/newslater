import Nav from "@/components/custom/general/Nav";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Nav/>
            { children }
        </>
    );
}
