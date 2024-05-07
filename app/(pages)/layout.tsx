import Header from "@/components/custom/Header";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Header/>
            { children }
        </>
    );
}
