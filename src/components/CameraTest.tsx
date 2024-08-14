"use client"

import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { createWorker } from "tesseract.js";
import scryfall, { Cards } from 'scryfall-api';
import { callCard } from "@/utils/apicall";

export const CameraTest = () => {
    const camera = useRef<Webcam | null>(null)
    const [power, setPower] = useState(true)
    const [image, setImage] = useState<string | null>(null)
    const [imageCard, setImageCard] = useState<string | null>(null)
    const [texto, setTexto] = useState<string[]>([])
    const [textoInput, setTextoInput] = useState('')

    const takePhoto = () => {
        if (!image) {
            const img = camera?.current?.getScreenshot() ?? null
            console.log(img)
            setImage(img)
        } else {
            setImage(null)
        }
    }

    const readImage = async () => {
        if (!image) return
        const base64string = image.split(',')[1];
        const worker = await createWorker("spa");
        const ret = await worker.recognize(Buffer.from(base64string, 'base64'));
        console.log(ret.data.text);
        console.log('<------>')
        console.log(ret.data.lines[0].text);
        await worker.terminate();
    }

    const readImage2 = async () => {
        const worker = await createWorker('eng');
        const ret = await worker.recognize('https://cards.scryfall.io/large/front/2/a/2a83882c-3e03-4e85-aaac-97fa1d08a772.jpg?1722040128');
        console.log(ret.data.text);
        console.log('<------>')
        console.log(ret.data.lines[0].text.split(' '));
        const txt = ret.data.lines[0].text.split(' ') ?? []
        setTexto(txt)
        await worker.terminate();
    }


    const test = async () => {
        const image = await callCard() ?? ''
        setImageCard(image)
        // LLAMAR POR NOMBRE: Cards.byName
        // LLAMAR Cards.bySet con collector_number y set campos en español
        // Cards.autoCompleteName

        // Cards.byName('Sliver', true).then(console.log);
        // Cards.bySet('dgm', 69, 'es').then(result => console.log(result)); // Blood Scrivener, 血の公証人
        // const results = await Cards.autoCompleteName('sliver of');

        // for (const result of results) {
        //     console.log(result);
        //     // Bloodscent
        //     // Blood Scrivener
        //     // Bloodscale Prowler
        //     // Burning-Tree Bloodscale
        //     // Ghor-Clan Bloodscale
        // }

    }
    return (
        <div className="">
            {
                !image ?
                    (power &&
                        <Webcam
                            height={600}
                            width={600}
                            screenshotFormat="image/png"
                            ref={camera} />)
                    :
                    <img src={image} alt="" />
            }
            <button onClick={test} className="p-2 bg-slate-400 rounded">test</button>
            <button onClick={takePhoto} className="p-2 bg-slate-400 rounded">Take</button>
            <button onClick={readImage2} className="p-2 bg-slate-400 rounded">Read</button>
            <div className="flex flex-col max-w-24">

                {
                    texto.map((txt, i) => (
                        <button key={i} className="bg-red-200 hover:bg-red-100">{txt}</button>
                    ))
                }
            </div>

            {
                imageCard &&
                <img src={imageCard} alt="" />
            }
        </div>
    );
}