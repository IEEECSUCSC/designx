import Logo from "@/assets/logo.png"
import Image from "next/image"
import PrimaryButton from "./ui/PrimaryButton"


export default function Header() {
    return (
        <header className=" container mx-auto flex items-center justify-between bg-[#fdf5f7e6] px-4 min-h-[75px] sticky top-2 ">
            <div>
                {/* logo */}
                <Image src={Logo} alt="logo" width={100} height={100}/>
            </div>
            <nav>
                {/* nav items */}

                {/* header cta  */}
                <PrimaryButton>
                    Get Your Certificate
                </PrimaryButton>
            </nav>
        </header>
    )
}