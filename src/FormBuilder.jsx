// import { useForm } from 'react-hook-form';

// const FormBuilder = () => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm();

//     const onSubmit = (data) => console.log(data);

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input {...register('firstName')} />
//             <input {...register('lastName', { required: true })} />
//             {errors.lastName && <p>Last name is required.</p>}
//             <input {...register('age', { pattern: /\d+/ })} />
//             {errors.age && <p>Please enter number for age.</p>}
//             <input type="submit" />
//         </form>
//     );
// };

// export default FormBuilder;


// import React from "react";
// import ReactDOM from "react-dom";
// import { FormBuilder } from "th-react-formbuilder";

// const items = [
//     {
//         key: "Header",
//         name: "Header Text",
//         icon: "fa fa-header"
//     },
//     {
//         key: "Paragraph",
//         name: "Paragraph",
//         icon: "fa fa-paragraph"
//     },
//     {
//         key: "Dropdown",
//         name: "Dropdown",
//         icon: "fa fa-caret-square-o-down"
//     }
// ];

// const onSubmitFunc = () => {
//     // Submit Function
// };

// const FormCreator = () => {
//     return (
//         <FormBuilder
//             onSubmit={onSubmitFunc}
//             items={items}
//         />
//     )
// };

// export default FormCreator;



// import React, { Component } from 'react'

// import FormBuilder from 'reactjs-form-builder'

// class Example extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             form: {
//                 "fields": {
//                     "name": {
//                         'label': "Product Name",
//                         "type": "text",
//                         "placeholder": "Custom Placeholder",
//                         "required": true,
//                         "requireMessage": "This Field is Required" // To customize message if field is empty
//                     },
//                     "description": {
//                         'label': "Product Name",
//                         "type": "textarea",
//                         "required": true,
//                     },
//                     "categories": {
//                         'label': "Categories",
//                         "type": "select",
//                         'options': [
//                             { 'label': "Apple", 'value': 1 },
//                             { 'label': "Banana", 'value': 2 }
//                         ],
//                         "placeholder": "Custom Placeholder",
//                         "required": true,
//                         "requireMessage": "This Field is Required"
//                     },
//                     'submit': {
//                         "type": "submit",
//                         "label": "Create Product",
//                         'color:': 'btn-primary',
//                     }
//                 }
//             }
//         }
//     }
//     onChange(data) {
//         this.setState({
//             form: data
//         });
//         console.log(data)
//     }
//     onSubmit(data) {
//         this.setState({
//             form: data
//         });
//         console.log(data)
//         var name = this.state.form.name.value;
//     }
//     render() {
//         return <FormBuilder
//             fields={this.state.form}
//             onChange={this.onChange.bind(this)}
//             onSubmit={this.onSubmit.bind(this)}
//         />
//     }
// }

// export default Example;



// import { ReactFormBuilder } from 'react-form-builder2';
// import 'react-form-builder2/dist/app.css';

// const FormCreator = () => {
//     return <div style={{ width: '90%' }}> <ReactFormBuilder /></div>
// };

// export default FormCreator;


// import React from 'react';
// import ReactDOM from 'react-dom';

// import FormBuilder from 'js-form-builder';

// const FormCreator = () => {
//     const displayOnChangeFieldValue = (event) => {
//         console.log(event.target.value);
//     };

//     const form = {
//         action: '.',
//         method: 'POST',
//     };

//     const fields = [
//         {
//             id: 'name',
//             name: 'name',
//             type: 'text',
//             className: 'class_name',
//             required: true,
//             onChange: displayOnChangeFieldValue,
//         }, {
//             id: 'lastName',
//             name: 'lastName',
//             type: 'text',
//             className: 'class_name',
//             required: true,
//             onChange: displayOnChangeFieldValue,
//         },
//     ];
//     /**
//     * Render form into a custom html block.
//     */
//     const Container = ({ children, onSubmit }) => (
//         <div className="container-form">
//             {children}

//             <button onClick={onSubmit}>Custom submit form</button>
//         </div>
//     );

//     /**
//     * Render fields group into a custom html block.
//     */
//     const fieldGroupContainer = ({ children, label }) => (
//         <div className="form-group">
//             {label}
//             {children}
//         </div>
//     );

//     /**
//     * Render field into a custom html block.
//     */
//     const fieldContainer = ({ children, label }) => (
//         <div className="form-control">
//             {label}
//             {children}
//         </div>
//     );


//     /**
//     * Render label field into a custom html block.
//     */
//     const labelContainer = ({ children }) => (
//         <label className="label">
//             {children}
//         </label>
//     );

//     /**
//     * Render fields error message into a custom html block.
//     */
//     const formErrorContainer = ({ children }) => (
//         <div className="error">
//             {children}
//         </div>
//     );

//     /**
//     * Called on submit button.
//     * Return all fields data as json
//     */
//     function onCustomSubmit(formData) {
//         console.log(formData);
//     }


//     return (
//         <FormBuilder
//             form={form}
//             fields={fields}
//             container={Container}
//             fieldContainer={fieldContainer}
//             fieldGroupContainer={fieldGroupContainer}
//             labelContainer={labelContainer}
//             formErrorContainer={formErrorContainer}
//             onSubmit={onCustomSubmit}
//             hasToSubmit={true}
//             showSubmitButton={false}
//             hasToShowLabel={true}
//             showFormErrorMessage={true}
//             showFieldsErrorsOnFailSubmit={true}
//         />
//     );
// }

// export default FormCreator;



