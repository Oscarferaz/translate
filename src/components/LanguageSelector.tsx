import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "@/const"
import { type fromLanguage, type Language, SectionType } from "@/types.d"
import { Form } from "react-bootstrap"


type PropsLanguageSelector = 
    |   {type: SectionType.From, value: fromLanguage ,onChange: (Language: fromLanguage) => void}
    |   {type: SectionType.To, value: Language, onChange: (Language: Language) => void}

export const LanguageSelector: React.FC<PropsLanguageSelector> = ({onChange, value, type}) => {

    const handleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(ev.target.value as Language)
    }
    

    return(
        <Form.Select aria-label="Selecciona el idioma" onChange={handleChange} value={value}>
            {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
            {
                Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                    <option key={key} value={key}>
                        {literal}
                    </option>
                )) 
            }
        </Form.Select>
    )
}