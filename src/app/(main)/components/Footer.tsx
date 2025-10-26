import Link from "next/link";
import Container from "../../Container"


const Footer = () => {
    return (
        <Container>
            <footer>
                <section className="bg-linear-to-r p-4 mt-15 mb-2 w-full min-h-[450px] 
             rounded-[30px]  from-blue-500 to-blue-900">
                    <Link href={"https://www.technolife.com/"}>
                        <img src="/../Logos/1.svg" alt="logo" className="mt-15 mr-6 w-[180px] h-[100px] mx-auto md:mx-0" />
                    </Link>

                    <div className="w-full mt-10 text-center h-[200px] 
                    border-t-2 font-bold pt-5 border-neutral-200 ">
                        <p>ساخته شده با این ابزار</p>
                        <section className="flex flex-wrap justify-center 
                        items-center px-4 gap-6 gap sm:gap-10">

                            <Link target="_blank" href={"https://www.typescriptlang.org/"}>
                                <div className="flex flex-col items-center">
                                    <img className="w-10 h-10 cursor-pointer" src="../icons/typescript-svgrepo-com.svg" alt="tailwindcss" title="typescript" />
                                    <p className="text-[12px] mt-1">typescript</p>
                                </div>
                            </Link>

                            <Link href={"https://tailwindcss.com/"} target="_blank">
                                <div className="flex flex-col items-center">
                                    <img src="../icons/tailwind-css-svgrepo-com.svg"
                                        className="w-10 h-10  cursor-pointer " alt="tailwindcss" title="tailwindcss" />
                                    <p className="text-[12px] mt-1">tailwindcss</p>
                                </div>

                            </Link>

                            <Link href={"https://github.com/typicode/json-server"} target="_blank">
                                <div className="flex flex-col items-center">
                                    <img src="../icons/json-file-svgrepo-com.svg" className="w-10 h-10 cursor-pointer" alt="json-server" title="json-server" />
                                    <p className="text-[12px] mt-1">json-server</p>
                                </div>
                            </Link>

                            <Link href={"https://nextjs.org/"} target="_blank">
                                <div className="flex flex-col items-center">
                                    <img src="../icons/nextjs-icon-svgrepo-com.svg" className="w-20.5 h-7 cursor-pointer" alt="next.js" title="next.js" />
                                    <p className="text-[12px] mt-1">next.js</p>
                                </div>
                            </Link>
                        </section>
                    </div>
                </section>
            </footer>
        </Container>
    );
};


export default Footer