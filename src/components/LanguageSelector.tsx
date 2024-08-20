import { SUPPORTED_LANGUAGES } from "@/const"
import { Form } from "react-bootstrap"

export const LanguageSelector = ({onChange}) => {
    return(
        <Form.Select aria-label="Selecciona el idioma">
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