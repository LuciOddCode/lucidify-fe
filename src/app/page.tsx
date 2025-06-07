"use client"
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    return (
            <div className="min-h-screen bg-warm-gray text-dark-navy font-sans">
               <Header></Header>
                {/* Hero Section */}
                <header className="bg-primary-blue text-white py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Lucidify</h1>
                        <p className="text-lg sm:text-xl mb-6">Your 8-Minute Companion for Emotional Well-Being</p>
                        <button className="bg-soft-teal text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300" onClick={() => router.push('/pages/loginPage')}>
                            Get Started
                        </button>
                    </div>
                </header>

                {/* Features Section */}
                <section className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-semibold text-center mb-8">Why Lucidify?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                <h3 className="text-xl font-medium mb-2">Mood Check-In</h3>
                                <p className="text-gray-600">Log your emotions with ease using sliders and voice input.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                <h3 className="text-xl font-medium mb-2">AI Companion</h3>
                                <p className="text-gray-600">Get empathetic support with personalized coping strategies.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                <h3 className="text-xl font-medium mb-2">8-Minute Mode</h3>
                                <p className="text-gray-600">A guided session for quick emotional care.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="bg-secondary-blue text-white py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-semibold mb-4">Start Your Journey Today</h2>
                        <p className="mb-6">Join thousands of young adults in building resilience and emotional awareness.</p>
                        <button className="bg-soft-teal text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300">
                            Sign Up Now
                        </button>
                    </div>
                </section>

                {/* Footer */}
               <Footer></Footer>
            </div>
    );
}
