const loginFields = [
    {

        id: "emailAddress",
        name: "email",
        type: "email",
        autoComplete: true,
        isRequired: true,
        placeholder: "Email"
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: true,
        isRequired: true,
        placeholder: "Mot de passe"
    }
]

const contactFields = [
    {
        id: "name",
        name: "name",
        type: "text",
        autoComplete: true,
        isRequired: true,
        placeholder: "Votre Nom"
    },
    {
        id: "firstname",
        name: "firstname",
        type: "text",
        autoComplete: true,
        isRequired: true,
        placeholder: "Votre Prenom"
    },
    {

        id: "emailaddress",
        name: "email",
        type: "email",
        autoComplete: true,
        isRequired: true,
        placeholder: "Votre adresse email"
    },
    {
        id: "message",
        name: "message",
        type: "text",
        autoComplete: false,
        isRequired: true,
        placeholder: "Votre message"
    }
]
const signupFields = [
    {
        id: "name",
        name: "name",
        type: "text",
        autoComplete: true,
        isRequired: true,
        placeholder: "Nom"
    },
    {
        id: "firstname",
        name: "firstname",
        type: "text",
        autoComplete: true,
        isRequired: true,
        placeholder: "Prénom"
    },
    {
        id: "emailAddress",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Adresse Email"
    },
    {
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Mot de passe"
    },
    {
        id: "confirmPassword",
        name: "confirmPassword",
        type: "password",
        autoComplete: "confirm-password",
        isRequired: true,
        placeholder: "Confirmez le mot de passe"
    }
]
const getUserinscritFields = [
    {
        id: "dateDebut",
        name: "dateDebut",
        type: "date",
        autoComplete: true,
        isRequired: true,
        placeholder: "Date de début"

    },
    {
        id: "dateFin",
        name: "dateFin",
        type: "date",
        autoComplete: true,
        isRequired: true,
        placeholder: "Date de Fin"
    }
]
const addVacancesFields = [
    {
        id: "nom",
        name: "nom",
        type: "text",
        autoComplete: true,
        isRequired: true,
        placeholder: "Intitulé"
    },
    {
        id: "description",
        name: "description",
        type: "text",
        autoComplete: true,
        isRequired: true,
        placeholder: "Description"
    },
    {
        id: "dateDebut",
        name: "dateDebut",
        type: "date",
        autoComplete: true,
        isRequired: true,
        placeholder: "Date de début"

    },
    {
        id: "dateFin",
        name: "dateFin",
        type: "date",
        autoComplete: true,
        isRequired: true,
        placeholder: "Date de Fin"
    }
]
export const addParticipantFields = [
    {
        id: "vacance",
        name: "vacance",
        type: "text",
        autoComplete: true,
        isRequired: true,
        placeholder: "Vacance"
    },
    {
        id: "participant",
        name: "participant",
        type: "text",
        autoComplete: true,
        isRequired: true,
        placeholder: "Participant"
    },

]

export {getUserinscritFields,loginFields, signupFields, contactFields, addVacancesFields}