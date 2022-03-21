import { Form, InputGroup } from "react-bootstrap";

/**
 * If there is one children - it's form control
 * If there are two - first is label content, second - control
 * @param props 
 * @returns {JSX.Element}
 */
export default function FormGroup(props: {
    controlId: string;
    children: React.ReactNode
}) {
    let label: React.ReactNode;
    let control: React.ReactNode;
    let errorMsg: React.ReactNode;

    if (Array.isArray(props.children)) {
        label = props.children[0];
        control = props.children[1];
        errorMsg = props.children[2];
    } else {
        control = props.children;
    }


    return (
        <Form.Group controlId={props.controlId} className="mb-3">
            <div className="row">
                <div className="col-12 col-md-4 text-end">
                    <Form.Label>{label}</Form.Label>
                </div>

                <div className="col-12 col-md-8">
                    <InputGroup hasValidation>
                        {control}

                        <Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>
                    </InputGroup>
                </div>
            </div>
        </Form.Group>
    );
}
