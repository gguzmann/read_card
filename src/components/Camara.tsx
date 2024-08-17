"use client"
import { callCard, getAllNames } from "@/utils/apicall";
import { useRef, useState } from "react"
import Webcam from "react-webcam"
import { createWorker } from "tesseract.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Image from 'next/image'
import card1 from '../../public/card1.png'
const cardText = [
    "| Acidic Sliver e\n",
    "E 7 Y E\n",
    "74\n",
    "MAY: La 7 dy 16:\n",
    "A f D\n",
    "e Sa -— - u Za de >\n",
    "¿E e T \" “as e 7.3 “a\n",
    "kE 7 Y —\n",
    "É LE SE N PO\n",
    "e Y\n",
    "uu —- —<Y -\n",
    "—- =\n",
    "Y .\n",
    "e > - En Le u\n",
    "Creature — Sliver EN\n",
    "All Slivers have “2, Sacrifice this\n",
    "permanent: This permanent deals 2\n",
    "damage to target creature or player.”\n",
    "The first sliver burst against the cave wall,\n",
    "q and others piled in behind to deepen the\n",
    "new tunnel.\n",
    "2/2\n",
    "206/269 U\n",
    "TPR EN > JEFF MIRACOLA M8: 02015 Wizards ofthe Coast\n"
]

export const Camara = () => {
    const camera = useRef<Webcam | null>(null)
    const [image, setImage] = useState<string | null>(null)
    const [options, setOptions] = useState<string[]>([])
    const [imageCard, setImageCard] = useState<string | null>(null)
    const [texto, setTexto] = useState<string | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)



    const searchCard = async (x: string) => {
        const card = await callCard(x) ?? ''
        console.log('return card', card)
        if (card === 'error') {
            setErrorMsg('Carta no encontrada en español')
            return
        }
        setErrorMsg(null)
        setImageCard(card)

    }

    const cancel = () => {
        setImage(null)
        setTexto(null)
        setImageCard(null)

    }

    const handleGenerateContent = async () => {
        setImageCard(null)
        setTexto(null)
        setErrorMsg(null)
        const imageSrc = camera?.current?.getScreenshot() ?? ''
        const base64String = imageSrc.split(',')[1]; // Extraer solo la parte Base64
        console.log(base64String)

        setImage(base64String);
        try {
            const response = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt, image }),
            });

            const data = await response.json();
            setTexto(data.msg)
            console.log(data)
            console.log(data.msg)
            if (data.status == 460 || data.msg == '99') {
                setErrorMsg('Imagen no encontrada')
                return
            }

            searchCard(data.msg)
        } catch (error) {
            console.error('Error generating content:', error);
        }
    };

    return (
        <>
            {errorMsg && <span className="m-10 text-black bg-red-400">{errorMsg}</span>}
            {
                // options.length == 0 &&
                !imageCard &&
                <>
                    <div className="relative w-full max-w-md">

                        <Webcam
                            height={600}
                            width={600}
                            screenshotFormat="image/png"
                            videoConstraints={{ facingMode: { exact: "environment" } }}
                            //videoConstraints={{ facingMode: 'user' }}
                            ref={camera} />
                    </div>
                    <button onClick={handleGenerateContent} className="bg-black text-white hover:bg-opacity-30 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                            <circle cx="12" cy="13" r="3"></circle>
                        </svg>
                        <span className="sr-only">Capture Photo</span>

                    </button>
                </>
            }
            {
                imageCard &&
                <div>
                    <button onClick={cancel} type="button" className="absolute rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img src={imageCard} alt="" />
                </div>
            }

            {
                imageCard &&
                <>
                    {/* <div className="mt-6 w-full max-w-md space-y-4 animate__animated animate__backInUp max-h-[500px] overflow-y-scroll">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Suggested {texto}</h3>
                            </div>
                            <div className="p-6 grid gap-2">
                                {
                                    options.map((x, i) => (
                                        <button key={i} onClick={() => searchCard(x)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                                            {x}
                                        </button>

                                    ))
                                }



                            </div>
                        </div>
                    </div> */}
                    <button onClick={cancel} className="bg-black text-white hover:bg-opacity-30 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                        <span className="sr-only">Close menu</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </>
            }


        </>
    )
}