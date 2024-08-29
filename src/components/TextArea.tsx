import { SectionType } from "@/types.d"
import { Form } from "react-bootstrap"

interface TextAreaPros {
    placeholder: string,
    value: string, 
    onChange: (value: string) => void ,
    type: SectionType,
    loading: boolean
}
 
const commonStyles: React.CSSProperties = { height: '200px', border: '0', resize: 'none'}



const getPlaceholder = (type: SectionType, loading: boolean ) => {
    if (type === SectionType.From) return 'Introducir texto'
    if(loading) return 'Cargando...'
    return 'Traduccion'
}

const TextArea: React.FC<TextAreaPros> = ({ loading, value, onChange, type}) => {

    const styles = type === SectionType.To
        ? {...commonStyles, background: '#f5f5f5'}
        : commonStyles

    const handleOnchange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(ev.target.value)
    }

    return(
        <Form.Control
            autoFocus={type === SectionType.From}
            as={'textarea'}
            style={styles}
            placeholder={getPlaceholder(type, loading)}
            value={value}
            onChange={handleOnchange}
            disabled={type === SectionType.To}
        />
    )
}

export default TextArea