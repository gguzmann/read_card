"use client"

import { useRef, useState } from "react"
import Webcam from "react-webcam"
import { createWorker } from "tesseract.js";

export const Camara = () => {
    const camera = useRef<Webcam | null>(null)
    const [image, setImage] = useState<string | null>(null)

    const takePhoto = () => {
        if (!image) {
            const img = camera?.current?.getScreenshot() ?? null
            console.log(img)
            readImage(img)
            setImage(img)
        } else {
            setImage(null)
        }
    }

    const readImage = async (img: any) => {
        const base64string = img.split(',')[1];
        const worker = await createWorker("spa");
        const ret = await worker.recognize(Buffer.from(base64string, 'base64'));
        console.log(ret.data.text);
        console.log('<------>')
        console.log(ret.data)
        console.log(ret.data.lines[0].text);
        await worker.terminate();
    }

    const test = async () => {

    }

    return (
        <>
            <Webcam
                height={600}
                width={600}
                screenshotFormat="image/png"
                videoConstraints={{ facingMode: { exact: "environment" } }}
                ref={camera} />

            <button onClick={takePhoto} className="bg-black text-white hover:bg-opacity-30 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
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
    )
}