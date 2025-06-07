"use client";

export default function Page() {
    return <div className={"flex flex-auto justify-center align-middle w-screen h-screen "}>
        <div className="relative justify-center align-middle drop-shadow-xl w-3/6 h-3/4 overflow-hidden rounded-xl bg-[#3d3c3d]">
            <div className="absolute flex flex-col items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]">
                <h1 className="text-2xl font-bold text-center mt-10">Welcome Back!</h1>
                <p className="text-center mt-4">Enter your credentials to login</p>
                <div className={""}>

                </div>
                <div className="flex justify-center mt-6">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Sign in with Google
                    </button>
                </div>
            </div>
            <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
        </div>
    </div>
}

