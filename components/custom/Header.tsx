import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full bg-white z-50 border-b-[1px] backdrop-filter backdrop-blur-md">
            <div className="flex items-center p-5 gap-8">
                <div>
                    <h1 className="text-xl font-bold">Newslater</h1>
                </div>
                <div>
                    <nav>
                        <ul className="flex space-x-5">
                            <li>
                                <Link href="/" className="text-gray-500 hover:text-gray-800">Home</Link>
                            </li>
                            <li>
                                <Link href="/feed" className="text-gray-500 hover:text-gray-800">Feed</Link>
                            </li>
                            <li>
                                <Link href="/account" className="text-gray-500 hover:text-gray-800">Account</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}