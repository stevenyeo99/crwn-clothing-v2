import { Group, Input, Label } from './form-input.styles.jsx';

const FormInput = ({label, ...otherProps}) => {
    return (
        <Group>
            {
                label && (
                    <Input className='form-input' {...otherProps} />
                )
            }
            <Label shrink={otherProps.value.length > 0}>{label}</Label>
        </Group>
    );
};

export default FormInput;