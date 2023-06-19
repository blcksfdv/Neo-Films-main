import {BsDiscord, BsTwitter} from "react-icons/bs";
import {CgWebsite} from "react-icons/cg";



const Footer = () => {
    return (
        <footer className="navigation py-4">
            <div className={"text-center font-extrabold text-3xl"}>Contact</div>
            <div className={"flex items-center justify-center gap-10 my-5"}>
                <a href="https://discord.gg/stCtUCF8Mm" target={'_blank'}><BsDiscord size={'32px'} className={"hover:text-blue-900"}/></a>
                <a href="https://twitter.com/neofilmsnft" target={'_blank'}><BsTwitter size={'32px'} className={"hover:text-blue-900"}/></a>
                <a href="https://neofilms.movie/" target={'_blank'}><CgWebsite size={'32px'} className={"hover:text-blue-900"}/></a>
            </div>
            <div className="container mx-auto px-4">
                <p className="text-center text-gray-400 text-sm">
                    Neo Films,
                    The Film Studio for the people, by the people. The best of Web 3.0, NFT's and Defi, blended with the best in Hollywood, Netflix and Film-Making. Twitter, discord, website</p>
                </div>
        </footer>
    )
 }
export default Footer
