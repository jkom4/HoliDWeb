const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:true,
        isRequired:true,
        placeholder:"Email address"
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:true,
        isRequired:true,
        placeholder:"Password"
    }
]

const contactFields=[
    {
        id:"name",
        name:"name",
        type:"text",
        autoComplete:true,
        isRequired:true,
        placeholder:"Votre Nom"
    },
    {
        id:"firstname",
        name:"firstname",
        type:"text",
        autoComplete:true,
        isRequired:true,
        placeholder:"Votre Prenom"
    },
    {

        id:"emailaddress",
        name:"email",
        type:"email",
        autoComplete:true,
        isRequired:true,
        placeholder:"Email address"
    },
    {

        id:"message",
        name:"message",
        type:"text",
        autoComplete:false,
        isRequired:true,
        placeholder:"Votre message"
    }
]
const signupFields=[
    {
        labelText:"Username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:true,
        isRequired:true,
        placeholder:"Username"
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Confirm Password"
    }
]

export {loginFields,signupFields,contactFields}