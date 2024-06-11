import { libre_baskerville } from "@/lib/fonts";
import Image from "next/image";
import gradient  from "public/logo-gradient.svg"


export default function Home() {
    return (<>
            <div className="z-1">
                <Header/>
            </div>
            <UnderlayingGradient/>
        </>
    );
}

function Header() {

    return (
        <div className="w-full mt-12">
            <h1 className={ libre_baskerville.className + " text-4xl font-bold text-center" }>
                newslater.
            </h1>
            <p className="text-center text-lg">
                read the news. one day at a time.
            </p>
        </div>
    )
}

function UnderlayingGradient() {
    return (
        <Image src={gradient} alt="Gradient" className="z-0 fixed bottom-0 left-0 w-full"/>
    )
}