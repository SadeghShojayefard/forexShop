import { MdOutlineNavigateNext } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";
import Link from "next/link";


export default function Pagination() {
    return (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6
        rounded-2xl shadow-2xl shadow-black  bg-white/30 backdrop-blur-2xl" >
            <div className="flex  flew row items-center justify-between gap-2 w-full sm:hidden">
                <Link
                    href="#"
                    className="formButton"
                >
                    قبلی
                </Link>
                <Link
                    href="#"
                    className="formButton"
                >
                    بعدی
                </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between sm:gap-2">
                <div>
                    <p className="text-sm text-gray-900">
                        نمایش <span className="font-medium">1</span> تا <span className="font-medium">10</span> از{' '}
                        <span className="font-medium">97</span> مورد
                    </p>
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                        <Link
                            href="#"
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">بعدی</span>
                            <MdOutlineNavigateNext aria-hidden="true" size={20} color="black" />
                        </Link>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        <Link
                            href="#"
                            aria-current="page"
                            className="relative z-10 inline-flex items-center bg-cyan-800 px-4 py-2 text-sm font-semibold
                             text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            1
                        </Link>
                        <Link
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1
                             ring-gray-300 ring-inset hover:bg-sky-500 focus:z-20 focus:outline-offset-0 "
                        >
                            2
                        </Link>
                        <Link
                            href="#"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                        >
                            3
                        </Link>
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0">
                            ...
                        </span>
                        <Link
                            href="#"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                        >
                            8
                        </Link>
                        <Link
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            9
                        </Link>
                        <Link
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            10
                        </Link>


                        <Link
                            href="#"
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">قبلی</span>
                            <IoChevronBackOutline aria-hidden="true" size={20} color="black" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}
