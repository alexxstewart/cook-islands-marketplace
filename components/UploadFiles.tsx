import React from "react";

export interface IProps {
    acceptedFileTypes?: string;
    allowMultipleFiles?: boolean;
    label: string;
    onChange: (formData: FormData) => void;
    uploadFileName: string;
}
  
const UiFileInputButton: React.FC<IProps> = (props) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const formRef = React.useRef<HTMLFormElement | null>(null);
  
    const onClickHandler = () => {
        fileInputRef.current?.click();
    };
  
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) {
            return;
        }
    
        const formData = new FormData();
    
        Array.from(event.target.files).forEach((file) => {
            formData.append(event.target.name, file);
        });
    
        props.onChange(formData);
    
        formRef.current?.reset();
    };
  
    return (
        <form ref={formRef}>
            <button type="button" onClick={onClickHandler} className='bg-sky-300 p-2 rounded'>{props.label}</button>
            <input
                accept={props.acceptedFileTypes}
                multiple={props.allowMultipleFiles}
                name={props.uploadFileName}
                onChange={onChangeHandler}
                ref={fileInputRef}
                style={{ display: 'none' }}
                type="file"
            />
        </form>
    );
};
  
UiFileInputButton.defaultProps = {
    acceptedFileTypes: 'jpeg, jpeg, png',
    allowMultipleFiles: false,
};

export default UiFileInputButton;