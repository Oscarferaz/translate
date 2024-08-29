import { SUPPORTED_LANGUAGES } from "@/const"
import { fromLanguage, Language } from "@/types"
import OpenAI from "openai"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs"



const APIKEY = import.meta.env.VITE_OPENAI_APIKEY

const openAI =  new OpenAI({apiKey: APIKEY, dangerouslyAllowBrowser: true})

export async function translate(fromLanguage: fromLanguage, toLanguage: Language, text: string) {

    if(fromLanguage === toLanguage) return text
    const messages: ChatCompletionMessageParam[] = [
        {
            role: 'system',
            content: `eres una inteleigencia artificial la cual se va a dedicar a traducir textos.
                tu vas a recibir el texto del usuario y vas a traducir el texto. El idioma orginal esta rodeado por
                '{{' and '}}'. Tambien puedes recibir {{auto}} lo cual significa que debe de detectar el idioma. 
                El idioma al que debes traducir esta rodeado por '[[' and ']]'
            `
        },
        {
            role: 'user',
            content: 'Hola mundo {{Español}} [[English]]'
        },
        {
            role: 'assistant',
            content: 'Hello world'
        },
        {
            role: 'user',
            content: 'How are you? {{auto}} [[Deutsch]]'
        },
        {
            role: 'assistant',
            content: 'Wie geht es dir?'
        },
        {
            role: 'user',
            content: 'Bon dia, com estas? {{auto}} [[Español]]'
        },
        {
            role: 'assistant',
            content: 'Buenos dias, como estas?'
        }
    ]

    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    const completion = await openAI.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            ...messages,
           {
            role: 'user',
            content: `${text} {{${fromCode}}} [[${toCode}]]`
           }
        ]
    })

    return completion.choices[0]?.message?.content
}