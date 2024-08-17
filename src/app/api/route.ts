import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import { NextRequest, NextResponse } from "next/server";
import path from 'path';


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        // const { prompt, image } = req.body;
        const {prompt, image} = await req.json()
      const key = process.env.NEXT_PUBLIC_GEMINI
        const genAI = new GoogleGenerativeAI(
          key
      );

      const img = {
          inlineData: {
              data: image,
              mimeType: "image/png",
          },
      };
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(['Solo si es o parece una carta magic the gathering, dame el nombre solamente y nada mas, de lo contrario devuelveme un: 99', img]);
      console.log(result.response.text())
      return Response.json({ msg: result.response.text(), status: 200 })
    } catch (error) {
      console.log(error)
      return Response.json({ msg: 'error', status:460 })
    }
    
}

